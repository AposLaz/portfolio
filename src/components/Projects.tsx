"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Server, Cloud, Workflow } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import Image from "next/image";

const projects = [
  {
    title: "Kube-NetLag",
    description:
      "A lightweight network performance testing and latency simulation tool deployed as a DaemonSet across Kubernetes clusters. Measures network delays between nodes using Netperf with Prometheus metrics exposure for monitoring.",
    technologies: [
      "Go",
      "Kubernetes",
      "Helm",
      "Prometheus",
      "Docker",
      "Netperf",
    ],
    icon: Server,
    github: "https://github.com/AposLaz/kube-netlag",
    gradient: "from-blue-500 to-cyan-500",
    image: "/projects/kube-netlag.png",
    imageScale: "scale-120",
  },
  {
    title: "StornX",
    description:
      "Latency-optimized node and traffic scheduling system for Kubernetes. Features OptiScaler for communication-aware replica placement across nodes and availability zones, and OptiBalancer for metric-aware traffic distribution based on latency, resource utilization, and replica count.",
    technologies: [
      "TypeScript",
      "Kubernetes",
      "Helm",
      "Istio",
      "Prometheus",
      "Docker",
    ],
    icon: Cloud,
    github: "https://github.com/AposLaz/StornX",
    gradient: "from-black-500 to-black-500",
    image: "/projects/stornx-1.png",
    imageScale: "scale-190",
  },
  {
    title: "KEDIMA - Technical University of Crete",
    description:
      "Designed and developed a user-friendly website for the Technical University of Crete. Implemented search functionality with keywords and category-based navigation using React.js and Typo3 CMS.",
    technologies: ["React.js", "Typo3", "JavaScript", "CSS", "Nginx"],
    icon: Workflow,
    link: "https://www.tls.tuc.gr",
    gradient: "from-green-500 to-emerald-500",
    image: "/projects/kedima.png",
    imageScale: "scale-95",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/AposLaz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-medium hover:bg-[var(--primary)] hover:text-white transition-all"
          >
            <GithubIcon size={20} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative bg-[var(--card-bg)] rounded-2xl overflow-hidden card-hover"
    >
      {/* Header with image or gradient fallback */}
      <div className="relative h-48 overflow-hidden bg-white dark:bg-gray-900">
        {project.image && !imageError ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-contain transition-transform duration-300 group-hover:scale-105 ${project.imageScale || ""}`}
              onError={() => setImageError(true)}
            />
            {/* Gradient overlay for better icon visibility */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`}
            />
          </>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-r ${project.gradient}`}
          />
        )}
        {/* Icon overlay */}
        <div className="absolute bottom-6 left-6">
          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <project.icon size={28} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">
          {project.title}
        </h3>
        <p className="text-[var(--secondary)] text-sm mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-[var(--background)] text-[var(--secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--primary)] hover:underline"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[var(--primary)]"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
