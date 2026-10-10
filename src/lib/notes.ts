import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { addNoteHeadingIds } from "./note-utils.mjs";
import { readPublishedNotes } from "./note-store.mjs";

export type Note = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  topic: string;
  category: string;
  tags: string[];
  readingMinutes: number;
  content: string;
};

export function getPublishedNotes(directory?: string): Note[] {
  return readPublishedNotes(directory);
}

export function getNoteHeadings(content: string): { id: string; text: string; depth: number }[] {
  return addNoteHeadingIds(unified().use(remarkParse).use(remarkGfm).parse(content));
}
