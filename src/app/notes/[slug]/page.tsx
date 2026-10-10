import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import NotesNavigation from "@/components/NotesNavigation";
import { getPublishedNotes, getNoteHeadings } from "@/lib/notes";
import { labelSlug } from "@/lib/note-schema.mjs";
import { remarkNoteHeadings } from "@/lib/note-utils.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getPublishedNotes().find((entry) => entry.slug === slug);
  return note ? { title: `${note.title} | Blog`, description: note.summary, openGraph: { title: note.title, description: note.summary, type: "article" } } : {};
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getPublishedNotes().find((entry) => entry.slug === slug);
  if (!note) notFound();
  const topicUrl = `/notes/topics/${labelSlug(note.topic)}/`;
  const categoryUrl = `${topicUrl}${labelSlug(note.category)}/`;
  const headings = getNoteHeadings(note.content);
  const contents = <ol className="space-y-2 text-sm leading-relaxed">
    {headings.map((heading) => <li key={heading.id} className={heading.depth === 3 ? "pl-3" : ""}><a href={`#${heading.id}`} className="text-[var(--secondary)] hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]">{heading.text}</a></li>)}
  </ol>;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16 flex-1">
        <NotesNavigation href="/notes/" label="All posts" />
        <article className="pt-12">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--secondary)] flex flex-wrap gap-2 mb-8">
            <Link href="/notes/" className="hover:text-[var(--primary)]">Blog</Link><span aria-hidden="true">/</span>
            <Link href={topicUrl} className="hover:text-[var(--primary)]">{note.topic}</Link><span aria-hidden="true">/</span>
            <Link href={categoryUrl} className="hover:text-[var(--primary)]">{note.category}</Link>
          </nav>
          <header className="max-w-3xl mb-10 pb-8 border-b border-[var(--border)]">
            <div className="flex flex-wrap gap-2 mb-5">{note.tags.map((tag) => <span key={tag} className="rounded-full text-sm bg-[var(--card-bg)] text-[var(--primary)] px-3 py-1">{tag}</span>)}</div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-5">{note.title}</h1>
            <p className="text-lg text-[var(--secondary)] leading-relaxed mb-5">{note.summary}</p>
            <p className="text-sm text-[var(--secondary)]"><time dateTime={note.date}>{note.date}</time> · {note.readingMinutes} min read</p>
          </header>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_16rem] gap-10 lg:gap-14 items-start">
            {headings.length > 0 && <aside className="lg:order-2 lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 w-full">
              <nav aria-label="Article contents" className="hidden lg:block">
                <h2 className="font-semibold mb-4">On this page</h2>
                {contents}
              </nav>
              <nav aria-label="Article contents" className="lg:hidden">
                <details>
                  <summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-[var(--primary)]">On this page</summary>
                  <div className="mt-4">{contents}</div>
                </details>
              </nav>
            </aside>}
            <div className="note-prose min-w-0"><ReactMarkdown remarkPlugins={[remarkGfm, remarkNoteHeadings]}>{note.content}</ReactMarkdown></div>
          </div>
        </article>
        <Link href={categoryUrl} className="inline-flex items-center gap-2 mt-12 text-[var(--primary)]"><ArrowLeft size={16} aria-hidden="true" />More {note.topic} {note.category.toLowerCase()} posts</Link>
      </main>
      <Footer />
    </div>
  );
}
