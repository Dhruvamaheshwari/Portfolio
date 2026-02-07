"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SocialIconProps {
    icon: React.ReactNode;
    username: string;
    link: string;
}

export function SocialIcon({ icon, username, link }: SocialIconProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="flex items-center justify-center px-3 py-2 rounded-lg cursor-pointer h-10 bg-background border border-border/40 hover:bg-accent/10 shadow-xs"
                initial={{ width: "3rem" }}
                animate={{ width: isHovered ? "auto" : "3rem" }}
                transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
                style={{ overflow: "hidden", whiteSpace: "nowrap" }}
            >
                <div className="flex items-center justify-center shrink-0 w-6 h-6 text-muted-foreground">
                    {icon}
                </div>

                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            className="ml-2 text-sm font-medium text-foreground"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                            {username}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </a>
    );
}
