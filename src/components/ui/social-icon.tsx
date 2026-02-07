/** @format */

"use client";

import React from "react";

interface SocialIconProps {
  icon: React.ReactNode;
  username: string;
  link: string;
}

export function SocialIcon({ icon, username, link }: SocialIconProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-block">
      <div className="relative flex items-center h-10 rounded-lg cursor-pointer bg-background border border-border overflow-hidden transition-all duration-300 ease-out w-12 group-hover:w-36 active:scale-[0.98]">
        {/* Hover background */}
        <div className="absolute inset-0 bg-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Icon container */}
        <div className="relative z-10 flex items-center justify-center shrink-0 w-12 h-full">
          <div className="flex items-center justify-center text-muted-foreground transition-transform duration-200 group-hover:scale-110">
            {icon}
          </div>
        </div>

        {/* Username text */}
        <span className="relative z-10 text-sm font-medium text-foreground whitespace-nowrap pr-3 -ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 delay-75">
          {username}
        </span>
      </div>
    </a>
  );
}
