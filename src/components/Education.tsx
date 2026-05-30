"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const education = [
  {
    degree: "Master of Science in Computer Science and Engineering",
    institution: "Technical University of Crete",
    location: "Chania, GR",
    period: "Nov 2022 - February 2026",
    status: "In Progress",
    dissertation: "Latency Optimized Node and Traffic Scheduling in Kubernetes",
    description:
      "Advanced studies in computer science with focus on distributed systems, cloud computing, and software engineering.",
  },
  {
    degree:
      "Integrated Master of Science in Electrical and Computer Engineering",
    institution: "Technical University of Crete",
    location: "Chania, GR",
    period: "Sept 2014 - Aug 2021",
    dissertation:
      "Publication and Subscription Services in Web Applications: A Comparative Study",
    description:
      "Comprehensive 5-year engineering program covering electrical engineering, computer science, and software development.",
  },
];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding" ref={ref}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
        </motion.div>
        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              {index < education.length - 1 && (
                <div className="absolute left-[11px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)] to-[var(--accent)]" />
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                <GraduationCap size={14} className="text-white" />
              </div>

              {/* Content */}
              <div className="bg-[var(--card-bg)] rounded-xl p-6 card-hover">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {edu.status && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full gradient-bg text-white">
                      {edu.status}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-sm text-[var(--secondary)]">
                    <Calendar size={14} />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-[var(--secondary)]">
                    <MapPin size={14} />
                    {edu.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                <p className="text-[var(--primary)] font-medium mb-3">
                  {edu.institution}
                </p>
                <p className="text-[var(--secondary)] text-sm mb-3">
                  {edu.description}
                </p>

                {edu.dissertation && (
                  <div className="mt-4 p-4 rounded-lg bg-[var(--background)] border-l-4 border-[var(--primary)]">
                    <p className="text-sm font-medium mb-1">Dissertation:</p>
                    <p className="text-sm text-[var(--secondary)]">
                      {edu.dissertation}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {/* Military Service Note */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-8"
        >
          <div className="text-center text-[var(--secondary)] text-sm">
            <p>Military Service: September 2021 - September 2022 ✓</p>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
