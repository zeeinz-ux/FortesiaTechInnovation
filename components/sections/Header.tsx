"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
  { label: "Home", id: "home", href: "#home" },
  { label: "Layanan", id: "layanan", href: "#layanan" },
  { label: "Kapabilitas", id: "kapabilitas", href: "#kapabilitas" },
  { label: "Keunggulan", id: "keunggulan", href: "#keunggulan" },
  { label: "Alur Kerja", id: "alur-kerja", href: "#alur-kerja" },
  { label: "FAQ", id: "faq", href: "#faq" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scrolled pill state and active section using viewport trigger line
  // (immune to tall sections on smaller viewports where ratio thresholds fail).
  useEffect(() => {
    let frameId = 0;

    const updateScrollState = () => {
      frameId = 0;
      setScrolled(window.scrollY > 40);

      const triggerY = Math.max(140, window.innerHeight * 0.35);
      let current = NAV_LINKS[0].id as string;

      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= triggerY) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const scheduleUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <div
        className={`pointer-events-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "mt-4 w-[92%] md:w-auto md:gap-10 rounded-full border border-slate-200/90 bg-white/90 px-6 py-2.5 shadow-xl backdrop-blur-md dark:border-white/[0.12] dark:bg-[#07070e]/85 dark:shadow-2xl"
            : "w-full max-w-7xl px-6 py-5 rounded-none border-transparent bg-transparent mt-0 md:w-full"
        }`}
      >
        {/* Logo Brand with dynamic light/dark monochrome mark */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center transition-opacity hover:opacity-80 text-left"
          aria-label="Fortesia Tech Innovation"
        >
          <Logo variant="compact" />
        </button>

        {/* Desktop Navigation Links with Active Scrollspy - Clean colored text only, NO background pill or border */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi Menu">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.id);
                }}
                className={`relative text-xs font-semibold tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-indigo-600 dark:text-purple-400 font-bold"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Tools: ThemeToggle & CTA Button */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href="https://wa.me/6285129792711?text=Halo%20Fortesia%20Tech%20Innovation,%20saya%20ingin%20konsultasi%20mengenai%20proyek%20kami."
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-tactile hidden items-center gap-2 rounded-full bg-slate-950 px-4.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:shadow-[0_0_20px_rgba(255,255,255,0.12)] sm:inline-flex"
          >
            <span>Konsultasi Gratis</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Buka navigasi seluler"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden dark:border-white/10 dark:text-slate-200"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-[#0c0b1e]/95">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.id);
                  }}
                  className={`px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-indigo-600 dark:text-purple-400 font-bold"
                      : "text-slate-800 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-purple-400"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href="https://wa.me/6285129792711?text=Halo%20Fortesia%20Tech%20Innovation,%20saya%20ingin%20konsultasi%20proyek."
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-center text-sm font-bold text-slate-950 shadow-md"
              >
                <span>Chat WhatsApp Langsung</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
