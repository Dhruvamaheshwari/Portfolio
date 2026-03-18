/** @format */

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

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
          {/* Normal vertical wrapper */}
          <div className="absolute inset-0 flex flex-col justify-center">
            {/* Top Panel - Slides Straight Up */}
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              className="w-full relative flex flex-col items-center justify-end overflow-visible z-20 border-b border-border/10 flex-1">
              {/* Background filler for the top panel */}
              <div className="absolute inset-0 bg-background z-0" />
              {/* Low Opacity Nature Image - Top Half */}
              <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.15] dark:opacity-[0.07] pointer-events-none">
                <div className="absolute inset-x-0 top-0 h-[100vh]">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                    alt="Nature background top"
                    fill
                    priority
                    unoptimized
                    className="object-cover object-center"
                  />
                </div>
              </div>
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

              <div className="pb-1 z-10 relative">
                <span className="inline-block text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter text-foreground drop-shadow-sm">
                  Dhruva
                </span>
              </div>
            </motion.div>

            {/* Bottom Panel - Slides Straight Down */}
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              className="w-full relative flex flex-col items-center justify-start overflow-visible z-20 border-t border-border/10 flex-1">
              {/* Background filler for the bottom panel */}
              <div className="absolute inset-0 bg-background z-0" />
              {/* Low Opacity Nature Image - Bottom Half */}
              <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.15] dark:opacity-[0.07] pointer-events-none">
                <div className="absolute inset-x-0 bottom-0 h-[100vh]">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                    alt="Nature background bottom"
                    fill
                    priority
                    unoptimized
                    className="object-cover object-center"
                  />
                </div>
              </div>
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

              <div className="pt-2 z-10 relative">
                <span className="inline-block text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter text-foreground drop-shadow-sm">
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
