"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Typewriter from "./Typewriter";
import { Button } from "./ui/button";
import { Download, ArrowRight, Mail } from "lucide-react";
import dynamic from "next/dynamic";

const Globe3D = dynamic(() => import("./Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse" />
    </div>
  ),
});

const typewriterWords = [
  "Laravel Developer",
  "Full Stack Engineer",
  "Software Developer at NIC",
  "PostgreSQL Expert",
  "Problem Solver",
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />

      {/* 3D Globe - reduced opacity on mobile */}
      <div className="absolute inset-0 z-0 opacity-40 sm:opacity-100">
        <Globe3D />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted font-medium">
            Available for opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 sm:mb-6"
        >
          <span className="text-foreground">Hi, I&apos;m </span>
          <br className="sm:hidden" />
          <span className="text-gradient">Vaibhav Das</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-2xl md:text-3xl text-muted font-light mb-3 sm:mb-4"
        >
          Software Developer &amp; Full Stack Engineer
        </motion.p>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-xl text-primary font-mono mb-8 sm:mb-12 h-6 sm:h-8"
        >
          <Typewriter words={typewriterWords} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollTo("#projects")}
            className="w-full sm:w-auto"
          >
            View Projects
            <ArrowRight size={16} />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollTo("#contact")}
            className="w-full sm:w-auto"
          >
            <Mail size={16} />
            Contact Me
          </Button>
          <a
            href="/Vaibhav_Das_CV.pdf"
            download="Vaibhav_Das_CV.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full text-sm font-medium border border-white/10 text-muted hover:text-foreground hover:border-white/20 transition-all duration-300"
          >
            <Download size={16} />
            Download CV
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted hidden sm:block">Scroll to explore</span>
            <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
