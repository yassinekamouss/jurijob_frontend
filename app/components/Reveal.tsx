"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number; // how much of the element must be visible to trigger
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  amount = 0.15,
  direction = "up",
  once = true,
}: RevealProps) {
  const dist = 24;
  const offset = {
    up: { y: dist },
    down: { y: -dist },
    left: { x: dist },
    right: { x: -dist },
  } as const;

  const variants: Variants = {
    hidden: { opacity: 0, ...(offset[direction] || {}) },
    show: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
