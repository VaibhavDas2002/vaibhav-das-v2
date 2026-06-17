"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, GitBranch, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

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
      "Government Beneficiary Management System built with Laravel and PostgreSQL for efficient welfare program administration.",
    tech: ["Laravel", "PostgreSQL", "PHP"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Lakshmir Bhandar",
    description:
      "Welfare Management Portal designed for streamlined distribution of government benefits to eligible citizens.",
    tech: ["Laravel", "PostgreSQL", "PHP"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "West Bengal Tourism Portal",
    description:
      "Comprehensive tourism information system featuring MongoDB-powered content management and Laravel backend.",
    tech: ["Laravel", "MongoDB", "PHP"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "BloodMates",
    description:
      "Cross-platform React Native application connecting blood donors with recipients in real-time using Firebase.",
    tech: ["React Native", "Firebase", "JavaScript"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-red-500 to-rose-500",
  },
  {
    title: "AI Chatbot & DAAV Invoice Management",
    description:
      "Intelligent chatbot system integrated with invoice management capabilities for automated business workflows.",
    tech: ["PHP", "MySQL", "AI/ML"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Food Billing System",
    description:
      "Desktop application built with Python Tkinter and Pandas for restaurant billing and inventory management.",
    tech: ["Python", "Tkinter", "Pandas"],
    github: "https://github.com",
    live: "https://example.com",
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
    <section id="projects" ref={ref} className="relative py-32 px-6 overflow-hidden">
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

        <motion.div style={{ y }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      className="group relative perspective-1000"
    >
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: isHovered ? -2 : 0,
          rotateY: isHovered ? 2 : 0,
          translateZ: isHovered ? 20 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="glass rounded-2xl overflow-hidden h-full flex flex-col"
      >
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
      </motion.div>
    </motion.div>
  );
}
