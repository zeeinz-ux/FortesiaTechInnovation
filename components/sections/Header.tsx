"use client";

import React, { useState, useEffect } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Container from "@/components/ui/Container";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Layanan", href: "#layanan" },
    { label: "Kapabilitas", href: "#kapabilitas" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Alur Kerja", href: "#alur-kerja" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#07070e]/90 dark:shadow-black/50"
          : "bg-transparent"
      }`}
    >
        <Container className="flex h-18 items-center justify-between">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3" aria-label="Fortesia Tech Innovation">
            <img
              src="/logo.svg"
              alt="Logo Fortesia Tech Innovation"
              className="h-10 w-auto"
              width="210"
              height="48"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navigasi Menu">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-purple-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Tools: ThemeToggle & CTA Button */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <a
              href="https://wa.me/6285893861418?text=Halo%20Fortesia%20Tech%20Innovation,%20saya%20ingin%20konsultasi%20mengenai%20proyek%20kami."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile hidden items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:brightness-110 sm:inline-flex"
            >
              <span>Konsultasi Gratis</span>
              <svg className="h-3.5 w-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Buka navigasi seluler"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden dark:border-white/10 dark:text-slate-200"
            >
              <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="border-b border-slate-200 bg-white/95 px-6 py-6 shadow-xl backdrop-blur-lg md:hidden dark:border-white/10 dark:bg-[#0b0a17]/95">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-semibold text-slate-800 transition-colors hover:text-indigo-600 dark:text-slate-200 dark:hover:text-purple-400"
                >
                  {link.label}
                </a>
              ))}
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

