/** @format */

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface WakaData {
  status: "online" | "offline";
  editor: string;
  project: string;
  lastUpdate: string;
  timeToday: string;
}

export function TopStatus() {
  const [data, setData] = useState<WakaData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/wakatime");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("WakaTime fetch error", e);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  const isOnline = data.status === "online";

  return (
    <div className="flex items-center gap-4 text-[10px] sm:text-xs font-medium text-muted-foreground/80 lowercase tracking-tight">
      <div className="flex items-center gap-1.5">
        <div className="relative flex h-2 w-2 items-center justify-center">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
              isOnline ? "bg-green-500" : "bg-zinc-500",
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              isOnline ? "bg-green-500" : "bg-zinc-500",
            )}
          />
        </div>
        <span>{isOnline ? "currently coding" : "currently offline"}</span>
      </div>

      <div className="hidden sm:flex items-center gap-1.5">
        <span className="opacity-40">•</span>
        <span>
          {isOnline ?
            `active on ${data.editor}`
          : data.lastUpdate ?
            `last active ${new Date(data.lastUpdate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
          : "not active today"}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="opacity-40">•</span>
        <span>{data.timeToday} today</span>
      </div>
    </div>
  );
}
