import React from "react";

interface LogoProps {
  className?: string;
  height?: number | string;
  width?: number | string;
}

export default function Logo({ className = "h-9 w-auto", height = 40, width = 180 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 120"
      fill="none"
      className={className}
      height={height}
      width={width}
      aria-label="Fortesia Tech Innovation"
    >
      <defs>
        <linearGradient id="fortesiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#9333EA" stopOpacity="0.05" />
        </linearGradient>
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Logo Mark (F - Shield & Tech Node) */}
      <g transform="translate(10, 10)">
        <polygon
          points="50,4 92,26 92,74 50,96 8,74 8,26"
          fill="url(#shieldGrad)"
          stroke="url(#fortesiaGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M34 26 H72 M34 26 V74 M34 48 H62"
          stroke="url(#fortesiaGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neonGlow)"
        />
        <circle cx="72" cy="26" r="3.5" fill="#38BDF8" />
        <circle cx="62" cy="48" r="3.5" fill="#818CF8" />
        <circle cx="34" cy="74" r="3.5" fill="#A855F7" />
        <circle cx="50" cy="96" r="2.5" fill="#C084FC" />
      </g>

      {/* Typography */}
      <g transform="translate(125, 42)">
        {/* Brand Primary Name: Dark slate in light mode, Pure white in dark mode */}
        <text
          x="0"
          y="24"
          fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
          fontSize="34"
          fontWeight="900"
          letterSpacing="1.5"
          className="fill-slate-900 transition-colors duration-300 dark:fill-white"
        >
          FORTESIA
        </text>

        {/* Brand Slogan / Sub-brand */}
        <text
          x="2"
          y="48"
          fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
          fontSize="12"
          fontWeight="700"
          letterSpacing="4.5"
          fill="url(#fortesiaGrad)"
        >
          TECH INNOVATION
        </text>
      </g>
    </svg>
  );
}

