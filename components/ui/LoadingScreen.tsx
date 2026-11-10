"use client";

import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if previously loaded in session (uncomment if you only want 1x per session)
    // if (sessionStorage.getItem("fortesia_loaded")) { setVisible(false); return; }

    let rafId: number;
    const startTime = performance.now();
    const duration = 2000; // 2.0s smooth load duration

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic: starts briskly and decelerates smoothly toward 100
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("fortesia_loaded", "1");
          }, 850);
        }, 300);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#08080C] transition-all duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      aria-label="Loading Fortesia Tech Innovation"
    >
      {/* Banter Loader Animation */}
      <div className="banter-loader mb-10">
        <div className="banter-loader__box" />
        <div className="banter-loader__box" />
        <div className="banter-loader__box" />
        <div className="banter-loader__box" />
        <div className="banter-loader__box" />
        <div className="banter-loader__box" />
        <div className="banter-loader__box" />
        <div className="banter-loader__box" />
        <div className="banter-loader__box" />
      </div>

      {/* Aesthetic Fortesia Title */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Fortesia
        </h1>
        <p className="mt-1.5 text-[10px] font-bold tracking-[0.38em] text-indigo-600 dark:text-purple-400 uppercase">
          Tech Innovation
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-56 sm:w-64 h-1.5 rounded-full overflow-hidden bg-slate-200/90 dark:bg-white/10 relative shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(168,85,247,0.6)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage Counter */}
      <div className="mt-3 flex items-center justify-between w-56 sm:w-64 text-[11px] font-mono tracking-widest text-slate-500 dark:text-zinc-500">
        <span>INITIALIZING</span>
        <span>{String(Math.min(Math.floor(progress), 100)).padStart(3, "0")}%</span>
      </div>
    </div>
  );
}

