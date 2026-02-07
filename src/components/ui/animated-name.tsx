/** @format */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAMES = [
  { text: "Dhruva", lang: "English" },
  { text: "杜鲁瓦", lang: "Chinese" },
  { text: "ध्रुवा", lang: "Hindi" },
  { text: "Дхрува", lang: "Russian" },
  { text: "드루바", lang: "Korean" },
];

interface AnimatedNameProps {
  className?: string;
}

export function AnimatedName({ className }: AnimatedNameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlowing, setIsGlowing] = useState(true);

  // Rotate names every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NAMES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Blinking glow effect
  useEffect(() => {
    const glowInterval = setInterval(() => {
      setIsGlowing((prev) => !prev);
    }, 800);
    return () => clearInterval(glowInterval);
  }, []);

  return (
    <span className={className}>
      Hi, I&apos;m{" "}
      <span className="relative inline-block">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block"
            style={{
              textShadow:
                isGlowing ?
                  "0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary) / 0.4)"
                : "0 0 10px hsl(var(--primary) / 0.3), 0 0 20px hsl(var(--primary) / 0.2)",
              transition: "text-shadow 0.4s ease-in-out",
            }}>
            <motion.span
              animate={{
                color:
                  isGlowing ? "hsl(var(--primary))" : "hsl(var(--foreground))",
              }}
              transition={{ duration: 0.4 }}>
              {NAMES[currentIndex].text}
            </motion.span>
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
