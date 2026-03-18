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
        <div className="fixed inset-0 z-[9999] pointer-events-none font-sans overflow-hidden bg-transparent">
          {/* Rotated massive wrapper to create the true diagonal cut */}
          <div className="absolute top-1/2 left-1/2 w-[200vmax] h-[200vmax] -translate-x-1/2 -translate-y-1/2 -rotate-12 flex flex-col justify-center">
            {/* Top Panel - Slides Top-Right relative to the cut */}
            <motion.div
              initial={{ y: 0, x: 0 }}
              exit={{ y: "-100%", x: "0%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Smooth, snappy easing
              className="w-full relative flex flex-col items-center justify-end overflow-visible z-20 border-b-2 border-border/10 flex-1">
              {/* Background filler for the top panel */}
              <div className="absolute inset-0 bg-background z-0" />
              {/* Minimal Background Dot Texture */}
              <div
                className="absolute inset-0 z-0 opacity-[0.15] text-muted-foreground"
                style={{
                  backgroundImage:
                    "radial-gradient(currentColor 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  backgroundPosition: "bottom center",
                }}
              />
              {/* Center Glowing Spotlight */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[60px] md:blur-[80px] z-0" />

              <div className="pb-1 transform -translate-x-10 z-10 relative">
                <span className="inline-block text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground drop-shadow-sm">
                  Dhruva
                </span>
              </div>
            </motion.div>

            {/* Bottom Panel - Slides Bottom-Left relative to the cut */}
            <motion.div
              initial={{ y: 0, x: 0 }}
              exit={{ y: "100%", x: "0%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="w-full relative flex flex-col items-center justify-start overflow-visible z-20 border-t-2 border-border/10 flex-1">
              {/* Background filler for the bottom panel */}
              <div className="absolute inset-0 bg-background z-0" />
              {/* Minimal Background Dot Texture */}
              <div
                className="absolute inset-0 z-0 opacity-[0.15] text-muted-foreground"
                style={{
                  backgroundImage:
                    "radial-gradient(currentColor 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  backgroundPosition: "top center",
                }}
              />
              {/* Center Glowing Spotlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[60px] md:blur-[80px] z-0" />

              <div className="pt-1 transform translate-x-10 z-10 relative">
                <span className="inline-block text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground drop-shadow-sm">
                  Maheshwari
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
