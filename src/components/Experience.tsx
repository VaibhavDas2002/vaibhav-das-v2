"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { TiltCard } from "./ui/TiltCard";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  type: "work" | "education";
}

const experiences: Experience[] = [
  {
    title: "Software Developer",
    company: "National Informatics Centre (NIC), West Bengal | Kolkata, India",
    period: "Jul 2024 – Present",
    description:
      "Developed and maintained e-Governance software solutions serving thousands of citizens for government services.",
    highlights: [
      "PostgreSQL & MySQL",
      "Secure Authentication",
      "Data Privacy",
      "End-to-End Testing",
      "Performance Optimization",
    ],
    type: "work",
  },
  {
    title: "Front-End Web Development Intern",
    company: "IBM SkillsBuild and CSRBOX | Remote",
    period: "Jun 2023 – Jul 2023",
    description:
      "Completed an academic internship focused on modern front-end web development practices and frameworks.",
    highlights: [
      "Full-stack Web Project",
      "Responsive Design",
      "HTML/CSS/JS",
    ],
    type: "work",
  },
  {
    title: "Bachelor of Technology – Computer Science and Engineering",
    company: "Birbhum Institute of Engineering and Technology, M.A.K.A.U.T.",
    period: "2020 – 2024",
    description: "Graduated with a strong foundation in computer science principles and software engineering.",
    highlights: [
      "CGPA: 8.56 / 10",
      "Computer Science",
      "Engineering",
    ],
    type: "education",
  },
  {
    title: "Higher Secondary (Science)",
    company: "U.P. Public School, C.B.S.E.",
    period: "2018 – 2020",
    description: "Completed higher secondary education with a focus on science and mathematics.",
    highlights: [
      "CGPA: 6.2 / 10",
      "Science",
      "Mathematics",
    ],
    type: "education",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section id="experience" ref={ref} className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Experience
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4">
            Professional{" "}
            <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            My journey through education and professional experience.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-[20px] md:left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-primary via-secondary to-primary/20 md:-translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                <TiltCard 
                  className={`glass rounded-xl p-6 hover:border-primary/20 transition-all duration-300 ${
                    index % 2 === 0 ? "md:ml-auto" : ""
                  }`}
                >
                  <span className="text-xs font-mono text-primary flex items-center gap-2 mb-2">
                    <Calendar size={12} />
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <p className="text-muted text-sm mb-3">{exp.company}</p>
                  <p className="text-sm text-muted/80 mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className={`text-xs px-2.5 py-1 rounded-full ${
                          exp.type === "work"
                            ? "bg-primary/10 text-primary/90"
                            : "bg-secondary/10 text-secondary/90"
                        }`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-[20px] md:left-1/2 top-8 -translate-x-1/2 z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    exp.type === "work"
                      ? "bg-gradient-to-br from-primary to-orange-600"
                      : "bg-gradient-to-br from-secondary to-purple-600"
                  } shadow-lg ${
                    exp.type === "work"
                      ? "shadow-primary/30"
                      : "shadow-secondary/30"
                  }`}
                >
                  {exp.type === "work" ? (
                    <Briefcase size={16} className="text-white" />
                  ) : (
                    <GraduationCap size={16} className="text-white" />
                  )}
                </div>
              </div>

              {/* Spacer for opposite side */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
