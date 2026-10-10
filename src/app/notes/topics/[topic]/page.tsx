import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NotesCollection from "@/components/NotesCollection";
import { getPublishedNotes } from "@/lib/notes";
import { getNoteTopics } from "@/lib/note-utils.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getNoteTopics(getPublishedNotes()).map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const entry = getNoteTopics(getPublishedNotes()).find((entry) => entry.slug === topic);
  return entry ? { title: `${entry.label} | Blog`, description: `Practical ${entry.label} guides and reusable troubleshooting steps.` } : {};
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const notes = getPublishedNotes();
  const entry = getNoteTopics(notes).find((entry) => entry.slug === topic);
  if (!entry) notFound();
  return <NotesCollection notes={notes} topic={entry.label} />;
}
