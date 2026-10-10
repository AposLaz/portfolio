import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { readPublishedNotes } from "../src/lib/note-store.mjs";
import { addNoteHeadingIds, getNoteTopics } from "../src/lib/note-utils.mjs";

const root = process.cwd();
const output = path.join(root, "out");
assert.ok(fs.existsSync(output), "Build the website before checking the export.");
const notes = readPublishedNotes();
const publicationDates = new Set(notes.map((note) => note.date));

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function htmlText(text) {
  return text.replace(/<[^>]*>/g, " ").replace(/&(?:amp|quot|lt|gt|#x27|#39);/g, " ").replace(/\s+/g, " ");
}

// Derive known source signatures from ignored files, never copy private values into tests.
const sourceSignatures = new Set();
const privateFiles = walk(path.join(root, ".notes"));
for (const file of privateFiles) {
  if (!/\.(md|json|txt)$/.test(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/https:\/\/chatgpt\.com\/share\/[a-z0-9-]+/gi)) sourceSignatures.add(match[0]);
  for (const match of text.matchAll(/\b(?:groupId|clientId)=([^,\]\s]+)/g)) {
    if (match[1].length > 10) sourceSignatures.add(match[1]);
  }
  for (const match of text.matchAll(/\b(?:max\.poll\.records|max\.poll\.interval\.ms|connections\.max\.idle\.ms)\s*=\s*\d+/g)) sourceSignatures.add(match[0].replace(/\s+/g, ""));
  for (const match of text.matchAll(/\barn:aws:[^\s"'`<>]+/g)) sourceSignatures.add(match[0]);
  for (const match of text.matchAll(/\b20\d{2}-\d{2}-\d{2}(?:T[\d:.]+Z?)?/g)) {
    // A publication date is public metadata; source incident dates/timestamps are not.
    if (!publicationDates.has(match[0])) sourceSignatures.add(match[0]);
  }
  for (const line of text.split("\n")) {
    if (line.startsWith("|") && /\d/.test(line)) {
      const label = line.split("|")[1].trim();
      if (label.length > 12) sourceSignatures.add(label);
    }
  }
}

const publicFiles = [...walk(path.join(root, "content", "notes")), ...walk(path.join(root, "public", "notes")), ...walk(output)]
  .filter((file) => /\.(md|html|js|json|txt|css|map|svg)$/.test(file));
for (const file of publicFiles) {
  const source = fs.readFileSync(file, "utf8");
  const normalized = htmlText(source);
  const relative = path.relative(root, file);
  assert.ok(!/chatgpt\.com\/share\//i.test(source), `Shared-chat link in ${relative}`);
  assert.ok(!/PRIVATE_[A-Z_]*SENTINEL/.test(source), `Private test content in ${relative}`);
  for (const signature of sourceSignatures) {
    assert.ok(!source.includes(signature) && !normalized.includes(signature), `Known private-source signature in ${relative}`);
  }
  for (const privateFile of privateFiles.filter((file) => file.endsWith(".md"))) {
    const privateSlug = path.basename(privateFile, ".md");
    assert.ok(!source.includes(`/notes/${privateSlug}/`), `Private or retired article URL in ${relative}`);
  }
}

assert.ok(notes.length > 0, "At least one published guide is expected.");
for (const note of notes) {
  const articleFile = path.join(output, "notes", note.slug, "index.html");
  const html = fs.readFileSync(articleFile, "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `Expected one article title in ${note.slug}`);
  assert.ok(html.includes('name="description"'), `Missing description in ${note.slug}`);
  const headings = addNoteHeadingIds(unified().use(remarkParse).use(remarkGfm).parse(note.content));
  for (const heading of headings) {
    assert.ok(html.includes(`id="${heading.id}"`), `Missing heading target in ${note.slug}`);
    assert.ok(html.includes(`href="#${heading.id}"`), `Missing contents link in ${note.slug}`);
  }
  for (const match of note.content.matchAll(/!\[[^\]]*\]\((\/[^\s)]+)\)/g)) {
    assert.ok(fs.existsSync(path.join(output, match[1])), `Missing article figure in ${note.slug}`);
    assert.ok(html.includes(`src="${match[1]}"`), `Missing rendered article figure in ${note.slug}`);
  }
  if (note.topic === "Kafka") {
    for (const match of note.content.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)) {
      assert.ok(["kafka.apache.org", "cwiki.apache.org", "docs.spring.io", "docs.aws.amazon.com"].includes(new URL(match[1]).hostname), `Nonofficial Kafka reference in ${note.slug}`);
    }
  }
}

const index = fs.readFileSync(path.join(output, "notes", "index.html"), "utf8");
assert.ok(index.includes('id="notes-search"'), "Missing search field.");
assert.ok(index.includes('id="notes-category"'), "Missing category filter.");
for (const topic of getNoteTopics(notes)) {
  const topicUrl = `/notes/topics/${topic.slug}/`;
  assert.ok(index.includes(`href="${topicUrl}"`), "Missing topic link.");
  assert.ok(fs.existsSync(path.join(output, topicUrl, "index.html")), "Missing topic page.");
  for (const category of topic.categories) {
    const categoryUrl = `${topicUrl}${category.slug}/`;
    const categoryHtml = fs.readFileSync(path.join(output, categoryUrl, "index.html"), "utf8");
    for (const note of notes.filter((note) => note.topic === topic.label && note.category === category.label)) {
      assert.ok(categoryHtml.includes(`href="/notes/${note.slug}/"`), "Missing category article link.");
    }
  }
}
for (const privateFile of privateFiles.filter((file) => file.endsWith(".md"))) {
  assert.ok(!fs.existsSync(path.join(output, "notes", path.basename(privateFile, ".md"))), "Retired/private article remains exported.");
}
console.log(`Verified ${notes.length} published guide(s), topic/category navigation, section anchors, and private-source exclusion across ${publicFiles.length} public files.`);
