/** @format */
"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";

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
    const timer = setTimeout(() => {
      onThemeSwitch();
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
      <motion.div
        initial={{
          width: 0,
          height: 0,
          opacity: 0,
        }}
        animate={{
          width: "250vmax",
          height: "250vmax",
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.1, 0.8, 1],
        }}
        style={{
          position: "absolute",
          top: y,
          left: x,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          backdropFilter: "blur(12px)",
          maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle, black 30%, transparent 70%)",
          zIndex: 10,
        }}
        onAnimationComplete={onComplete}
      />
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
