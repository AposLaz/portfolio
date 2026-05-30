"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, ExternalLink, Calendar } from "lucide-react";

const publications = [
  {
    title:
      "Publish - Subscribe Approaches for the IoT and the Cloud: Functional and Performance Evaluation of Open-Source Systems",
    authors: "Apostolos Lazidis, Konstantinos Tsakos, Euripides G.M. Petrakis",
    journal: "Internet of Things",
    date: "May 17, 2022",
    type: "Journal Publication",
    description:
      "A comprehensive evaluation of open-source publish-subscribe systems for IoT and cloud environments, focusing on functional capabilities and performance metrics.",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S2542660522000403",
  },
  {
    title: "Open-Source Publish - Subscribe Systems: A Comparative Study",
    authors:
      "Apostolos Lazidis, Euripides G.M. Petrakis, Spyridon Chouliaras, Stelios Sotiriadis",
    conference:
      "36th International Conference on Advanced Information Networking and Applications (AINA 2022)",
    location: "Virtually, Sydney, Australia",
    date: "April 13 - 15, 2022",
    type: "Conference Paper",
    description:
      "A comparative analysis of open-source publish-subscribe systems, examining their architectures, features, and suitability for different use cases.",
    link: "https://link.springer.com/chapter/10.1007/978-3-030-99584-3_10",
  },
];

export default function Publications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="publications"
      className="section-padding bg-[var(--card-bg)]"
      ref={ref}
    >
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Research <span className="gradient-text">Publications</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[var(--background)] rounded-xl p-6 md:p-8 card-hover"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center">
                    <BookOpen size={28} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 text-xs font-medium rounded-full gradient-bg text-white">
                      {pub.type}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-[var(--secondary)]">
                      <Calendar size={14} />
                      {pub.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {pub.title}
                  </h3>

                  <p className="text-[var(--primary)] font-medium mb-2">
                    {pub.authors}
                  </p>

                  <p className="text-[var(--secondary)] text-sm mb-3">
                    {pub.journal || pub.conference}
                    {pub.location && ` — ${pub.location}`}
                  </p>

                  <p className="text-[var(--secondary)] text-sm leading-relaxed mb-4">
                    {pub.description}
                  </p>

                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--primary)] hover:underline"
                    >
                      <ExternalLink size={16} />
                      View Publication
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dissertation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 p-6 rounded-xl border-2 border-dashed border-[var(--border)]"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-[var(--primary)]/10">
              <BookOpen size={24} className="text-[var(--primary)]" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">
                Master&apos;s Dissertation
              </h4>
              <p className="text-[var(--secondary)]">
                Publication and Subscription Services in Web Applications: A
                Comparative Study
              </p>
              <p className="text-sm text-[var(--secondary)] mt-2">
                Technical University of Crete - School of Electrical & Computer
                Engineering
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
