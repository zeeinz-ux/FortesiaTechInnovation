"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    setIsDark(dark);
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    // Detect system device theme
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    // Clean old stale localStorage so device auto-detection takes full priority
    if (localStorage.getItem("theme")) {
      localStorage.removeItem("theme");
    }

    // Check if user has explicitly toggled in this session
    const override = sessionStorage.getItem("theme_override");
    if (override === "dark" || override === "light") {
      applyTheme(override === "dark");
    } else {
      // Automatically follow device theme
      applyTheme(media.matches);
    }

    // Actively listen to device theme changes (e.g. OS auto-switch or system settings)
    const handleDeviceChange = (e: MediaQueryListEvent) => {
      sessionStorage.removeItem("theme_override");
      applyTheme(e.matches);
    };

    if (media.addEventListener) {
      media.addEventListener("change", handleDeviceChange);
      return () => media.removeEventListener("change", handleDeviceChange);
    } else if ((media as any).addListener) {
      (media as any).addListener(handleDeviceChange);
      return () => (media as any).removeListener(handleDeviceChange);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    sessionStorage.setItem("theme_override", nextDark ? "dark" : "light");
    applyTheme(nextDark);
  };

  return (
    <div
      className="theme-switch-wrapper inline-flex items-center"
      title={isDark ? "Beralih ke Mode Terang (Siang)" : "Beralih ke Mode Gelap (Malam)"}
    >
      <label className="switch" htmlFor="theme-switch-input">
        <input
          id="theme-switch-input"
          type="checkbox"
          checked={mounted ? isDark : true}
          onChange={toggleTheme}
          aria-label="Ganti mode tampilan siang atau malam"
        />
        <div className="slider round">
          <div className="sun-moon">
            <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
            <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
            <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
            <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
            <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
            <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>

            <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
            <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
            <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
            <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
            <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
            <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"></circle>
            </svg>
          </div>
          <div className="stars">
            <svg id="star-1" className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg id="star-2" className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg id="star-3" className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
            <svg id="star-4" className="star" viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
}
