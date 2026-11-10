import React from "react";
import { Compass, Palette, Code2, Rocket } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Workflow() {
  const steps = [
    {
      step: "Tahap 01",
      icon: <Compass className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />,
      title: "Diskusi & Riset Kebutuhan",
      desc: "Kami mendengarkan target bisnis Anda, menganalisis fitur yang dibutuhkan, dan menyusun estimasi timeline kerja yang realistis.",
    },
    {
      step: "Tahap 02",
      icon: <Palette className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />,
      title: "Desain UI/UX & Prototyping",
      desc: "Merancang antarmuka visual yang modern, intuitif, dan responsif sebelum baris kode pertama mulai ditulis.",
    },
    {
      step: "Tahap 03",
      icon: <Code2 className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />,
      title: "Coding & Uji Keamanan",
      desc: "Pengembangan sistem dengan clean code, optimasi kecepatan, integrasi basis data, dan pengujian bebas bug di berbagai device.",
    },
    {
      step: "Tahap 04",
      icon: <Rocket className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />,
      title: "Deploy & Handover",
      desc: "Peluncuran produk ke domain resmi, serah terima kode sumber, pelatihan penggunaan, dan aktivasi garansi teknis purna jual.",
    },
  ];

  return (
    <section className="border-y border-slate-200/80 bg-slate-50/70 py-20 md:py-28 dark:border-white/5 dark:bg-[#07070e]/40" id="alur-kerja">
      <Container>
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-purple-500/30 dark:bg-purple-500/15 dark:text-purple-300">
            Alur Kerja Praktis
          </div>
          <h2
            className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            4 Tahap Mudah Menuju Peluncuran
          </h2>
          <p className="mt-4 text-base text-slate-700 dark:text-slate-300">
            Proses kolaborasi yang jelas, terstruktur, dan transparan tanpa kejutan biaya di tengah jalan.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, idx) => (
            <ScrollReveal key={item.step} delay={idx * 0.08}>
              <div className="glass-panel relative flex h-full flex-col justify-between rounded-2xl p-6 sm:p-7">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-extrabold text-indigo-700 dark:bg-purple-500/20 dark:text-purple-300">
                      {item.step}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 dark:bg-white/5">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
