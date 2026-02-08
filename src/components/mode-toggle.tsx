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
}: {
  x: number;
  y: number;
  onComplete: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
      {/* Background Blur Wipe */}
      <motion.div
        initial={{ clipPath: `circle(0px at ${x}px ${y}px)` }}
        animate={{ clipPath: `circle(300vmax at ${x}px ${y}px)` }}
        transition={{ duration: 1, ease: "circOut" }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          backdropFilter: "blur(6px)",
        }}
      />

      {/* Expanding Rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{
            width: 0,
            height: 0,
            opacity: 0.5,
            borderWidth: "5px",
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            width: "200vmax",
            height: "200vmax",
            opacity: 0,
            borderWidth: "1px",
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: i * 0.1,
          }}
          style={{
            position: "absolute",
            top: y,
            left: x,
            borderRadius: "50%",
            borderStyle: "solid",
            borderColor: "var(--foreground)",
            zIndex: 20,
          }}
          onAnimationComplete={() => {
            if (i === 3) onComplete();
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
    // 🔑 Get position for ripple
    const button = buttonRef.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (button) {
      const rect = button.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    setRipple({ x, y });
    setTheme(theme === "dark" ? "light" : "dark");
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
            onComplete={() => setRipple(null)}
          />,
          document.body,
        )}
    </>
  );
}
