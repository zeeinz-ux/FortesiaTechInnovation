"use client";

import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING CORE");
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();

    // Realistic multi-stage loading progression (Total duration: ~1.85s)
    // Stage 1: 0 -> 28% (Quick bundle bootstrap)
    // Stage 2: 28 -> 65% (3D WebGL & component initialization)
    // Stage 3: 65 -> 88% (Shader compilation & asset parsing)
    // Stage 4: 88 -> 100% (Final render & ready)
    const tick = (now: number) => {
      const elapsed = now - startTime;

      let current = 0;
      let status = "INITIALIZING CORE";

      if (elapsed < 350) {
        // 0 to 350ms: fast jump to 28%
        const p = elapsed / 350;
        current = p * 28;
        status = "INITIALIZING CORE";
      } else if (elapsed < 900) {
        // 350ms to 900ms: steady ramp from 28% to 64%
        const p = (elapsed - 350) / 550;
        current = 28 + p * 36;
        status = "COMPILING 3D SHADERS";
      } else if (elapsed < 1450) {
        // 900ms to 1450ms: micro-pause and climb from 64% to 88%
        const p = (elapsed - 900) / 550;
        const eased = 1 - Math.pow(1 - p, 2);
        current = 64 + eased * 24;
        status = "OPTIMIZING ASSETS";
      } else if (elapsed < 1850) {
        // 1450ms to 1850ms: rapid finish from 88% to 100%
        const p = Math.min((elapsed - 1450) / 400, 1);
        current = 88 + p * 12;
        status = current >= 99 ? "SYSTEM READY" : "PREPARING INTERFACE";
      } else {
        current = 100;
        status = "SYSTEM READY";
      }

      setProgress(Math.min(current, 100));
      setStatusText(status);

      if (elapsed < 1850) {
        animId = requestAnimationFrame(tick);
      } else {
        // Hold 100% briefly, then slide up cleanly
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setVisible(false);
          }, 800);
        }, 220);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080C] text-white transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      aria-label="Loading Fortesia Tech Innovation"
    >
      {/* Banter Loader Animation - Pure White Boxes with Glow */}
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
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Fortesia
        </h1>
        <p className="mt-1.5 text-[10px] font-bold tracking-[0.4em] text-purple-400 uppercase">
          Tech Innovation
        </p>
      </div>

      {/* Progress Bar Container - Pure White & Silver Glow */}
      <div className="w-56 sm:w-64 h-1.5 rounded-full overflow-hidden bg-white/10 relative shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-white via-slate-100 to-white transition-all duration-75 ease-out shadow-[0_0_14px_rgba(255,255,255,0.85)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage Counter and Dynamic Stage Label */}
      <div className="mt-3.5 flex items-center justify-between w-56 sm:w-64 text-[11px] font-mono tracking-widest text-zinc-400">
        <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400">{statusText}</span>
        <span className="text-white font-semibold">{String(Math.min(Math.floor(progress), 100)).padStart(3, "0")}%</span>
      </div>
    </div>
  );
}
