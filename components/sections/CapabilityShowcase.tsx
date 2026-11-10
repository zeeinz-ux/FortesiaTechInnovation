"use client";

import React from "react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface TechSkill {
  name: string;
  icon: string;
}

interface TechCategory {
  number: string;
  name: string;
  skills: TechSkill[];
}

export default function CapabilityShowcase() {
  const categories: TechCategory[] = [
    {
      number: "01",
      name: "Frontend",
      skills: [
        { name: "Next.js 15", icon: "nextdotjs" },
        { name: "React 19", icon: "react" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Tailwind CSS", icon: "tailwindcss" },
        { name: "JavaScript", icon: "javascript" },
        { name: "HTML5", icon: "html5" },
        { name: "CSS3", icon: "css" },
        { name: "Bootstrap", icon: "bootstrap" },
        { name: "Vite", icon: "vite" },
      ],
    },
    {
      number: "02",
      name: "Backend",
      skills: [
        { name: "Node.js", icon: "nodedotjs" },
        { name: "Python", icon: "python" },
        { name: "FastAPI", icon: "fastapi" },
        { name: "Laravel", icon: "laravel" },
        { name: "Express", icon: "express" },
        { name: "TypeScript", icon: "typescript" },
        { name: "REST API", icon: "postman" },
      ],
    },
    {
      number: "03",
      name: "Mobile",
      skills: [
        { name: "Flutter", icon: "flutter" },
        { name: "Dart", icon: "dart" },
        { name: "React Native", icon: "react" },
        { name: "Android SDK", icon: "android" },
        { name: "iOS Swift", icon: "swift" },
        { name: "Firebase", icon: "firebase" },
      ],
    },
    {
      number: "04",
      name: "Database",
      skills: [
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "Redis", icon: "redis" },
        { name: "Supabase", icon: "supabase" },
        { name: "MySQL", icon: "mysql" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Prisma", icon: "prisma" },
      ],
    },
    {
      number: "05",
      name: "Cloud & DevOps",
      skills: [
        { name: "Docker", icon: "docker" },
        { name: "Cloudflare", icon: "cloudflare" },
        { name: "Vercel", icon: "vercel" },
        { name: "AWS Cloud", icon: "amazonwebservices" },
        { name: "Linux", icon: "linux" },
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
      ],
    },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="kapabilitas">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column: Sticky Header matching Image 3 */}
          <div className="lg:w-5/12 lg:sticky lg:top-36">
            <ScrollReveal direction="left">
              <span className="text-xs font-bold tracking-[0.25em] text-indigo-600 dark:text-purple-400 uppercase">
                CAPABILITIES
              </span>

              <h2
                className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-slate-950 dark:text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Tools of
                <br />
                the Trade.
              </h2>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 max-w-md">
                Kombinasi teknologi modern dan arsitektur handal yang kami gunakan untuk membangun produk digital berkecepatan tinggi, aman, dan siap scale-up.
              </p>

              {/* Quick Trust Pill */}
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Standardized Production Stack</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Numbered Skill Categories with Right-to-Left Running Marquee */}
          <div className="lg:w-7/12 w-full flex flex-col">
            {categories.map((cat, idx) => (
              <ScrollReveal key={cat.number} delay={idx * 0.08} direction="up">
                <div className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 border-t border-slate-200/90 py-8 dark:border-white/10">
                  {/* Category Identifier */}
                  <div className="flex sm:flex-col items-baseline sm:items-start gap-3 sm:gap-0 sm:w-40 shrink-0">
                    <span className="text-3xl sm:text-4xl font-light text-slate-400 transition-colors group-hover:text-indigo-600 dark:text-white/25 dark:group-hover:text-purple-400">
                      {cat.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                      {cat.name}
                    </h3>
                  </div>

                  {/* Infinite Horizontal Running Marquee: RIGHT TO LEFT */}
                  <div className="relative w-full overflow-hidden mask-marquee">
                    {/* Gradient Fade Masks */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />

                    <div className="animate-marquee-rtl flex items-center gap-6 whitespace-nowrap py-1">
                      {[...Array(2)].map((_, copyIndex) => (
                        <div key={copyIndex} className="flex items-center gap-6 pr-6">
                          {cat.skills.map((skill, sIdx) => (
                            <div
                              key={sIdx}
                              className="group/pill inline-flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-purple-400 dark:hover:text-purple-300"
                            >
                              {/* SimpleIcon image with automatic dark/light mode query */}
                              <img
                                src={`https://cdn.simpleicons.org/${skill.icon}`}
                                alt={skill.name}
                                loading="lazy"
                                decoding="async"
                                width="18"
                                height="18"
                                className="h-4.5 w-4.5 opacity-70 transition-opacity group-hover/pill:opacity-100 dark:invert"
                                onError={(e) => {
                                  // Fallback gracefully if image fails to load
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                              <span>{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
