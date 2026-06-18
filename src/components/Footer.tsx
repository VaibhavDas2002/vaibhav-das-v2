"use client";

import { GitBranch, Globe, Mail, Heart, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <button
              onClick={() => scrollTo("#hero")}
              className="text-xl font-bold tracking-tight"
            >
              <span className="text-gradient">V</span>
              <span className="text-foreground/80">D</span>
              <span className="text-xs ml-1 text-muted">.dev</span>
            </button>
            <p className="text-sm text-muted mt-2">
              Software Developer & Full Stack Engineer
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {["About", "Skills", "Experience", "Projects", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(`#${item.toLowerCase()}`)}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {item}
                </button>
              )
            )}
          </div>

          {/* Social */}
          <div className="flex gap-4">
            {[
              { icon: GitBranch, href: "https://github.com/vaibhavdas-wb", label: "GitHub" },
              { icon: Globe, href: "https://linkedin.com/in/vaibhav-das-wb", label: "LinkedIn" },
              { icon: Twitter, href: "https://twitter.com", label: "X (Twitter)" },
              { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { icon: Mail, href: "mailto:vaibhavdas.dev@gmail.com", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all duration-300"
                title={social.label}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-muted flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} Vaibhav Das. Built with
            <Heart size={12} className="text-primary fill-primary" />
            using Next.js & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
