"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Containerization & Orchestration",
    skills: [
      { name: "Kubernetes", level: 95 },
      { name: "Helm Charts", level: 90 },
      { name: "Docker", level: 90 },
      { name: "Istio Service Mesh", level: 80 },
      { name: "Amazon ECS", level: 80 },
    ],
  },
  {
    title: "Cloud Providers",
    skills: [
      { name: "AWS", level: 90 },
      { name: "Google Cloud Platform", level: 60 },
      { name: "Microsoft Azure", level: 50 },
    ],
  },
  {
    title: "CI/CD & Infrastructure",
    skills: [
      { name: "Jenkins", level: 90 },
      { name: "GitHub Actions", level: 75 },
      { name: "GitLab CI", level: 85 },
      { name: "ArgoCD", level: 75 },
      { name: "Terraform", level: 60 },
      { name: "AWS CDK", level: 85 },
    ],
  },
  {
    title: "Monitoring & Logging",
    skills: [
      { name: "Grafana", level: 90 },
      { name: "Prometheus", level: 90 },
      { name: "Loki", level: 85 },
      { name: "Netdata", level: 80 },
      { name: "CloudWatch", level: 80 },
    ],
  },
  {
    title: "Security & Code Quality",
    skills: [
      { name: "SonarQube", level: 85 },
      { name: "Dependency Track", level: 85 },
      { name: "OWASP Zap", level: 60 },
    ],
  },
  {
    title: "Programming & Frameworks",
    skills: [
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 60 },
      { name: "Node.js", level: 90 },
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Bash", level: 85 },
      { name: "PHP", level: 50 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 80 },
      { name: "MySQL", level: 80 },
      { name: "Amazon Timestream", level: 60 },
    ],
  },
  {
    title: "Pub/Sub Systems",
    skills: [
      { name: "Apache Kafka", level: 85 },
      { name: "RabbitMQ", level: 80 },
      { name: "Orion/Scorpio/Stellio", level: 80 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
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
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-[var(--background)] p-6 rounded-xl card-hover"
            >
              <h3 className="text-lg font-semibold mb-4 gradient-text">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span className="text-[var(--secondary)]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.level}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: "easeOut",
                        }}
                        className="h-full gradient-bg rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-semibold mb-6">Languages</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-full bg-[var(--background)] card-hover">
              <span className="font-medium">Greek</span>
              <span className="text-[var(--secondary)] ml-2">Native</span>
            </div>
            <div className="px-6 py-3 rounded-full bg-[var(--background)] card-hover">
              <span className="font-medium">English</span>
              <span className="text-[var(--secondary)] ml-2">
                C2 Proficient
              </span>
            </div>
            <div className="px-6 py-3 rounded-full bg-[var(--background)] card-hover">
              <span className="font-medium">French</span>
              <span className="text-[var(--secondary)] ml-2">B1</span>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
