"use client";

import React from "react";
import { Sparkles, Zap, Shield, Rocket, Cpu, Code2, Globe2 } from "lucide-react";

export default function TechMarquee() {
  const items = [
    { text: "High-Performance Web Engineering", icon: <Zap className="h-3.5 w-3.5 text-emerald-500" /> },
    { text: "Cross-Platform Mobile Apps (Flutter & iOS)", icon: <Rocket className="h-3.5 w-3.5 text-indigo-500" /> },
    { text: "Custom Enterprise Web Systems (ERP & CRM)", icon: <Cpu className="h-3.5 w-3.5 text-purple-500" /> },
    { text: "Clean Architecture & Modular TypeScript", icon: <Code2 className="h-3.5 w-3.5 text-cyan-500" /> },
    { text: "Google PageSpeed Score 100 / 100", icon: <Sparkles className="h-3.5 w-3.5 text-amber-500" /> },
    { text: "100% Hak Milik Source Code & Server", icon: <Shield className="h-3.5 w-3.5 text-emerald-500" /> },
    { text: "Technical SEO & Schema.org Rich Result", icon: <Globe2 className="h-3.5 w-3.5 text-indigo-500" /> },
    { text: "Ultra Fast Load Time < 1 Detik", icon: <Zap className="h-3.5 w-3.5 text-purple-500" /> },
  ];

  return (
    <div className="relative border-y border-slate-200/80 bg-white/70 py-4 shadow-sm backdrop-blur-md overflow-hidden dark:border-white/10 dark:bg-[#121313]/80">
      {/* Edge gradient mask for smooth fade in/out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />

      {/* Marquee Track running from LEFT TO RIGHT (animate-marquee-ltr) */}
      <div className="animate-marquee-ltr flex items-center gap-8 whitespace-nowrap">
        {[...Array(2)].map((_, copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-8">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-slate-50/80 px-4 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:text-purple-300"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
