import React from "react";

export type LogoVariant = "compact" | "full" | "mark";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  markClassName?: string;
}

const MARK_PATHS = (
  <>
    {/* Upper speed beam ("Tech") */}
    <path d="M29 10 H91 L79 30 H24 Z" fill="currentColor" />
    {/* Solid architectural spine ("Fortesia") */}
    <path d="M21 42 H43 L31 90 H9 Z" fill="currentColor" />
    {/* Precision mid blade ("Innovation") */}
    <path d="M55 42 H82 L70 62 H50 Z" fill="currentColor" />
  </>
);

export default function Logo({
  variant = "compact",
  className = "",
  markClassName = "",
}: LogoProps) {
  if (variant === "mark") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        role="img"
        aria-label="Fortesia Tech Innovation"
        className={`h-8 w-8 shrink-0 text-zinc-950 transition-colors duration-300 dark:text-white ${className}`}
      >
        {MARK_PATHS}
      </svg>
    );
  }

  const isFull = variant === "full";

  return (
    <span
      className={`inline-flex items-center select-none ${
        isFull ? "gap-3" : "gap-2.5"
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className={`shrink-0 text-zinc-950 transition-colors duration-300 dark:text-white ${
          markClassName || (isFull ? "h-9 w-9" : "h-7 w-7")
        }`}
      >
        {MARK_PATHS}
      </svg>

      {isFull ? (
        <span className="flex flex-col leading-none">
          <span className="font-sans text-[19px] font-extrabold tracking-[-0.02em] text-zinc-950 transition-colors duration-300 dark:text-white">
            FORTESIA
          </span>
          <span className="mt-1 font-sans text-[10px] font-semibold tracking-[0.26em] text-zinc-500 uppercase transition-colors duration-300 dark:text-zinc-400">
            TECH INNOVATION
          </span>
        </span>
      ) : (
        <span className="font-sans text-[17px] font-extrabold tracking-[-0.02em] text-zinc-950 transition-colors duration-300 dark:text-white">
          FORTESIA
        </span>
      )}
    </span>
  );
}
