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
import {
  SiPython,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiPhp,
  SiHtml5,
  SiBootstrap,
  SiTailwindcss,
  SiReact,
  SiMui,
  SiDjango,
  SiFlask,
  SiLaravel,
  SiLivewire,
  SiNodedotjs,
  SiExpress,
  SiStrapi,
  SiHasura,
  SiGraphql,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGitlab,
  SiAnaconda,
  SiPycharm,
  SiAndroidstudio,
  SiFigma,
  SiCanva
} from "react-icons/si";
import { TiltCard } from "./ui/TiltCard";

interface Skill {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
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
    title: "Languages",
    icon: Code2,
    color: "from-red-500 to-rose-500",
    skills: [
      { name: "Python", icon: SiPython, level: 90 },
      { name: "C", icon: SiC, level: 85 },
      { name: "C++", icon: SiCplusplus, level: 85 },
      { name: "JavaScript", icon: SiJavascript, level: 92 },
      { name: "PHP", icon: SiPhp, level: 95 },
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    color: "from-orange-500 to-amber-500",
    skills: [
      { name: "HTML5", icon: SiHtml5, level: 95 },
      { name: "CSS3", icon: Layout, level: 90 },
      { name: "Bootstrap", icon: SiBootstrap, level: 85 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 90 },
      { name: "ReactJS", icon: SiReact, level: 85 },
      { name: "Material UI", icon: SiMui, level: 80 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Django", icon: SiDjango, level: 75 },
      { name: "Flask", icon: SiFlask, level: 70 },
      { name: "Laravel", icon: SiLaravel, level: 92 },
      { name: "Livewire", icon: SiLivewire, level: 85 },
      { name: "Node.js", icon: SiNodedotjs, level: 80 },
      { name: "Express.js", icon: SiExpress, level: 80 },
      { name: "Strapi", icon: SiStrapi, level: 70 },
      { name: "Hasura", icon: SiHasura, level: 75 },
      { name: "GraphQL", icon: SiGraphql, level: 75 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "MySQL", icon: SiMysql, level: 88 },
      { name: "PostgreSQL", icon: SiPostgresql, level: 95 },
      { name: "Oracle", icon: Database, level: 70 },
      { name: "Microsoft SQL Server", icon: Database, level: 70 },
      { name: "MongoDB", icon: SiMongodb, level: 75 },
      { name: "Firebase", icon: SiFirebase, level: 80 },
    ],
  },
  {
    title: "Tools",
    icon: Terminal,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Git", icon: SiGit, level: 90 },
      { name: "GitHub", icon: SiGithub, level: 88 },
      { name: "GitLab", icon: SiGitlab, level: 80 },
      { name: "Anaconda", icon: SiAnaconda, level: 80 },
      { name: "PyCharm", icon: SiPycharm, level: 95 },
      { name: "Android Studio", icon: SiAndroidstudio, level: 75 },
      { name: "VS Code", icon: Code2, level: 95 },
    ],
  },
  {
    title: "Design",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Figma", icon: SiFigma, level: 85 },
      { name: "Adobe XD", icon: Palette, level: 80 },
      { name: "Photoshop", icon: Palette, level: 75 },
      { name: "Canva", icon: SiCanva, level: 80 },
      { name: "Microsoft Office Suite", icon: Cpu, level: 90 },
    ],
  },
  {
    title: "Operating Systems",
    icon: Cpu,
    color: "from-slate-500 to-gray-500",
    skills: [
      { name: "Windows", icon: Cpu, level: 85 },
      { name: "Ubuntu", icon: Terminal, level: 80 },
      { name: "Fedora", icon: Terminal, level: 75 },
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
      className="group relative h-full"
    >
      <TiltCard tiltMaxAngleX={15} tiltMaxAngleY={15} scaleOnHover={1} className="h-full">
        <div className="glass rounded-xl p-4 hover:border-primary/20 transition-all duration-300 cursor-default h-full flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <skill.icon size={20} className="text-white/80" />
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
      </TiltCard>
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
