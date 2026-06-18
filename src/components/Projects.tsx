"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, GitBranch, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { TiltCard } from "./ui/TiltCard";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: "Jai Bangla",
    description:
      "Full-stack web application for beneficiary registration, verification, and payment management under a state government scheme. Built dynamic dashboards with role-based access control and audit logging.",
    tech: ["PHP", "Laravel", "PostgreSQL"],
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Lakshmir Bhandar",
    description:
      "Government welfare portal for managing beneficiary records and disbursement of financial assistance. Implemented batch-processing workflows and PDF report generation.",
    tech: ["PHP", "Laravel", "PostgreSQL"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "West Bengal Tourism Portal",
    description:
      "Full-stack tourism information portal featuring destination listings, dynamic content management, and responsive UI.",
    tech: ["PHP", "Laravel", "MongoDB"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "BloodMates",
    description:
      "Cross-platform mobile app connecting blood donors with recipients using real-time Firebase database and geolocation. Integrated an AI chatbot to guide users.",
    tech: ["React Native", "Firebase", "AI Chatbot"],
    github: "https://github.com",
    gradient: "from-red-500 to-rose-500",
  },
  {
    title: "DAAV Invoice Management",
    description:
      "Full-stack web application for inventory tracking, invoice generation, and factory workflow management.",
    tech: ["PHP", "MySQL", "JavaScript"],
    github: "https://github.com",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Food Billing System",
    description:
      "Desktop GUI application for restaurant billing with data export, visual sales analytics, and receipt generation.",
    tech: ["Python", "Tkinter", "Pandas", "Matplotlib"],
    github: "https://github.com",
    gradient: "from-yellow-500 to-orange-500",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="projects" ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Projects
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4">
            Featured{" "}
            <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Real-world applications I&apos;ve built for government and enterprise clients.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <TiltCard tiltMaxAngleX={8} tiltMaxAngleY={8} scaleOnHover={1.02} className="h-full">
        <div className="glass rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Image placeholder */}
        <div
          className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 3 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white/20 select-none"
          >
            {project.title.charAt(0)}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4"
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <GitBranch size={20} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted mb-4 flex-1">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {project.github && (
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <GitBranch size={14} />
                  Code
                </a>
              </Button>
            )}
            {project.live && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  Live Demo
                  <ArrowUpRight size={14} />
                </a>
              </Button>
            )}
          </div>
        </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
