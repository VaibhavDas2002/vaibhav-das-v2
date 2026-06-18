"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Users, Briefcase, Building2, Award, GraduationCap } from "lucide-react";

interface Achievement {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  label: string;
  suffix?: string;
}

const achievements: Achievement[] = [
  {
    icon: Briefcase,
    value: "3",
    label: "Years as Lecturer at Jatya Yuva Computer Siksha Mission",
    suffix: "Years",
  },
  {
    icon: Users,
    value: "1",
    label: "Student Academic Mentor in Computer Science Dept",
  },
  {
    icon: Award,
    value: "1",
    label: "General Secretary of College Student Community",
  },
  {
    icon: GraduationCap,
    value: "8.56",
    label: "B.Tech CGPA",
    suffix: "CGPA",
  },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: string;
  suffix?: string;
  inView: boolean;
}) {
  return (
    <span className="text-4xl sm:text-5xl font-bold text-gradient">
      {value}
      {suffix && inView && (
        <span className="text-lg text-muted ml-1 font-normal">{suffix}</span>
      )}
    </span>
  );
}

function AchievementCard({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-xl p-6 text-center hover:border-primary/20 transition-all duration-300 group"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <achievement.icon size={24} className="text-primary" />
      </div>
      <AnimatedCounter
        value={achievement.value}
        suffix={achievement.suffix}
        inView={isInView}
      />
      <p className="text-sm text-muted mt-2">{achievement.label}</p>
    </motion.div>
  );
}

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="achievements" ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Achievements
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4">
            Impact by{" "}
            <span className="text-gradient">Numbers</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A track record of delivering impactful solutions and leading technical initiatives.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.label}
              achievement={achievement}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
