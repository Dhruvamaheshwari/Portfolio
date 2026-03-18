/** @format */

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Wait slightly longer so the user reads it, then split the screen
    const timer = setTimeout(() => {
      setShow(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col font-sans">
          {/* Top Panel - Slides Up */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Smooth, snappy easing
            className="w-full h-1/2 bg-background flex flex-col items-center justify-end overflow-hidden z-10 border-b border-border/5">
            {/* The wrapper pulls it slightly down to tighten the spacing between the words */}
            <div className="translate-y-[15%]">
              <span className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground drop-shadow-sm">
                Dhruva
              </span>
            </div>
          </motion.div>

          {/* Bottom Panel - Slides Down */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-1/2 bg-background flex flex-col items-center justify-start overflow-hidden z-10 border-t border-border/10">
            {/* The wrapper pulls it slightly up to tighten the spacing between the words */}
            <div className="-translate-y-[15%]">
              <span className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground drop-shadow-sm">
                Maheshwari
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
