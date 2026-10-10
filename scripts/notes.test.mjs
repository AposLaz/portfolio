import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { filterNotes, getNoteTopics, addNoteHeadingIds, remarkNoteHeadings } from "../src/lib/note-utils.mjs";
import { validateNoteMetadata } from "../src/lib/note-schema.mjs";
import { readPublishedNotes } from "../src/lib/note-store.mjs";

const script = fileURLToPath(new URL("./notes.mjs", import.meta.url));
const template = fileURLToPath(new URL("../docs/note-template.md", import.meta.url));

async function workspace(t) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "portfolio-notes-test-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  await fs.mkdir(path.join(directory, "docs"));
  await fs.copyFile(template, path.join(directory, "docs", "note-template.md"));
  return directory;
}

function run(cwd, ...args) {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  const result = spawnSync(process.execPath, [script, ...args], { cwd, env, encoding: "utf8" });
  if (result.error) throw result.error;
  return result;
}

function create(cwd, title, ...options) {
  return run(cwd, "new", title, "--topic", "Kafka", "--category", "Troubleshooting", ...options);
}

test("creation preserves metadata and refuses to overwrite a draft", async (t) => {
  const cwd = await workspace(t);
  const title = 'Kafka: "connection refused"';
  assert.equal(create(cwd, title, "--tags", "Offsets, Networking,Offsets").status, 0);
  const [file] = await fs.readdir(path.join(cwd, ".notes"));
  const draft = await fs.readFile(path.join(cwd, ".notes", file), "utf8");
  assert.equal(matter(draft).data.title, title);
  assert.deepEqual(matter(draft).data.tags, ["Offsets", "Networking"]);
  assert.equal(matter(draft).data.topic, "Kafka");
  assert.equal(matter(draft).data.category, "Troubleshooting");
  assert.equal(matter(draft).data.published, false);
  assert.equal(create(cwd, title).status, 1);
  assert.equal(await fs.readFile(path.join(cwd, ".notes", file), "utf8"), draft);
});

test("search finds literal errors in the body and requires every term", async (t) => {
  const cwd = await workspace(t);
  assert.equal(create(cwd, "Kafka connectivity").status, 0);
  const [file] = await fs.readdir(path.join(cwd, ".notes"));
  await fs.appendFile(path.join(cwd, ".notes", file), "\nECONNREFUSED [::1]:9092\n");
  const found = run(cwd, "find", "econnrefused [::1]:9092");
  assert.equal(found.status, 0);
  assert.match(found.stdout, /1 note found/);
  assert.match(found.stdout, /ECONNREFUSED \[::1\]:9092/);
  assert.match(run(cwd, "find", "econnrefused nonexistent").stdout, /0 notes found/);
});

test("publishing retains the draft and refuses incomplete or duplicate entries", async (t) => {
  const cwd = await workspace(t);
  assert.equal(create(cwd, "Kafka connectivity").status, 0);
  const [file] = await fs.readdir(path.join(cwd, ".notes"));
  assert.equal(run(cwd, "publish", file).status, 1);
  const draftPath = path.join(cwd, ".notes", file);
  const { data } = matter(await fs.readFile(draftPath, "utf8"));
  const draft = matter.stringify("\n## Solution\n\nA verified solution.\n", { ...data, summary: "A connectivity investigation.", privateSource: "PRIVATE_SOURCE_SENTINEL" });
  await fs.writeFile(draftPath, draft);
  assert.equal(run(cwd, "publish", file).status, 0);
  const publicText = await fs.readFile(path.join(cwd, "content", "notes", file), "utf8");
  assert.equal(matter(publicText).data.published, true);
  assert.equal(matter(publicText).data.topic, "Kafka");
  assert.equal(matter(publicText).data.category, "Troubleshooting");
  assert.equal(publicText.includes("PRIVATE_SOURCE_SENTINEL"), false);
  assert.equal(await fs.readFile(draftPath, "utf8"), draft);
  assert.equal(run(cwd, "publish", file).status, 1);
});

test("publishing rejects traversal and command usage errors", async (t) => {
  const cwd = await workspace(t);
  for (const filename of ["../secret.md", "/tmp/secret.md", "nested/secret.md"]) {
    assert.equal(run(cwd, "publish", filename).status, 1);
  }
  assert.equal(run(cwd, "find", "").status, 1);
  assert.equal(run(cwd, "new", "Kafka", "--unexpected", "value").status, 1);
  assert.equal(run(cwd, "new", "Kafka", "--topic", "Kafka").status, 1);
  assert.equal(create(cwd, "Kafka", "--topic", "Duplicate").status, 1);
});

test("publishing rejects missing taxonomy, invalid dates, and conflicting topic URLs", async (t) => {
  const cwd = await workspace(t);
  create(cwd, "Kafka connectivity");
  const [file] = await fs.readdir(path.join(cwd, ".notes"));
  const draftPath = path.join(cwd, ".notes", file);
  const { data } = matter(await fs.readFile(draftPath, "utf8"));
  const complete = { ...data, summary: "A useful explanation." };
  for (const invalid of [{ ...complete, topic: "" }, { ...complete, category: "" }, { ...complete, date: "2026-02-30" }]) {
    await fs.writeFile(draftPath, matter.stringify("Useful content", invalid));
    assert.equal(run(cwd, "publish", file).status, 1);
  }
  await fs.mkdir(path.join(cwd, "content", "notes"), { recursive: true });
  await fs.writeFile(path.join(cwd, "content", "notes", "existing.md"), matter.stringify("Existing guide", { ...complete, topic: "KAFKA", published: true }));
  await fs.writeFile(draftPath, matter.stringify("Useful content", complete));
  assert.equal(run(cwd, "publish", file).status, 1);
});

