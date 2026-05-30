"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">AL</span>
            <span className="text-[var(--secondary)] text-sm">
              © {currentYear} Apostolos Lazidis. All rights reserved.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AposLaz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-[var(--card-bg)] transition-colors text-[var(--secondary)] hover:text-[var(--primary)]"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://linkedin.com/in/apostolos-lazidis"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-[var(--card-bg)] transition-colors text-[var(--secondary)] hover:text-[var(--primary)]"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href="mailto:aplazidis@gmail.com"
              className="p-2 rounded-full hover:bg-[var(--card-bg)] transition-colors text-[var(--secondary)] hover:text-[var(--primary)]"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
