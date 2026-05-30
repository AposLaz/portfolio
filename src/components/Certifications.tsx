"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink, Calendar } from "lucide-react";

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issued: "March 2026",
    expires: "March 2029",
    badge: "AWS-SAA",
    color: "from-[#FF9900] to-[#FF6600]",
    url: "https://www.credly.com/badges/de7510d2-8a56-4ddd-91d7-e8527b8e73cb/public_url",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issued: "June 2023",
    expires: null,
    badge: "AZ-900",
    color: "from-[#0078D4] to-[#005A9E]",
    url: "https://learn.microsoft.com/en-us/users/apostoloslazidis-5065/credentials/fc2f633f1ec4a524",
  },
  {
    name: "Oracle Cloud Infrastructure 2024 Certified Foundations Associate",
    issuer: "Oracle University",
    issued: "December 2024",
    expires: null,
    badge: "OCI-FA",
    color: "from-[#C74634] to-[#9E2B1F]",
    url: "https://www.linkedin.com/in/apostolos-lazidis/overlay/Certifications/1584037553/treasury?profileId=ACoAACh3WlsBjPfaCnmu492BKaNXqSnOUJ6EjGI",
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="section-padding" ref={ref}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-[var(--card-bg)] rounded-xl p-6 card-hover flex flex-col gap-4 group"
            >
              {/* Badge Icon */}
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center self-start`}
              >
                <Award size={32} className="text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-1">
                  {cert.issuer}
                </p>
                <h3 className="font-bold text-base leading-snug mb-3 group-hover:text-[var(--primary)] transition-colors">
                  {cert.name}
                </h3>

                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-xs text-[var(--secondary)]">
                    <Calendar size={12} />
                    Issued: {cert.issued}
                  </span>
                  {cert.expires && (
                    <span className="flex items-center gap-1.5 text-xs text-[var(--secondary)]">
                      <Calendar size={12} />
                      Expires: {cert.expires}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-1 text-xs text-[var(--primary)] font-medium">
                <ExternalLink size={12} />
                View credential
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
