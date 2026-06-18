"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, Globe, GitBranch, Mail, MapPin, Phone, ArrowUpRight, X } from "lucide-react";
import { Button } from "./ui/button";
import { getSupabase } from "../lib/supabase";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Globe,
    href: "https://www.linkedin.com/in/vaibhav-das/",
    color: "hover:text-blue-500",
  },
  {
    name: "GitHub",
    icon: GitBranch,
    href: "https://github.com/VaibhavDas2002",
    color: "hover:text-foreground",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:vaibhav.das.360@gmail.com",
    color: "hover:text-primary",
  },
  {
    name: "X (Twitter)",
    icon: X,
    href: "https://twitter.com",
    color: "hover:text-blue-400",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from("contacts")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            createdAt: new Date().toISOString(),
          },
        ]);
        
      if (error) throw error;
      
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-20 sm:py-32 px-4 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent" />

      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Contact
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-4">
            Let&apos;s{" "}
            <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6 md:gap-8 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6 space-y-5">
              <h3 className="font-semibold text-lg">Get in Touch</h3>

              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "vaibhav.das.360@gmail.com",
                    href: "mailto:vaibhav.das.360@gmail.com",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "West Bengal, India",
                    href: "https://maps.google.com/?q=West+Bengal,+India",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "Available on request",
                    href: "#contact",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted">{item.label}</p>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-muted mb-3 uppercase tracking-wider">
                  Follow Me
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full glass flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110`}
                      title={social.name}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-muted">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50"
                  placeholder="Project Collaboration"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-muted">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted/50 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === "sending" || status === "sent"}
              >
                {status === "idle" && (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
                {status === "sending" && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                )}
                {status === "sent" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    ✓ Message Sent!
                  </motion.span>
                )}
                {status === "error" && "Error - Try Again"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
