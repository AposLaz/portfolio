import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function TechnicalNotes() {
  return (
    <section id="notes" className="section-padding">
      <div className="container-max rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8">
        <div className="flex-1">
          <BookOpen className="text-[var(--primary)] mb-4" size={28} aria-hidden="true" />
          <h2 className="text-3xl font-bold mb-4"><span className="gradient-text">Blog</span></h2>
          <p className="text-[var(--secondary)] leading-relaxed max-w-2xl">Stories, guides, and practical lessons from building and understanding systems.</p>
        </div>
        <Link href="/notes/" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-dark)] transition-colors shrink-0">Browse blog <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
