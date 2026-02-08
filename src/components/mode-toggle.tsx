/** @format */
"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";

// Ripple component using motion
const Ripple = ({
  x,
  y,
  onComplete,
  onThemeSwitch,
}: {
  x: number;
  y: number;
  onComplete: () => void;
  onThemeSwitch: () => void;
}) => {
  useEffect(() => {
    // Sync theme switch with the animation's peak (approx 400ms)
    const timer = setTimeout(() => {
      onThemeSwitch();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
      {/* Background Blur Wipe - Blue Tint */}
      <motion.div
        initial={{
          clipPath: `circle(0px at ${x}px ${y}px)`,
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(59, 130, 246, 0.0)",
        }}
        animate={{
          clipPath: `circle(300vmax at ${x}px ${y}px)`,
          // Animate blur and color: Start -> Peak (Hide switch) -> End (Clear)
          backdropFilter: ["blur(0px)", "blur(12px)", "blur(0px)"],
          backgroundColor: [
            "rgba(59, 130, 246, 0.0)",
            "rgba(59, 130, 246, 0.15)", // Peak Blue Tint
            "rgba(59, 130, 246, 0.0)",
          ],
        }}
        transition={{
          clipPath: { duration: 1.5, ease: "circOut" },
          backdropFilter: { duration: 1.5, times: [0, 0.3, 1] },
          backgroundColor: { duration: 1.5, times: [0, 0.3, 1] },
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
        }}
        onAnimationComplete={onComplete}
      />

      {/* Expanding Blue Rings */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          initial={{
            width: 0,
            height: 0,
            opacity: 0.8,
            borderWidth: "2px",
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            width: "250vmax",
            height: "250vmax",
            opacity: 0,
            borderWidth: "0px",
          }}
          transition={{
            duration: 1.2,
            ease: "circOut",
            delay: i * 0.15,
          }}
          style={{
            position: "absolute",
            top: y,
            left: x,
            borderRadius: "50%",
            borderStyle: "solid",
            borderColor: "#3b82f6", // Electric Blue
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)", // Blue Glow
            zIndex: 20,
          }}
        />
      ))}
    </div>
  );
};

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const button = buttonRef.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (button) {
      const rect = button.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    setRipple({ x, y });
  };

  return (
    <>
      <Button
        ref={buttonRef}
        type="button"
        variant="link"
        size="icon"
        className={cn("relative", className)}
        onClick={toggleTheme}>
        <SunIcon className="h-full w-full dark:hidden" />
        <MoonIcon className="hidden h-full w-full dark:block" />
      </Button>

      {mounted &&
        ripple &&
        createPortal(
          <Ripple
            x={ripple.x}
            y={ripple.y}
            onThemeSwitch={() => setTheme(theme === "dark" ? "light" : "dark")}
            onComplete={() => setRipple(null)}
          />,
          document.body,
        )}
    </>
  );
}
