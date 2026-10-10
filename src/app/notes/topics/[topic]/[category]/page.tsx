import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NotesCollection from "@/components/NotesCollection";
import { getPublishedNotes } from "@/lib/notes";
import { getNoteTopics } from "@/lib/note-utils.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getNoteTopics(getPublishedNotes()).flatMap((topic) => topic.categories.map((category) => ({ topic: topic.slug, category: category.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string; category: string }> }): Promise<Metadata> {
  const values = await params;
  const topic = getNoteTopics(getPublishedNotes()).find((entry) => entry.slug === values.topic);
  const category = topic?.categories.find((entry) => entry.slug === values.category);
  return topic && category ? { title: `${topic.label} ${category.label} | Blog`, description: `Practical ${topic.label} guides for ${category.label.toLowerCase()}.` } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ topic: string; category: string }> }) {
  const values = await params;
  const notes = getPublishedNotes();
  const topic = getNoteTopics(notes).find((entry) => entry.slug === values.topic);
  const category = topic?.categories.find((entry) => entry.slug === values.category);
  if (!topic || !category) notFound();
  return <NotesCollection notes={notes} topic={topic.label} category={category.label} />;
}
