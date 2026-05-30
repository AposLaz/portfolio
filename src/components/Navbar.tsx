"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // avoid reading window/localStorage during render to prevent SSR/client mismatch
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // attach scroll listener
    window.addEventListener("scroll", handleScroll);
    // run once to set initial scrolled state (deferred to avoid sync setState)
    requestAnimationFrame(handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // sync document class when `isDark` changes (no setState here)
  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // ignore (e.g., during SSR safety)
    }
  }, [isDark]);

  // Determine theme on client after mount to avoid hydration mismatch
  useEffect(() => {
    // Defer all state updates to avoid synchronous setState inside the effect
    const rafId = requestAnimationFrame(() => {
      setMounted(true);
      try {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        const shouldDark =
          savedTheme === "dark" || (!savedTheme && prefersDark);
        setIsDark(shouldDark);
      } catch {
        // ignore
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--background)]/90 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="#"
              className="text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              AL
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--secondary)] hover:text-[var(--primary)] transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-[var(--card-bg)] hover:bg-[var(--border)] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {mounted ? (
                  isDark ? (
                    <Sun size={18} />
                  ) : (
                    <Moon size={18} />
                  )
                ) : (
                  <Sun size={18} style={{ visibility: "hidden" }} />
                )}
              </motion.button>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-[var(--card-bg)]"
                whileTap={{ scale: 0.9 }}
              >
                {mounted ? (
                  isDark ? (
                    <Sun size={18} />
                  ) : (
                    <Moon size={18} />
                  )
                ) : (
                  <Sun size={18} style={{ visibility: "hidden" }} />
                )}
              </motion.button>
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden bg-[var(--background)]/95 backdrop-blur-lg pt-20"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-[var(--secondary)] hover:text-[var(--primary)] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