const exampleNotes = [
  { slug: "polling", title: "Polling", summary: "Slow processing", topic: "Kafka", category: "Troubleshooting", tags: ["Offsets"], content: "Literal error ECONNREFUSED [::1]:9092" },
  { slug: "basics", title: "Basics", summary: "Getting started", topic: "Kafka", category: "Concepts", tags: ["Partitions"], content: "A conceptual explanation" },
  { slug: "dns", title: "DNS", summary: "Networking", topic: "Kubernetes", category: "Troubleshooting", tags: ["Networking"], content: "DNS resolution" },
];

test("topic and category browsing scales across guides and rejects URL collisions", () => {
  const topics = getNoteTopics(exampleNotes);
  assert.equal(topics[0].slug, "kafka");
  assert.equal(topics[0].count, 2);
  assert.deepEqual(topics[0].categories.map((category) => category.slug), ["concepts", "troubleshooting"]);
  assert.equal(topics[1].slug, "kubernetes");
  assert.throws(() => getNoteTopics([...exampleNotes, { ...exampleNotes[0], topic: "KAFKA" }]), /consistent topic/);
});

test("full-text search combines topic, category, and concept filters", () => {
  assert.deepEqual(filterNotes(exampleNotes, { topic: "Kafka", category: "Troubleshooting", tag: "Offsets", query: "ECONNREFUSED [::1]:9092" }).map((note) => note.slug), ["polling"]);
  assert.equal(filterNotes(exampleNotes, { category: "Troubleshooting" }).length, 2);
  assert.equal(filterNotes(exampleNotes, { query: "kafka troubleshooting" }).length, 1);
  assert.equal(filterNotes(exampleNotes, { query: "polling missing" }).length, 0);
  assert.equal(filterNotes(exampleNotes).length, 3);
});

test("contents links match rendered heading IDs and ignore fenced code", () => {
  const content = '## Check **polling**\n\n```text\n## Hidden code heading\n```\n\n### Check [polling](https://example.com)\n\n## Check polling\n';
  const parser = unified().use(remarkParse).use(remarkGfm);
  const headings = addNoteHeadingIds(parser.parse(content));
  assert.deepEqual(headings.map((heading) => heading.id), ["section-check-polling", "section-check-polling-2", "section-check-polling-3"]);
  const renderer = parser().use(remarkNoteHeadings);
  const rendered = renderer.runSync(renderer.parse(content));
  assert.deepEqual(rendered.children.filter((node) => node.type === "heading").map((node) => node.data.hProperties.id), headings.map((heading) => heading.id));
});

test("public metadata validation requires taxonomy and excludes extra private fields", () => {
  const data = { title: "Guide", summary: "A useful guide", date: "2026-10-10", topic: "Kafka", category: "Troubleshooting", tags: ["Offsets"], privateSource: "PRIVATE_SENTINEL" };
  assert.equal(JSON.stringify(validateNoteMetadata(data, "Useful guide")).includes("PRIVATE_SENTINEL"), false);
  assert.throws(() => validateNoteMetadata({ ...data, topic: "" }, "Useful guide"), /topic/);
  assert.throws(() => validateNoteMetadata({ ...data, category: "{{category}}" }, "Useful guide"), /category/);
});

test("unpublished entries and private archives never enter public search or taxonomy", async (t) => {
  const cwd = await workspace(t);
  const publicDirectory = path.join(cwd, "content", "notes");
  await fs.mkdir(publicDirectory, { recursive: true });
  await fs.mkdir(path.join(cwd, ".notes"));
  const data = { title: "A public guide", summary: "An explanation", date: "2026-10-10", topic: "Kafka", category: "Troubleshooting", tags: [], published: true, source: "PRIVATE_METADATA_SENTINEL" };
  await fs.writeFile(path.join(publicDirectory, "public-guide.md"), matter.stringify("Public content", data));
  await fs.writeFile(path.join(publicDirectory, "draft.md"), matter.stringify("PRIVATE_DRAFT_SENTINEL", { published: false, topic: "Private topic" }));
  await fs.writeFile(path.join(publicDirectory, "string-flag.md"), matter.stringify("PRIVATE_FLAG_SENTINEL", { published: "true" }));
  await fs.writeFile(path.join(cwd, ".notes", "evidence.md"), matter.stringify("PRIVATE_ARCHIVE_SENTINEL", { ...data, topic: "Private topic" }));
  const notes = readPublishedNotes(publicDirectory);
  assert.equal(notes.length, 1);
  assert.equal(JSON.stringify(notes).includes("PRIVATE_"), false);
  assert.equal(filterNotes(notes, { query: "PRIVATE_" }).length, 0);
  assert.deepEqual(getNoteTopics(notes).map((topic) => topic.label), ["Kafka"]);
});
