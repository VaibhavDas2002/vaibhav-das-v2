"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface Certification {
  title: string;
  issuer: string;
  description: string;
  date: string;
  gradient: string;
}

const certifications: Certification[] = [
  {
    title: "Machine Learning Specialization",
    issuer: "Duke University & University of Michigan (Coursera)",
    description:
      "Comprehensive specialization covering supervised learning, neural networks, and machine learning best practices.",
    date: "2024",
    gradient: "from-blue-500 to-violet-500",
  },
  {
    title: "Front-End Web Development",
    issuer: "IBM SkillsBuild",
    description:
      "Professional certification in modern front-end technologies including responsive design.",
    date: "2023",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Tech-Wizard Program",
    issuer: "MyCaptain Academic Internship",
    description:
      "Advanced technical program focused on emerging technologies and practical implementation skills.",
    date: "2024",
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="certifications" ref={ref} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Certifications
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4">
            Professional{" "}
            <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Certifications that validate my expertise in modern technologies.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative perspective-1000"
            >
              <div className="glass rounded-2xl p-[1px] overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="rounded-2xl bg-background p-6 h-full flex flex-col relative z-10">
                  {/* Certificate icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Award size={24} className="text-white" />
                  </div>

                  <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted font-mono mb-2">{cert.issuer}</p>
                  <p className="text-sm text-muted flex-1 mb-4">
                    {cert.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-primary">{cert.date}</span>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <ExternalLink size={14} />
                    </Button>
                  </div>

                  {/* Holographic shimmer effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
