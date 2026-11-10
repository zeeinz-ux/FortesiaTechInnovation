"use client";

import React, { useState, useEffect } from "react";
import { Send, Mail, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

const MARQUEE_ITEMS = [
  "Available for Collaboration",
  "Let's Build Something",
  "Open for New Projects",
  "High-Performance Web Engineering",
  "Custom Mobile Applications",
  "Scalable Digital Solutions",
  "Contact Us Anytime",
  "Direct Engineer Discussion",
];

const CYCLING_WORDS = [
  "Together.",
  "Boldly.",
  "Creatively.",
  "Scalably.",
  "Seamlessly.",
  "Greatly.",
];

function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isLit, setIsLit] = useState(true);

  useEffect(() => {
    // 1. Lampu nyala ungu terang saat kata baru muncul
    setIsLit(true);

    // 2. Setelah 700ms, lampu perlahan meredup ke abu-abu
    const dimTimer = setTimeout(() => {
      setIsLit(false);
    }, 700);

    // 3. Setelah 2.4s, kata meluncur ke atas dan menghilang
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 2400);

    // 4. Di 2.8s, kata berganti dan lampu ungu menyala kembali
    const nextTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
      setIsLit(true);
      setVisible(true);
    }, 2800);

    return () => {
      clearTimeout(dimTimer);
      clearTimeout(fadeTimer);
      clearTimeout(nextTimer);
    };
  }, [index]);

  return (
    <span
      className={`inline-block transition-all duration-700 ease-out ${
        isLit
          ? "text-indigo-600 dark:text-purple-400 drop-shadow-[0_0_26px_rgba(168,85,247,0.55)]"
          : "text-slate-400 dark:text-zinc-500 drop-shadow-none"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition:
          "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.75s ease, filter 0.75s ease",
      }}
    >
      {CYCLING_WORDS[index]}
    </span>
  );
}

export default function CTABanner() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = "Nama wajib diisi";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Email tidak valid";
    }
    if (!message.trim()) errs.message = "Pesan wajib diisi";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Send formatted message directly to WhatsApp
    const text = `Halo Fortesia Tech Innovation,\n\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`;
    const waUrl = `https://wa.me/6285129792711?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");

    setSentSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <section className="relative pt-12 pb-24 md:pt-16 md:pb-36 overflow-hidden" id="kontak">
      {/* Top Subtle Marquee Bar - Runs Relaxed & Slow from Right to Left */}
      <div className="w-full overflow-hidden border-y border-slate-200/80 bg-white/40 py-3.5 mb-16 backdrop-blur-sm dark:border-white/[0.06] dark:bg-white/[0.01]">
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
          <div
            className="animate-marquee-rtl flex items-center gap-10 whitespace-nowrap"
            style={{ animationDuration: "36s" }}
          >
            {[...Array(2)].map((_, copyIndex) => (
              <div key={copyIndex} className="flex items-center gap-10">
                {MARQUEE_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-10">
                    <span className="text-[11px] font-bold tracking-[0.26em] text-slate-500 uppercase transition-colors hover:text-indigo-600 dark:text-zinc-500 dark:hover:text-purple-300">
                      {item}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Grid Overlay matching Top Hero */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Soft Ambient Spotlight in Center */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[130px] dark:bg-purple-600/15"
        aria-hidden="true"
      />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* Eyebrow Label matching Image 1 & 4 */}
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[0.28em] text-indigo-600 dark:text-purple-400 uppercase mb-4">
              GET IN TOUCH
            </p>

            {/* Main Headline with Cycling Words (Gray to Purple) */}
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-slate-950 dark:text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Let&apos;s Work
              <br />
              <CyclingWord />
            </h2>

            {/* Divider Line */}
            <div className="mx-auto my-8 h-px w-12 bg-slate-300 dark:bg-white/15" />
          </ScrollReveal>

          {/* Interactive Contact Form */}
          <ScrollReveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mx-auto w-full max-w-md text-left space-y-4 mb-8"
            >
              {sentSuccess && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Pesan berhasil dikirim via WhatsApp! Tim kami akan segera merespons.</span>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((p) => ({ ...p, name: "" }));
                  }}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none backdrop-blur-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder-white/30 dark:focus:border-purple-400"
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] font-semibold text-rose-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((p) => ({ ...p, email: "" }));
                  }}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none backdrop-blur-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder-white/30 dark:focus:border-purple-400"
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] font-semibold text-rose-500">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setErrors((p) => ({ ...p, message: "" }));
                  }}
                  placeholder="Your message..."
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none backdrop-blur-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder-white/30 dark:focus:border-purple-400"
                />
                {errors.message && (
                  <p className="mt-1 text-[11px] font-semibold text-rose-500">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-tactile flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-900 px-8 py-3.5 text-xs font-bold tracking-wide text-white shadow-md hover:bg-slate-800 dark:border-white/15 dark:bg-white/[0.08] dark:hover:bg-white/[0.15]"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Message</span>
              </button>
            </form>

            {/* Bottom Action Buttons matching Image 1 & 4 */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              {/* Send Email */}
              <a
                href="mailto:fortesiatechinnovation@gmail.com"
                className="btn-tactile inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-md hover:border-slate-400 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.1]"
              >
                <Mail className="h-4 w-4 text-indigo-500 dark:text-purple-400" />
                <span>Send Email</span>
              </a>

              {/* WhatsApp Me */}
              <a
                href="https://wa.me/6285129792711"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-md hover:border-emerald-400 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.1]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-emerald-500">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.65.81-.8 0.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
                </svg>
                <span>WhatsApp Me</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
