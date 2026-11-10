"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";

export default function CapabilityShowcase() {
  const [activeTab, setActiveTab] = useState<"performance" | "code" | "seo" | "mobile">("performance");

  const tabData = {
    performance: {
      title: "Performa Kecepatan Akses (Real-Time Benchmark)",
      speed: "0.38s",
      score: "100/100",
      uptime: "99.98%",
      tech: "Lightweight",
      heights: ["40%", "65%", "85%", "50%", "95%", "80%", "100%"],
    },
    code: {
      title: "Kualitas Arsitektur & Keamanan Kode Program",
      speed: "A+ Grade",
      score: "Clean Code",
      uptime: "0 Vuln",
      tech: "TypeScript",
      heights: ["80%", "75%", "90%", "95%", "85%", "90%", "100%"],
    },
    seo: {
      title: "Indeks Mesin Pencari & Google Core Web Vitals",
      speed: "100% Pass",
      score: "Top 1 Rank",
      uptime: "Schema Ready",
      tech: "Next.js SSG",
      heights: ["60%", "70%", "80%", "90%", "85%", "95%", "100%"],
    },
    mobile: {
      title: "Respon Layar Seluler & Multi-Device Fluidity",
      speed: "60 FPS",
      score: "Fluid UI",
      uptime: "100% Touch",
      tech: "Responsive",
      heights: ["95%", "90%", "85%", "100%", "90%", "95%", "100%"],
    },
  };

  const current = tabData[activeTab];

  return (
    <section className="border-y border-slate-200/80 bg-slate-50/50 py-20 md:py-28 dark:border-white/5 dark:bg-[#07070e]/40" id="kapabilitas">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-purple-500/30 dark:bg-purple-500/15 dark:text-purple-300">
            Transparansi Mutu Rekayasa
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Kualitas Nyata yang Kami Bangun <span className="text-gradient">di Balik Layar</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Bukan sekadar tampilan luar yang rapi, setiap sistem yang kami serahkan harus lolos pengujian performa, keamanan, dan standar perayapan Google secara ketat.
          </p>
        </div>

        {/* Dashboard Frame (Inspirasi Desain Screenshot Nexora) */}
        <div className="glass-panel mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl">
          {/* Topbar with Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-white">
                SISTEM MONITORING MUTU
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ● Live Testing
              </span>
            </div>

            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-1 rounded-full bg-slate-200/70 p-1 dark:bg-white/5">
              {(
                [
                  { key: "performance", label: "Performa & Kecepatan" },
                  { key: "code", label: "Kualitas Kode" },
                  { key: "seo", label: "Audit SEO" },
                  { key: "mobile", label: "Multi-Device" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    activeTab === tab.key
                      ? "bg-white text-indigo-700 shadow-sm dark:bg-purple-600 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics 4 Columns */}
          <div className="grid grid-cols-2 gap-4 border-b border-slate-200 p-6 sm:grid-cols-4 dark:border-white/10">
            <div className="rounded-xl border border-slate-200/70 bg-white/50 p-4 dark:border-white/5 dark:bg-white/[0.02]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Kecepatan Render (FCP)</div>
              <div className="my-1 text-2xl font-black text-slate-900 dark:text-white">{current.speed}</div>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Ultra Fast</div>
            </div>

            <div className="rounded-xl border border-slate-200/70 bg-white/50 p-4 dark:border-white/5 dark:bg-white/[0.02]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Lighthouse Mutu</div>
              <div className="my-1 text-2xl font-black text-slate-900 dark:text-white">{current.score}</div>
              <div className="text-xs font-semibold text-indigo-600 dark:text-cyan-400">Max Standard</div>
            </div>

            <div className="rounded-xl border border-slate-200/70 bg-white/50 p-4 dark:border-white/5 dark:bg-white/[0.02]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Stabilitas Uptime</div>
              <div className="my-1 text-2xl font-black text-slate-900 dark:text-white">{current.uptime}</div>
              <div className="text-xs font-semibold text-purple-600 dark:text-purple-400">High Reliability</div>
            </div>

            <div className="rounded-xl border border-slate-200/70 bg-white/50 p-4 dark:border-white/5 dark:bg-white/[0.02]">
              <div className="text-xs text-slate-500 dark:text-slate-400">Arsitektur Runtime</div>
              <div className="my-1 text-2xl font-black text-slate-900 dark:text-white">{current.tech}</div>
              <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">Zero Bloat</div>
            </div>
          </div>

          {/* Chart & Health Breakdown */}
          <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
            {/* Chart Column */}
            <div className="rounded-xl border border-slate-200/80 bg-white/70 p-5 lg:col-span-2 dark:border-white/5 dark:bg-black/20">
              <div className="mb-4 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                <span>{current.title}</span>
                <span className="text-slate-400">Latency ms</span>
              </div>

              {/* Bar mockups */}
              <div className="flex h-44 items-end gap-3 pt-4">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, idx) => (
                  <div key={day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-indigo-500/40 to-indigo-600 transition-all duration-700 dark:from-purple-600/30 dark:to-purple-500"
                      style={{ height: current.heights[idx] }}
                    />
                    <span className="text-[10px] text-slate-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Checklist Column */}
            <div className="flex flex-col justify-center gap-3">
              {[
                { title: "Semantic HTML5 Markup", status: "100% Valid" },
                { title: "Responsive Viewport", status: "Mobile-First" },
                { title: "JSON-LD Schema Markup", status: "Google Rich" },
                { title: "Broken Assets Audit", status: "200 OK" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-lg border border-slate-200/80 bg-white/60 p-3 text-xs dark:border-white/5 dark:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
                    <span className="text-emerald-500">✓</span>
                    <span>{item.title}</span>
                  </div>
                  <span className="font-bold text-indigo-600 dark:text-cyan-400">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

