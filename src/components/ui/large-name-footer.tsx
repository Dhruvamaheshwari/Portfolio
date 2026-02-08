/** @format */

import { cn } from "@/lib/utils";

export function LargeNameFooter({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full",
        "flex justify-center py-18 overflow-hidden pointer-events-none select-none",
        className,
      )}>
      <h1
        className="text-[9vw] font-black tracking-tighter text-nowrap leading-none text-center"
        style={{
          maskImage: "linear-gradient(to bottom, black 50%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 50%, transparent 90%)",
          color: "var(--foreground)",
          opacity: 0.2,
          transform: "scaleY(1.4)",
        }}>
        DHRUVA
      </h1>
    </div>
  );
}
