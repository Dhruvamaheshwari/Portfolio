/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Marquee } from "@/components/magicui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight, DownloadIcon } from "lucide-react";
import { SocialIcon } from "@/components/ui/social-icon";
import { AnimatedName } from "@/components/ui/animated-name";
import { LargeNameFooter } from "@/components/ui/large-name-footer";
import { CodingDetail } from "@/components/ui/coding-detail";
import { TopStatus } from "@/components/ui/top-status";
import { Button } from "@/components/ui/button";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <div className="flex justify-start px-1 -mb-10">
        <TopStatus />
      </div>
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <AnimatedName className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl" />
              </BlurFade>
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.values(DATA.contact.social).map((social) => (
                    <SocialIcon
                      key={social.name}
                      icon={<social.icon className="size-4" />}
                      username={social.username}
                      link={social.url}
                    />
                  ))}
                </div>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="mt-4 relative inline-block">
                  <Link
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Button className="cursor-pointer">
                      <DownloadIcon className="mr-2 size-4 " />
                      Resume
                    </Button>
                  </Link>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 flex items-center gap-2 pointer-events-none opacity-70 flex-row-reverse">
                    <svg
                      width="50"
                      height="30"
                      viewBox="0 0 50 30"
                      fill="none"
                      className="text-foreground w-10 h-8 md:w-12 md:h-10 rotate-12">
                      <path
                        d="M5 5 Q 25 35 45 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M35 12 L 45 20 L 40 30"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm font-medium italic translate-y-2 translate-x-2 text-nowrap">
                      Download my resume!
                    </span>
                  </div>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
        <CodingDetail />
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-2 gap-4">
            <Marquee pauseOnHover className="[--duration:30s]">
              {DATA.skills
                .slice(0, Math.ceil(DATA.skills.length / 2))
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="mx-2 border bg-background border-border ring-2 ring-border/20 rounded-xl h-10 w-fit px-4 flex items-center gap-2 shadow-sm transition-all hover:shadow-md cursor-default">
                    {skill.icon && (
                      <skill.icon className="size-5 rounded overflow-hidden object-contain" />
                    )}
                    <span className="text-foreground text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:30s]">
              {DATA.skills
                .slice(Math.ceil(DATA.skills.length / 2))
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="mx-2 border bg-background border-border ring-2 ring-border/20 rounded-xl h-10 w-fit px-4 flex items-center gap-2 shadow-sm transition-all hover:shadow-md cursor-default">
                    {skill.icon && (
                      <skill.icon className="size-5 rounded overflow-hidden object-contain" />
                    )}
                    <span className="text-foreground text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>
      </section>

      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 15 + index * 0.05}>
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group">
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ?
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    : <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    }
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden
                        />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                      {"currentSem" in education && (
                        <div className="font-sans text-sm text-muted-foreground">
                          {education.currentSem}
                        </div>
                      )}
                      {"marks" in education && (
                        <div className="font-sans text-sm text-muted-foreground">
                          {education.marks}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section> */}

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>

      <section id="footer">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <LargeNameFooter />
        </BlurFade>
      </section>
    </main>
  );
}
