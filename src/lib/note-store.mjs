import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { validateNoteMetadata } from "./note-schema.mjs";
import { getNoteTopics } from "./note-utils.mjs";

// Read only the public content directory. Private archives never enter this path.
export function readPublishedNotes(directory = path.join(process.cwd(), "content", "notes")) {
  if (!fs.existsSync(directory)) return [];
  const notes = fs.readdirSync(directory).filter((file) => file.endsWith(".md")).flatMap((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(directory, file), "utf8"));
    if (data.published !== true) return [];
    const slug = file.slice(0, -3);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(`Invalid note filename: ${file}. Use lowercase words separated by hyphens.`);
    }
    let metadata;
    try { metadata = validateNoteMetadata(data, content); }
    catch (error) { throw new Error(`${file}: ${error.message}`); }
    return [{ ...metadata, slug, content, readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)) }];
  }).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  getNoteTopics(notes);
  return notes;
}
