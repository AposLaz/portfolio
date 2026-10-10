import type { Metadata } from "next";
import NotesCollection from "@/components/NotesCollection";
import { getPublishedNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Blog | Apostolos Lazidis",
  description: "Stories, guides, and practical lessons from building and understanding systems.",
};

export default function NotesPage() {
  return <NotesCollection notes={getPublishedNotes()} />;
}
