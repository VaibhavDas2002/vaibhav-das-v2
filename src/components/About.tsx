"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, GraduationCap, Briefcase, Award } from "lucide-react";

const highlights = [
  {
    icon: Briefcase,
    label: "Current Position",
    value: "Software Developer at NIC",
    sub: "National Informatics Centre, West Bengal",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech in Computer Science & Engineering",
    sub: "BIET • CGPA: 8.56",
  },
  {
    icon: Award,
    label: "Experience",
    value: "3+ Years Teaching",
    sub: "Multiple Government Projects Delivered",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "West Bengal, India",
    sub: "Available for Remote & On-site",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4">
            Crafting{" "}
            <span className="text-gradient">Digital Excellence</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Passionate about building scalable e-governance solutions and modern web
            applications that make a real impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Profile Card */}
          <motion.div
            style={{ y, opacity }}
            className="lg:col-span-2"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 glow-border relative overflow-hidden group"
            >
              {/* Decorative gradient */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-700" />

              {/* Avatar */}
              <div className="relative z-10 flex flex-col items-center text-center mb-6">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] mb-4">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span className="text-4xl font-bold text-gradient">VD</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold">Vaibhav Das</h3>
                <p className="text-primary font-medium mt-1">
                  Software Developer & Full Stack Engineer
                </p>
              </div>

              {/* Highlights */}
              <div className="relative z-10 space-y-4">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="font-medium">{item.value}</p>
                      <p className="text-sm text-muted">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            style={{ y: y2 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Briefcase size={16} className="text-white" />
                </span>
                My Journey
              </h3>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative pl-8 border-l-2 border-primary/30"
                >
                  <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/30" />
                  <div className="glass rounded-xl p-5 hover:border-primary/20 transition-all duration-300">
                    <span className="text-xs text-primary font-mono">
                      Jul 2024 – Present
                    </span>
                    <h4 className="text-lg font-semibold mt-1">
                      Software Developer
                    </h4>
                    <p className="text-muted text-sm">
                      National Informatics Centre (NIC), West Bengal
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["E-Governance", "PostgreSQL", "Laravel", "Auth Systems"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary/90"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative pl-8 border-l-2 border-secondary/30"
                >
                  <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-secondary shadow-lg shadow-secondary/30" />
                  <div className="glass rounded-xl p-5 hover:border-secondary/20 transition-all duration-300">
                    <span className="text-xs text-secondary font-mono">
                      Internship
                    </span>
                    <h4 className="text-lg font-semibold mt-1">
                      Front-End Web Development Intern
                    </h4>
                    <p className="text-muted text-sm">IBM SkillsBuild</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["Responsive Design", "React", "Full Stack", "Modern Web"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full bg-secondary/10 text-secondary/90"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative pl-8 border-l-2 border-accent/30"
                >
                  <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-accent shadow-lg shadow-accent/30" />
                  <div className="glass rounded-xl p-5 hover:border-accent/20 transition-all duration-300">
                    <span className="text-xs text-accent font-mono">
                      2020 – 2024
                    </span>
                    <h4 className="text-lg font-semibold mt-1">
                      B.Tech in Computer Science & Engineering
                    </h4>
                    <p className="text-muted text-sm">
                      Birbhum Institute of Engineering and Technology
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent/90">
                        CGPA: 8.56
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent/90">
                        Computer Science
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
