"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Code, Cloud, Shield } from "lucide-react";

const highlights = [
  {
    icon: Shield,
    title: "DevSecOps",
    description:
      "Secure CI/CD pipelines with integrated security testing and vulnerability scanning",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    description:
      "AWS, GCP, and Azure infrastructure with Infrastructure as Code",
  },
  {
    icon: Server,
    title: "Kubernetes",
    description:
      "Container orchestration with Helm, ArgoCD, and service mesh technologies",
  },
  {
    icon: Code,
    title: "Full Stack",
    description:
      "Modern web development with React, Next.js, Node.js, and TypeScript",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
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
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Building Secure & Scalable Solutions
            </h3>
            <p className="text-[var(--secondary)] mb-4 leading-relaxed">
              I&apos;m a DevSecOps Engineer with a strong full stack development
              background, passionate about building secure, scalable
              infrastructure and modern web applications. Currently working at
              European Dynamics, I specialize in Kubernetes orchestration, CI/CD
              pipeline development, and cloud-native technologies.
            </p>
            <p className="text-[var(--secondary)] mb-4 leading-relaxed">
              With a Master&apos;s degree in Computer Science from the Technical
              University of Crete, I combine academic knowledge with practical
              experience. I&apos;ve published research on publish-subscribe
              systems and have hands-on experience with modern DevOps and cloud
              technologies.
            </p>
            <p className="text-[var(--secondary)] leading-relaxed">
              My hands-on experience as a full stack engineer gives me a deep
              understanding of the developer perspective - allowing me to design
              security and infrastructure solutions that fit naturally into
              development workflows rather than slowing them down. I&apos;m
              passionate about automating workflows, implementing security best
              practices, and creating efficient solutions that make a real
              impact. When I&apos;m not coding, I enjoy mentoring students and
              contributing to open-source projects.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">3+</div>
                <div className="text-sm text-[var(--secondary)]">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">2</div>
                <div className="text-sm text-[var(--secondary)]">
                  Publications
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">10+</div>
                <div className="text-sm text-[var(--secondary)]">
                  Technologies
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="p-6 rounded-xl bg-[var(--background)] card-hover"
              >
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-white" />
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-[var(--secondary)]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
