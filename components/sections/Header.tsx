"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home", href: "#home" },
    { label: "Layanan", id: "layanan", href: "#layanan" },
    { label: "Kapabilitas", id: "kapabilitas", href: "#kapabilitas" },
    { label: "Keunggulan", id: "keunggulan", href: "#keunggulan" },
    { label: "Alur Kerja", id: "alur-kerja", href: "#alur-kerja" },
    { label: "FAQ", id: "faq", href: "#faq" },
  ];

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: "-10% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
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
        {/* Logo Brand with dynamic light/dark typography */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-85 text-left"
          aria-label="Fortesia Tech Innovation"
        >
          <Logo className="h-8.5 w-auto" width="175" height="38" />
        </button>

        {/* Desktop Navigation Links with Active Scrollspy - Clean colored text only, NO background pill or border */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi Menu">
          {navLinks.map((link) => {
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
            href="https://wa.me/6285893861418?text=Halo%20Fortesia%20Tech%20Innovation,%20saya%20ingin%20konsultasi%20mengenai%20proyek%20kami."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile hidden items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:brightness-110 sm:inline-flex"
          >
            <span>Konsultasi Gratis</span>
            <ArrowRight className="h-3.5 w-3.5" />
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
            {navLinks.map((link) => {
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
                href="https://wa.me/6285893861418?text=Halo%20Fortesia%20Tech%20Innovation,%20saya%20ingin%20konsultasi%20proyek."
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
