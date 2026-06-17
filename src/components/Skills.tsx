"use client";

import React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2,
  Database,
  Layout,
  Terminal,
  Globe,
  Server,
  Palette,
  Cpu,
} from "lucide-react";

interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Layout,
    color: "from-orange-500 to-amber-500",
    skills: [
      { name: "HTML5", icon: "⚡", level: 95 },
      { name: "CSS3", icon: "🎨", level: 90 },
      { name: "Bootstrap", icon: "📱", level: 85 },
      { name: "Tailwind CSS", icon: "🌊", level: 90 },
      { name: "ReactJS", icon: "⚛️", level: 85 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "PHP", icon: "🐘", level: 90 },
      { name: "Laravel", icon: "🔥", level: 92 },
      { name: "Django", icon: "🎯", level: 75 },
      { name: "Flask", icon: "🧪", level: 70 },
      { name: "Node.js", icon: "💚", level: 80 },
      { name: "Express.js", icon: "🚀", level: 78 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "PostgreSQL", icon: "🐘", level: 95 },
      { name: "MySQL", icon: "🐬", level: 88 },
      { name: "MongoDB", icon: "🍃", level: 75 },
      { name: "Oracle", icon: "🏛️", level: 70 },
      { name: "SQL Server", icon: "🗄️", level: 72 },
    ],
  },
  {
    title: "Tools",
    icon: Terminal,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Git", icon: "📦", level: 90 },
      { name: "GitHub", icon: "🐙", level: 88 },
      { name: "GitLab", icon: "🦊", level: 80 },
      { name: "Docker", icon: "🐳", level: 75 },
      { name: "VS Code", icon: "💻", level: 95 },
    ],
  },
];

const SkillCard = ({
  skill,
  index,
  color,
}: {
  skill: Skill;
  index: number;
  color: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
    >
      <div className="glass rounded-xl p-4 hover:border-primary/20 transition-all duration-300 cursor-default">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-xs font-mono text-muted">{skill.level}%</span>
        </div>
        <p className="text-sm font-medium">{skill.name}</p>
        <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${color} relative`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Skills & Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Technologies I work with daily to build robust and scalable applications.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                >
                  <category.icon size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {category.skills.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={i}
                    color={category.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
