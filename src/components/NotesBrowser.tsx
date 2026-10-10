"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { Note } from "@/lib/notes";
import { filterNotes } from "@/lib/note-utils.mjs";
import { labelSlug } from "@/lib/note-schema.mjs";

export default function NotesBrowser({ notes, showCategoryFilter = true }: { notes: Note[]; showCategoryFilter?: boolean }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const tags = [...new Set(notes.flatMap((note) => note.tags))].sort();
  const categories = [...new Set(notes.map((note) => note.category))].sort();
  const matches: Note[] = filterNotes(notes, { query, category: selectedCategory, tag: selectedTag });
  const hasFilters = Boolean(query || selectedTag || selectedCategory);

  return (
    <div>
      <label htmlFor="notes-search" className="block text-sm font-medium mb-3">Find a problem or solution</label>
      <div className="relative mb-5">
        <Search aria-hidden="true" size={20} className="absolute left-4 top-4 text-[var(--secondary)]" />
        <input id="notes-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search errors, commands, technologies…" className="w-full rounded-xl border border-[var(--border)] bg-[var(--card-bg)] py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[var(--primary)]" />
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        {showCategoryFilter && <div className="flex-1 min-w-48">
          <label htmlFor="notes-category" className="block text-sm font-medium mb-2">Category</label>
          <select id="notes-category" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 focus:ring-2 focus:ring-[var(--primary)]">
            <option value="">All categories</option>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </div>}
        <div className="flex-1 min-w-48">
          <label htmlFor="notes-tag" className="block text-sm font-medium mb-2">Concept</label>
          <select id="notes-tag" value={selectedTag} onChange={(event) => setSelectedTag(event.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 focus:ring-2 focus:ring-[var(--primary)]">
            <option value="">All concepts</option>
            {tags.map((tag) => <option key={tag}>{tag}</option>)}
          </select>
        </div>
      </div>
      <p role="status" className="text-sm text-[var(--secondary)] mb-5">{matches.length} {matches.length === 1 ? "post" : "posts"}{hasFilters ? " found" : " available"}</p>
      <div className="grid gap-5 md:grid-cols-2">
        {matches.map((note) => (
          <article key={note.slug} className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 flex flex-col">
            <p className="text-sm text-[var(--secondary)] mb-4">
              <Link href={`/notes/topics/${labelSlug(note.topic)}/`} className="hover:text-[var(--primary)]">{note.topic}</Link>
              <span aria-hidden="true"> / </span>
              <Link href={`/notes/topics/${labelSlug(note.topic)}/${labelSlug(note.category)}/`} className="hover:text-[var(--primary)]">{note.category}</Link>
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag) => <span key={tag} className="text-xs text-[var(--primary)] rounded-full bg-[var(--background)] px-3 py-1">{tag}</span>)}
            </div>
            <h2 className="text-xl font-semibold mb-3"><Link href={`/notes/${note.slug}/`} className="hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]">{note.title}</Link></h2>
            <p className="text-[var(--secondary)] leading-relaxed mb-6">{note.summary}</p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="text-[var(--secondary)]"><time dateTime={note.date}>{note.date}</time> · {note.readingMinutes} min read</span>
              <Link href={`/notes/${note.slug}/`} className="inline-flex items-center gap-1 text-[var(--primary)] font-medium">Read post <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
          </article>
        ))}
      </div>
      {matches.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-10 text-center">
          <h2 className="text-xl font-semibold mb-3">{notes.length ? "No matching posts" : "No posts published yet"}</h2>
          <p className="text-[var(--secondary)]">{notes.length ? "Try a shorter error fragment or clear the filters." : "Stories, guides, and practical lessons will appear here."}</p>
          {hasFilters && <button type="button" onClick={() => { setQuery(""); setSelectedTag(""); setSelectedCategory(""); }} className="inline-flex items-center gap-2 mt-5 text-[var(--primary)]"><X size={16} aria-hidden="true" />Clear filters</button>}
        </div>
      )}
    </div>
  );
}
