"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    title: "DevSecOps Engineer",
    company: "European Dynamics",
    location: "Remote",
    period: "May 2024 - Present",
    technologies: [
      "Kubernetes",
      "Helm Charts",
      "Docker",
      "ArgoCD",
      "AWS",
      "Prometheus",
      "Grafana",
      "Loki",
      "Netdata",
      "AWS CDK",
      "Jenkins",
      "GitLab CI",
      "SonarQube",
      "Dependency Track",
      "OWASP Zap",
    ],
    responsibilities: [
      "Developed and maintained secure CI/CD pipelines for continuous integration and delivery. Integrated security testing tools for vulnerability scanning and code analysis.",
      "Managed and orchestrated containerized applications on Kubernetes clusters. Developed and maintained Helm charts for automated deployments.",
      "Automated and managed GitOps workflows for continuous deployment using ArgoCD.",
      "Designed and implemented secure infrastructure on AWS using Infrastructure as Code (IaC) with AWS CDK.",
      "Set up and managed monitoring systems for real-time visibility into infrastructure and performance.",
    ],
  },
  {
    title: "Full Stack Engineer",
    company: "FlexCar",
    location: "Remote",
    period: "Aug 2023 - April 2024",
    technologies: [
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "AWS",
      "GitHub Actions",
    ],
    responsibilities: [
      "Developed REST APIs and integrated application with Google Maps API.",
      "Contributed to the implementation of real-time data features.",
      "Designed and developed efficient UIs to enhance user experiences.",
      "Designed and optimized ETL processes for seamless data extraction and transformation.",
      "Optimized application performance by refactoring inefficient code.",
      "Employed GitHub Actions to create infrastructure in AWS, automate integrations and deployments.",
    ],
  },
  {
    title: "Assistant Lecturer on Lab",
    company: "Technical University of Crete",
    location: "Chania, GR",
    period: "Oct 2023 - March 2024",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Docker",
      "Keycloak",
      "Apache Kafka",
      "GCP",
      "Microservices",
    ],
    responsibilities: [
      "Developed and delivered engaging laboratory sessions focusing on web technologies, Docker, Keycloak, Apache Kafka, and microservices.",
      "Assisted students in integration and configuration of cloud services, providing insights into cloud computing and modern application development.",
      "Provided hands-on guidance and support to students, fostering a dynamic and interactive learning environment.",
    ],
  },
  {
    title: "Web Developer",
    company: "KEDIMA (TUC)",
    location: "Chania, GR",
    period: "Oct 2022 - Feb 2024",
    technologies: ["HTML5", "CSS", "JavaScript", "React.js", "Typo3", "Nginx"],
    responsibilities: [
      "Designed, developed, and maintained user-friendly website for Technical University of Crete.",
      "Implemented search functionality with keywords and category menu.",
    ],
    website: "https://www.tls.tuc.gr",
  },
  // {
  //   title: "Web Developer",
  //   company: "Hagiographies Dimas",
  //   location: "Grevena, GR",
  //   period: "May 2020 - May 2022",
  //   technologies: ["HTML5", "CSS", "Bootstrap", "JavaScript", "PHP", "MySQL"],
  //   responsibilities: [
  //     "Developed and maintained company's portfolio.",
  //     "Built CRUD functionality for photo management with MySQL database.",
  //     "Implemented authentication with cryptography and password validation.",
  //   ],
  // },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)] to-[var(--accent)] transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full gradient-bg transform md:-translate-x-1/2 -translate-x-1/2 border-4 border-[var(--background)]" />

              {/* Content */}
              <div
                className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
              >
                <div
                  className={`bg-[var(--card-bg)] p-6 rounded-xl card-hover ${index % 2 === 0 ? "md:ml-auto" : ""} max-w-xl`}
                >
                  <div
                    className={`flex items-center gap-2 mb-2 text-[var(--primary)] ${index % 2 === 0 ? "md:justify-end" : ""}`}
                  >
                    <Briefcase size={18} />
                    <span className="font-semibold">{exp.title}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{exp.company}</h3>

                  <div
                    className={`flex flex-wrap gap-4 text-sm text-[var(--secondary)] mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}
                  >
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {exp.period}
                    </span>
                  </div>

                  {/* Technologies */}
                  <div
                    className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}
                  >
                    {exp.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-[var(--primary)]/10 text-[var(--primary)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.technologies.length > 6 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)]">
                        +{exp.technologies.length - 6} more
                      </span>
                    )}
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-2 text-sm text-[var(--secondary)] text-left">
                    {exp.responsibilities.slice(0, 3).map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--primary)] flex-shrink-0">
                          •
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.website && (
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block mt-4 text-sm text-[var(--primary)] hover:underline ${index % 2 === 0 ? "md:float-right" : ""}`}
                    >
                      View Website →
                    </a>
                  )}
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
