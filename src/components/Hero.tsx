"use client";

import { motion } from "framer-motion";
import { Mail, ChevronDown, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto rounded-full gradient-bg p-1">
            <div className="w-full h-full rounded-full bg-[var(--background)] flex items-center justify-center">
              <span className="text-4xl font-bold gradient-text">AL</span>
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          <span className="gradient-text">Apostolos Lazidis</span>
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl lg:text-3xl text-[var(--secondary)] mb-6"
        >
          DevSecOps Engineer
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-[var(--secondary)] mb-8 max-w-2xl mx-auto"
        >
          Building secure, scalable infrastructure and modern web applications.
          Specializing in Kubernetes, AWS, CI/CD pipelines, and cloud-native
          technologies.
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <a
            href="https://github.com/AposLaz"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[var(--card-bg)] hover:bg-[var(--primary)] hover:text-white transition-all card-hover"
          >
            <GithubIcon size={24} />
          </a>
          <a
            href="https://linkedin.com/in/apostolos-lazidis"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[var(--card-bg)] hover:bg-[var(--primary)] hover:text-white transition-all card-hover"
          >
            <LinkedinIcon size={24} />
          </a>
          <a
            href="mailto:aplazidis@gmail.com"
            className="p-3 rounded-full bg-[var(--card-bg)] hover:bg-[var(--primary)] hover:text-white transition-all card-hover"
          >
            <Mail size={24} />
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-3 rounded-full gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
          >
            Get In Touch
          </a>
          <a
            href="/cv.pdf"
            download
            className="px-8 py-3 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-medium hover:bg-[var(--primary)] hover:text-white transition-all flex items-center gap-2"
          >
            <Download size={18} />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-0 pointer-events-auto"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[var(--secondary)] block"
        >
          <ChevronDown size={32} />
        </motion.a>
      </motion.div>
    </section>
  );
}
