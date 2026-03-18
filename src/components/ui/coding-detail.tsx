/** @format */

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";

interface WakaData {
  status: "online" | "offline";
  editor: string;
  project: string;
  lastUpdate: string;
  timeToday: string;
}

export function CodingDetail() {
  const [data, setData] = useState<WakaData | null>(null);

  useEffect(() => {
    fetch("/api/wakatime")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((e) => console.error("WakaTime fetch error", e));
  }, []);

  if (!data) return null;

  return (
    <BlurFade delay={0.2}>
      <div className="w-full mt-8 p-4 rounded-2xl border bg-background/50 backdrop-blur-sm border-border/50 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-all hover:bg-background/80">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">
              Current Project
            </span>
            {data.status === "online" && (
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            )}
          </div>
          <span className="text-sm font-semibold text-foreground">
            {data.project !== "n/a" ? data.project : "No active public project"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">
            Development Environment
          </span>
          <span className="text-sm font-semibold text-foreground">
            {data.editor}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">
            Session Time
          </span>
          <span className="text-sm font-semibold text-foreground">
            {data.timeToday} total today
          </span>
        </div>
      </div>
    </BlurFade>
  );
}
