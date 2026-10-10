"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";

export default function NotesNavigation({ href, label }: { href: string; label: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      try {
        const saved = localStorage.getItem("theme");
        if (saved) dark = saved === "dark";
      } catch { /* Use the system preference if storage is unavailable. */ }
      document.documentElement.classList.toggle("dark", dark);
      setIsDark(dark);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const dark = !isDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch { /* The theme still works without persistence. */ }
  }

  return (
    <nav aria-label="Blog navigation" className="flex items-center justify-between gap-4">
      <Link href={href} className="inline-flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[var(--primary)]"><ArrowLeft size={16} aria-hidden="true" />{label}</Link>
      <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} className="p-2.5 rounded-full bg-[var(--card-bg)] hover:bg-[var(--border)] transition-colors">
        {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      </button>
    </nav>
  );
}
