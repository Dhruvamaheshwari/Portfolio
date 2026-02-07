/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useRef } from "react";

// Create ripple wave rings
function createRippleRings(x: number, y: number, isDarkToLight: boolean) {
  const container = document.createElement("div");
  container.className = "ripple-container";

  // Create multiple rings with staggered delays for wave effect
  const ringCount = 5;
  const delayStep = 120; // ms between each ring

  for (let i = 0; i < ringCount; i++) {
    const ring = document.createElement("div");
    ring.className = `ripple-ring ${isDarkToLight ? "dark-to-light" : "light-to-dark"}`;
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.animationDelay = `${i * delayStep}ms`;
    container.appendChild(ring);
  }

  document.body.appendChild(container);

  // Remove container after animation completes
  setTimeout(() => {
    container.remove();
  }, 2500);
}

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    const isDarkToLight = theme === "dark";

    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // Get button position for the ripple origin
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      document.documentElement.style.setProperty("--x", `${x}px`);
      document.documentElement.style.setProperty("--y", `${y}px`);

      // Create wave ripple rings
      createRippleRings(x, y, isDarkToLight);
    }

    document.startViewTransition(() => {
      setTheme(newTheme);
    });
  };

  return (
    <Button
      ref={buttonRef}
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      onClick={toggleTheme}>
      <SunIcon className="h-full w-full" />
      <MoonIcon className="hidden h-full w-full" />
    </Button>
  );
}
