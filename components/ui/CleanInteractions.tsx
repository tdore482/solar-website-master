"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px bg-gray-300 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// Simple hover effect component
export function HoverLift({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// Fade in on scroll component
export function FadeInOnScroll({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Simple counter component
export function Counter({ 
  value, 
  suffix = "", 
  className = "" 
}: { 
  value: number; 
  suffix?: string; 
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={className}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}

// Simple gradient text
export function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}