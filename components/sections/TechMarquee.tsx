import React from "react";
import Container from "@/components/ui/Container";

export default function TechMarquee() {
  const techs = [
    "Next.js 15 & React",
    "Flutter & Dart",
    "Node.js & Express",
    "Python & FastAPI",
    "PostgreSQL & Redis",
    "Tailwind CSS",
    "Docker & Cloudflare",
  ];

  return (
    <section className="border-y border-slate-200/80 bg-slate-50/50 py-7 dark:border-white/5 dark:bg-[#07070e]/40">
      <Container>
        <p className="mb-4 text-center text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
          Teknologi Standar Industri yang Kami Gunakan
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-700 opacity-90 dark:text-slate-300">
          {techs.map((tech, idx) => (
            <React.Fragment key={tech}>
              <span className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                {tech}
              </span>
              {idx < techs.length - 1 && (
                <span className="text-slate-300 dark:text-white/10" aria-hidden="true">
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}

