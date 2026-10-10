import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { labelSlug, validateNoteMetadata } from "../src/lib/note-schema.mjs";
import { getNoteTopics } from "../src/lib/note-utils.mjs";

const root = process.cwd();
const drafts = path.join(root, ".notes");
const published = path.join(root, "content", "notes");
const [command = "help", ...args] = process.argv.slice(2);

async function filesIn(directory) {
  try {
    return (await fs.readdir(directory)).filter((file) => file.endsWith(".md")).sort().reverse();
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function main() {
  if (command === "help") {
    console.log(`Technical notes

  npm run notes -- new "Issue title" --topic "Kafka" --category "Troubleshooting" --tags "Consumer groups,Offsets"
  npm run notes -- list
  npm run notes -- find "exact error or keywords"
  npm run notes -- publish draft-filename.md

Drafts live in .notes/ (ignored by Git). Edit them in your text editor.
Publish copies a reviewed draft into content/notes/ for the public website.
Back up drafts separately; they do not sync automatically.`);
    return;
  }

  if (command === "new") {
    const [rawTitle, ...flags] = args;
    const title = rawTitle?.trim();
    const options = {};
    const usage = 'Usage: npm run notes -- new "Issue title" --topic "Kafka" --category "Troubleshooting" [--tags "Consumer groups,Offsets"]';
    if (!title || flags.length % 2) throw new Error(usage);
    for (let i = 0; i < flags.length; i += 2) {
      const flag = flags[i];
      if (!["--topic", "--category", "--tags"].includes(flag) || Object.hasOwn(options, flag) || !flags[i + 1].trim() || flags[i + 1].startsWith("--")) throw new Error(usage);
      options[flag] = flags[i + 1].trim();
    }
    if (!options["--topic"] || !options["--category"]) throw new Error(usage);
    if (!labelSlug(options["--topic"]) || !labelSlug(options["--category"])) throw new Error("Include Latin letters or numbers in the topic and category for their URLs.");
    const slug = labelSlug(title).slice(0, 100).replace(/-$/, "");
    if (!slug) throw new Error("Include a word using Latin letters or a number in the title for the filename.");
    const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Athens", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    const template = matter(await fs.readFile(path.join(root, "docs", "note-template.md"), "utf8"));
    const content = matter.stringify(template.content, {
      ...template.data,
      title,
      date,
      topic: options["--topic"],
      category: options["--category"],
      tags: [...new Set((options["--tags"] ?? "").split(",").map((tag) => tag.trim()).filter(Boolean))],
      published: false,
    });
    const filename = path.join(drafts, `${date}-${slug}.md`);
    await fs.mkdir(drafts, { recursive: true });
    await fs.writeFile(filename, content, { flag: "wx" });
    console.log(`Created private draft: ${filename}\nOpen this file in your editor and fill in the details.`);
    return;
  }

  if (command === "list" || command === "find") {
    if ((command === "list" && args.length) || (command === "find" && (args.length !== 1 || !args[0].trim()))) {
      throw new Error(command === "list" ? "Usage: npm run notes -- list" : 'Usage: npm run notes -- find "error or keywords"');
    }
    const terms = command === "find" ? args[0].toLowerCase().trim().split(/\s+/) : [];
    let count = 0;
    for (const directory of [drafts, published]) {
      for (const file of await filesIn(directory)) {
        const text = await fs.readFile(path.join(directory, file), "utf8");
        if (!terms.every((term) => text.toLowerCase().includes(term))) continue;
        const { data } = matter(text);
        console.log(`${path.relative(root, path.join(directory, file))} — ${data.title ?? file}`);
        if (terms.length) {
          const lines = text.split("\n");
          const index = lines.findIndex((line) => terms.some((term) => line.toLowerCase().includes(term)));
          console.log(`  ${index + 1}: ${lines[index].trim()}`);
        }
        count++;
      }
    }
    console.log(`${count} ${count === 1 ? "note" : "notes"} ${command === "find" ? "found" : "available"}.`);
    return;
  }

  if (command === "publish") {
    const [file] = args;
    if (args.length !== 1 || !file || !/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(file)) {
      throw new Error("Provide the draft filename only, using lowercase words and hyphens, ending in .md.");
    }
    const { data, content } = matter(await fs.readFile(path.join(drafts, file), "utf8"));
    const metadata = validateNoteMetadata(data, content);
    const existing = [];
    for (const name of await filesIn(published)) {
      const entry = matter(await fs.readFile(path.join(published, name), "utf8"));
      if (entry.data.published === true) existing.push(validateNoteMetadata(entry.data, entry.content));
    }
    getNoteTopics([...existing, metadata]);
    await fs.mkdir(published, { recursive: true });
    const destination = path.join(published, file);
    // Copy only public metadata fields; private annotations in draft frontmatter stay local.
    await fs.writeFile(destination, matter.stringify(content, { ...metadata, published: true }), { flag: "wx" });
    console.log(`Prepared public entry: ${destination}\nThis copy will appear in the next website build. Your private draft is retained.\nReview the public copy before committing; deploying uses the existing repository workflow.`);
    return;
  }

  throw new Error(`Unknown command: ${command}. Run npm run notes -- help.`);
}

main().catch((error) => {
  if (error.code === "EEXIST") console.error("That note already exists. Edit it directly or choose a different title; no file was overwritten.");
  else console.error(error.message);
  process.exitCode = 1;
});
