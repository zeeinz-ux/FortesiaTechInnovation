"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem("theme");
      if (!stored) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
          setIsDark(true);
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
          setIsDark(false);
        }
      }
    };

    if (media.addEventListener) {
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    } else if ((media as any).addListener) {
      (media as any).addListener(handler);
      return () => (media as any).removeListener(handler);
    }
  }, []);

  const toggleTheme = () => {
    const currentIsDark = document.documentElement.classList.contains("dark");
    if (currentIsDark) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Ganti mode tampilan terang atau gelap"
      title="Ganti Tema (Dark / Light)"
      className="btn-tactile flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-700 shadow-sm transition-all hover:border-indigo-400 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-purple-400 dark:hover:text-amber-400"
    >
      <span className="flex items-center justify-center dark:hidden">
        <Moon className="h-4 w-4" />
      </span>
      <span className="hidden items-center justify-center dark:flex">
        <Sun className="h-4 w-4 text-amber-400" />
      </span>
    </button>
  );
}

