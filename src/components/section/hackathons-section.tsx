"use client";
/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";
import { ArrowUpRight, GitPullRequest, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">Open Source Contributions </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">I like building things</h2> */}
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              While Learning i've thought to contribute to Open Source Projects which eventually taught me a lot
              Currently i've contributed to {DATA.hackathons.length} projects and thinking to contribute more
            </p>
          </div>
        </div>
        <Timeline>
          {DATA.hackathons.map((hackathon) => (
            <TimelineItem key={hackathon.title + hackathon.dates} className="w-full flex items-start justify-between gap-10 group/hackathon">
              <TimelineConnectItem className="flex items-start justify-center">
                {hackathon.image ? (
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                  />
                ) : (
                  <div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none" />
                )}
              </TimelineConnectItem>
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                {hackathon.dates && (
                  <time className="text-xs text-muted-foreground">{hackathon.dates}</time>
                )}
                {hackathon.title && (
                  <a href={hackathon.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                    <h3 className="font-semibold leading-none">{hackathon.title}</h3>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-all duration-200" aria-hidden />
                  </a>
                )}
                {hackathon.repository && (
                  <a href={hackathon.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground relative inline after:content-[''] after:absolute after:h-[1px] after:w-full after:scale-x-0 after:bg-current after:bottom-0 after:left-0 group-[&:has(.hackathon-description:hover)]/hackathon:after:scale-x-100 after:transition-transform after:duration-500 after:ease-out after:origin-left hover:no-underline">{hackathon.repository}</p>
                  </a>
                )}
                {hackathon.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word hackathon-description cursor-default">
                    {hackathon.description}
                  </p>
                )}
                {hackathon.links && hackathon.links.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2 w-full">
                    {/* Collapsible Trigger */}
                    <motion.div
                      className="group/collapsible w-full"
                      initial="collapsed"
                      whileHover="expanded"
                      animate="collapsed"
                    >
                      <div className="flex items-center gap-2 cursor-pointer w-fit group-hover/collapsible:text-primary transition-colors py-1">
                        <span className="text-xs font-medium text-muted-foreground group-hover/collapsible:text-foreground">View Contributions</span>
                        <ChevronDown className="size-3 text-muted-foreground group-hover/collapsible:text-foreground transition-transform duration-300 group-hover/collapsible:rotate-180" />
                      </div>

                      {/* Animated Drawer */}
                      <motion.div
                        className="overflow-hidden"
                        variants={{
                          collapsed: { height: 0, opacity: 0 },
                          expanded: { height: "auto", opacity: 1 }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="mt-2 flex flex-col gap-2 relative pl-4 border-l-2 border-muted/40 ml-1 py-1">
                          {hackathon.links.map((link, idx) => {
                            // Zig-zag pattern: 0 -> 0, 1 -> 20, 2 -> 10, 3 -> 30, repeat
                            const offsets = [0, 0, 0, 0];
                            const offset = offsets[idx % offsets.length];

                            return (
                              <div
                                key={idx}
                                className="relative group/link flex items-center"
                                style={{ marginLeft: `${offset}px` }}
                              >
                                <span
                                  className="absolute bg-muted/40 transition-colors group-hover/link:bg-primary/50"
                                  style={{
                                    // Horizontal line length = offset + gap from border
                                    width: `${offset + 16}px`,
                                    height: '1px',
                                    left: `-${offset + 16}px`,
                                    top: '50%'
                                  }}
                                ></span>
                                <span className="absolute size-1.5 rounded-full bg-muted/40 group-hover/link:bg-primary/50 transition-colors"
                                  style={{
                                    left: `-${offset + 16}px`,
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)'
                                  }}
                                ></span>
                                <Link
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-all hover:bg-muted/50 px-2 py-1 rounded-md w-fit border border-transparent hover:border-muted/50"
                                >
                                  <GitPullRequest className="size-3" />
                                  {link.title}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
