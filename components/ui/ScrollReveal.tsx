"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * Lightweight scroll reveal built on IntersectionObserver + CSS transitions.
 * Replaces framer-motion to keep the client bundle small (saves ~100 KiB of JS).
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const offset =
    direction === "up"
      ? "translate3d(0, 36px, 0)"
      : direction === "down"
        ? "translate3d(0, -36px, 0)"
        : direction === "left"
          ? "translate3d(36px, 0, 0)"
          : direction === "right"
            ? "translate3d(-36px, 0, 0)"
            : "none";

  const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : offset,
        transition: `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
