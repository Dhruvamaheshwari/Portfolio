"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface WakaData {
  status: "online" | "offline";
  editor: string;
  lastUpdate: string;
  timeToday: string;
  isMock?: boolean;
}

export function WorkStatus() {
  const [data, setData] = useState<WakaData | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/wakatime");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("WakaTime fetch error", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return null;

  const isOnline = data?.status === "online";

  return (
    <motion.div
      className="relative flex items-center justify-center"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        layout
        className={cn(
          "flex items-center overflow-hidden rounded-full border bg-background/80 backdrop-blur-md shadow-sm transition-colors",
          isHovered ? "pl-2 pr-4 py-1.5 gap-3" : "p-2"
        )}
        initial={{ width: "auto" }}
        animate={{
          width: "auto",
        }}
      >
        {/* Status Dot */}
        <div className="relative flex h-3 w-3 items-center justify-center">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              isOnline ? "bg-green-500" : "bg-zinc-500"
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-2.5 w-2.5 rounded-full",
              isOnline ? "bg-green-500" : "bg-zinc-500"
            )}
          />
        </div>

        {/* Expanded Info */}
        <AnimatePresence mode="popLayout">
          {isHovered && data && (
            <motion.div
              initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="flex flex-col whitespace-nowrap text-xs leading-tight"
            >
              <span className="font-medium text-foreground">
                {isOnline ? "Coding in" : "Offline in"}{" "}
                <span className="text-primary">{data.editor}</span>
              </span>
              <span className="text-[10px] text-muted-foreground">
                Today worked {data.timeToday}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
