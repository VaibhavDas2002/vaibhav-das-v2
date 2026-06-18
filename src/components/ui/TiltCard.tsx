"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scaleOnHover?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scaleOnHover = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable tilt on touch devices to prevent sticky hover
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltMaxAngleX, -tiltMaxAngleX]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltMaxAngleY, tiltMaxAngleY]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || isTouchDevice) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseEnter() {
    if (isTouchDevice) return;
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  // On touch devices render as a plain div — no transform overhead
  if (isTouchDevice) {
    return (
      <div className={`relative ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovered ? scaleOnHover : 1,
      }}
      transition={{ duration: 0.3 }}
      className={`relative will-change-transform ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}
