import Link from "next/link";
import { BookOpen } from "lucide-react";
import NotesBrowser from "@/components/NotesBrowser";
import Footer from "@/components/Footer";
import NotesNavigation from "@/components/NotesNavigation";
import type { Note } from "@/lib/notes";
import { filterNotes, getNoteTopics } from "@/lib/note-utils.mjs";
import { labelSlug } from "@/lib/note-schema.mjs";

export default function NotesCollection({ notes, topic, category }: { notes: Note[]; topic?: string; category?: string }) {
  const topics = getNoteTopics(notes);
  const selectedTopic = topics.find((entry) => entry.label === topic);
  const scopedNotes: Note[] = filterNotes(notes, { topic, category });
  const topicUrl = topic ? `/notes/topics/${labelSlug(topic)}/` : "/notes/";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16 flex-1">
        <NotesNavigation href={category ? topicUrl : topic ? "/notes/" : "/"} label={category ? `All ${topic} posts` : topic ? "All posts" : "Back to portfolio"} />
        <header className="py-12 md:py-16 max-w-2xl">
          <p className="flex items-center gap-2 text-[var(--primary)] font-medium mb-4"><BookOpen size={20} aria-hidden="true" />Stories and lessons</p>
          {topic && <nav aria-label="Breadcrumb" className="text-sm text-[var(--secondary)] mb-5">
            <Link href="/notes/" className="hover:text-[var(--primary)]">Blog</Link><span aria-hidden="true"> / </span>
            {category ? <><Link href={topicUrl} className="hover:text-[var(--primary)]">{topic}</Link><span aria-hidden="true"> / </span><span aria-current="page">{category}</span></> : <span aria-current="page">{topic}</span>}
          </nav>}
          <h1 className="text-4xl md:text-5xl font-bold mb-5">{category ?? topic ?? <span className="gradient-text">Blog</span>}</h1>
          <p className="text-lg text-[var(--secondary)] leading-relaxed">{category ? `Practical ${topic} guides for ${category.toLowerCase()}: recognize the symptoms, investigate the cause, and verify the outcome.` : topic ? `Build your understanding of ${topic} with practical explanations and steps you can reuse.` : "Stories, guides, and practical lessons from building and understanding systems."}</p>
        </header>
        <nav aria-label="Browse by topic" className="mb-8">
          <h2 className="text-sm font-semibold mb-3">Topics</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/notes/" aria-current={!topic ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm ${!topic ? "bg-[var(--primary)] border-[var(--primary)] text-white" : "border-[var(--border)] hover:text-[var(--primary)]"}`}>All topics</Link>
            {topics.map((entry) => <Link key={entry.slug} href={`/notes/topics/${entry.slug}/`} aria-current={topic === entry.label && !category ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm ${topic === entry.label ? "border-[var(--primary)] text-[var(--primary)]" : "border-[var(--border)] hover:text-[var(--primary)]"}`}>{entry.label} <span className="ml-1 opacity-70">{entry.count}</span></Link>)}
          </div>
        </nav>
        {selectedTopic && <nav aria-label={`${topic} categories`} className="mb-8">
          <h2 className="text-sm font-semibold mb-3">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Link href={topicUrl} aria-current={!category ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm ${!category ? "bg-[var(--primary)] border-[var(--primary)] text-white" : "border-[var(--border)] hover:text-[var(--primary)]"}`}>All categories</Link>
            {selectedTopic.categories.map((entry) => <Link key={entry.slug} href={`${topicUrl}${entry.slug}/`} aria-current={category === entry.label ? "page" : undefined} className={`rounded-full border px-4 py-2 text-sm ${category === entry.label ? "bg-[var(--primary)] border-[var(--primary)] text-white" : "border-[var(--border)] hover:text-[var(--primary)]"}`}>{entry.label}</Link>)}
          </div>
        </nav>}
        <NotesBrowser key={`${topic ?? "all"}/${category ?? "all"}`} notes={scopedNotes} showCategoryFilter={!selectedTopic} />
      </main>
      <Footer />
    </div>
  );
}
