"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ForteAIChatPanel from "@/components/ui/ForteAIChatPanel";
import {
  buildFallbackReply,
  MAX_AI_REQUESTS_PER_SESSION,
  MAX_HISTORY_ITEM_CHARS,
  MAX_HISTORY_ITEMS,
  MAX_USER_MESSAGE_CHARS,
  resolveLocalReply,
  SECTION_GREETINGS,
  type ChatMessage,
  type QuickActionItem,
} from "@/lib/forteai-knowledge";

const TRACKED_SECTIONS = [
  "home",
  "layanan",
  "kapabilitas",
  "keunggulan",
  "alur-kerja",
  "faq",
  "kontak",
] as const;

const SEND_COOLDOWN_MS = 2200;
const MAX_SPARKLES = 36;

type MascotPose = "greet" | "fly" | "glide";

interface Point {
  x: number;
  y: number;
}

interface FlightArc {
  active: boolean;
  from: Point;
  to: Point;
  startAt: number;
  duration: number;
  arcLift: number;
  swayAmp: number;
}

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  isStar: boolean;
  rotation: number;
  vr: number;
}

const SPARKLE_COLORS = [
  "103, 232, 249", // cyan
  "192, 132, 252", // violet
  "255, 255, 255", // bright white
  "253, 230, 138", // warm fairy dust gold
];

function getRobotDimensions(vw: number) {
  const isMobile = vw < 768;
  return {
    isMobile,
    w: isMobile ? 64 : 92,
    h: isMobile ? 84 : 118,
  };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Clamp robot coordinates strictly inside safe viewport bounds while leaving headroom
 * for the contextual bubble below the fixed Header and clearing FloatingWhatsApp.
 */
function clampRobotPosition(x: number, y: number, vw: number, vh: number): Point {
  const { isMobile, w, h } = getRobotDimensions(vw);
  const minX = 16;
  const maxX = Math.max(minX, vw - w - 16);
  const minY = isMobile ? 116 : 128;
  const maxY = Math.max(minY, vh - h - 22);

  let cx = Math.max(minX, Math.min(maxX, x));
  let cy = Math.max(minY, Math.min(maxY, y));

  const waWidth = isMobile ? 176 : 264;
  const waTop = vh - 98;
  const waLeft = vw - waWidth;

  if (cx + w > waLeft && cy + h > waTop) {
    const aboveWaY = waTop - h - 14;
    if (aboveWaY >= minY) {
      cy = aboveWaY;
    } else {
      cx = Math.max(minX, waLeft - w - 14);
    }
  }

  return { x: cx, y: cy };
}

function pickRandomSafeWaypoint(
  vw: number,
  vh: number,
  avoidPos?: Point,
  preferredSide?: "left" | "right"
): Point {
  const { isMobile, w, h } = getRobotDimensions(vw);
  const minY = isMobile ? 118 : 128;
  const maxY = Math.max(minY, vh - h - 24);

  if (isMobile) {
    const minTravel = 34;
    const minLeft = 14;
    const maxLeft = Math.max(24, Math.min(72, vw - 216));
    const lowMinY = Math.max(minY, vh - h - 185);

    let best = clampRobotPosition(18, vh - h - 32, vw, vh);
    for (let attempt = 0; attempt < 6; attempt++) {
      const rx = minLeft + Math.random() * Math.max(8, maxLeft - minLeft);
      const ry = lowMinY + Math.random() * Math.max(24, maxY - lowMinY);
      const cand = clampRobotPosition(rx, ry, vw, vh);
      best = cand;
      if (!avoidPos || Math.hypot(cand.x - avoidPos.x, cand.y - avoidPos.y) >= minTravel) {
        return cand;
      }
    }
    return best;
  }

  const bandWidth = Math.max(48, Math.min(180, vw * 0.14));
  const minTravel = 135;

  let best = clampRobotPosition(24, vh - h - 28, vw, vh);
  for (let attempt = 0; attempt < 8; attempt++) {
    const chooseLeft =
      preferredSide && attempt === 0
        ? preferredSide === "left"
        : avoidPos
          ? Math.random() < 0.62
            ? avoidPos.x + w / 2 > vw / 2
            : Math.random() < 0.5
          : Math.random() < 0.5;

    const rx = chooseLeft
      ? 18 + Math.random() * bandWidth
      : vw - w - 18 - Math.random() * bandWidth;
    const ry = minY + Math.random() * Math.max(40, maxY - minY);
    const cand = clampRobotPosition(rx, ry, vw, vh);
    best = cand;

    if (!avoidPos || Math.hypot(cand.x - avoidPos.x, cand.y - avoidPos.y) >= minTravel) {
      return cand;
    }
  }

  return best;
}

function getViewportSize() {
  const vv = typeof window !== "undefined" ? window.visualViewport : null;
  return {
    vw: Math.round(vv?.width ?? window.innerWidth),
    vh: Math.round(vv?.height ?? window.innerHeight),
    offsetTop: Math.round(vv?.offsetTop ?? 0),
  };
}

function computeChatPanelStyle(
  robotPos: Point,
  vw: number,
  vh: number,
  offsetTop = 0
): React.CSSProperties {
  // Mobile portrait, phone landscape, or soft keyboard open on touch devices
  if (vw < 640 || vh < 480) {
    if (vh < 480) {
      const top = Math.max(8, offsetTop + 10);
      const maxHeight = Math.max(180, vh - 20);
      return {
        top: `${top}px`,
        maxHeight: `${maxHeight}px`,
        ...(vw < 640 ? { left: "12px" } : { right: "16px" }),
      };
    }

    const safeTop = 76;
    const bottomClearance = 88;
    const maxHeight = Math.max(200, Math.min(500, vh - safeTop - bottomClearance));
    return {
      left: "12px",
      bottom: `${bottomClearance}px`,
      maxHeight: `${maxHeight}px`,
    };
  }

  const safeTop = 84;
  const { w, h } = getRobotDimensions(vw);
  const panelW = Math.min(372, vw - 24);

  const isRightSide = robotPos.x + w / 2 > vw / 2;
  let left = isRightSide ? robotPos.x + w - panelW : robotPos.x;
  left = Math.max(16, Math.min(vw - panelW - 16, left));

  // Keep panel clear of the bottom-right FloatingWhatsApp CTA button
  const waLeft = vw - 254;
  const bottomLimit = left + panelW > waLeft ? vh - 88 : vh - 20;
  const maxAvailableH = Math.max(220, bottomLimit - safeTop);
  const targetH = Math.min(510, maxAvailableH);

  const isLowerHalf = robotPos.y + h / 2 > vh / 2;
  let top = isLowerHalf ? robotPos.y - targetH - 12 : robotPos.y + h + 12;
  top = Math.max(safeTop, Math.min(bottomLimit - targetH, top));

  const maxHeight = Math.max(220, Math.min(520, bottomLimit - top));

  return {
    left: `${Math.round(left)}px`,
    top: `${Math.round(top)}px`,
    maxHeight: `${Math.round(maxHeight)}px`,
  };
}

function detectActiveSection(): string {
  const triggerY = Math.max(140, window.innerHeight * 0.35);
  let current: string = TRACKED_SECTIONS[0];
  for (const id of TRACKED_SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= triggerY) {
      current = id;
    }
  }
  return current;
}

function drawFourPointStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const outerX = Math.cos(angle) * radius;
    const outerY = Math.sin(angle) * radius;
    const innerAngle = angle + Math.PI / 4;
    const innerX = Math.cos(innerAngle) * (radius * 0.28);
    const innerY = Math.sin(innerAngle) * (radius * 0.28);
    if (i === 0) ctx.moveTo(outerX, outerY);
    else ctx.lineTo(outerX, outerY);
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Translucent iridescent cyber-fairy wings layered behind the flying mascot.
 */
function CyberFairyWings({ pose }: { pose: MascotPose }) {
  const activeFlight = pose !== "greet";
  return (
    <svg
      viewBox="0 0 140 110"
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 transition-all duration-500 ${activeFlight
        ? "-top-1 -left-5 w-[132%] h-[92%] opacity-85 scale-100"
        : "top-2 -left-3 w-[118%] h-[78%] opacity-45 scale-90"
        }`}
    >
      <defs>
        <linearGradient id="forteai-wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      {/* Left translucent wings */}
      <g className="forteai-wing-left">
        <path
          d="M66 54 C42 18, 12 10, 6 28 C2 42, 26 56, 62 60 Z"
          fill="url(#forteai-wing-grad)"
          stroke="rgba(196, 181, 253, 0.7)"
          strokeWidth="1"
        />
        <path
          d="M62 62 C38 58, 14 70, 20 84 C26 94, 48 82, 64 68 Z"
          fill="url(#forteai-wing-grad)"
          stroke="rgba(103, 232, 249, 0.6)"
          strokeWidth="0.9"
        />
      </g>
      {/* Right translucent wings */}
      <g className="forteai-wing-right">
        <path
          d="M74 54 C98 18, 128 10, 134 28 C138 42, 114 56, 78 60 Z"
          fill="url(#forteai-wing-grad)"
          stroke="rgba(196, 181, 253, 0.7)"
          strokeWidth="1"
        />
        <path
          d="M78 62 C102 58, 126 70, 120 84 C114 94, 92 82, 76 68 Z"
          fill="url(#forteai-wing-grad)"
          stroke="rgba(103, 232, 249, 0.6)"
          strokeWidth="0.9"
        />
      </g>
    </svg>
  );
}

export default function ForteAIAssistant() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [pose, setPose] = useState<MascotPose>("greet");
  const [facingLeft, setFacingLeft] = useState<boolean>(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [bubbleOnLeft, setBubbleOnLeft] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({
    left: "16px",
    bottom: "88px",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionAiRemaining, setSessionAiRemaining] = useState(MAX_AI_REQUESTS_PER_SESSION);

  const robotRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftEyeRef = useRef<HTMLSpanElement>(null);
  const rightEyeRef = useRef<HTMLSpanElement>(null);

  const curPosRef = useRef<Point>({ x: 24, y: 400 });
  const targetPosRef = useRef<Point>({ x: 24, y: 400 });
  const flightRef = useRef<FlightArc>({
    active: false,
    from: { x: 24, y: 400 },
    to: { x: 24, y: 400 },
    startAt: 0,
    duration: 1200,
    arcLift: -44,
    swayAmp: 12,
  });

  const activeSectionRef = useRef<string>("home");
  const poseRef = useRef<MascotPose>("greet");
  const facingLeftRef = useRef<boolean>(false);
  const settleTimerRef = useRef<number | null>(null);
  const swoopCounterRef = useRef<number>(0);
  const sparklesRef = useRef<SparkleParticle[]>([]);
  const lastSparkleAtRef = useRef<number>(0);

  const manualHoldUntilRef = useRef<number>(0);
  const isHoveringRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const chatOpenRef = useRef<boolean>(false);
  const scrollTiltRef = useRef<number>(0);
  const dragTiltRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const pointerPosRef = useRef<Point>({ x: -1, y: -1 });
  const lastSendAtRef = useRef<number>(0);
  const responseCacheRef = useRef<Map<string, { reply: string; suggestWhatsApp: boolean }>>(
    new Map()
  );

  const dragStartRef = useRef<{
    pointerX: number;
    pointerY: number;
    lastPointerX: number;
    robotX: number;
    robotY: number;
    moved: boolean;
  }>({
    pointerX: 0,
    pointerY: 0,
    lastPointerX: 0,
    robotX: 24,
    robotY: 400,
    moved: false,
  });

  const clearSettleTimer = useCallback(() => {
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  }, []);

  const applyPose = useCallback((nextPose: MascotPose, faceLeft = false) => {
    const resolvedLeft = nextPose === "greet" ? false : faceLeft;
    poseRef.current = nextPose;
    facingLeftRef.current = resolvedLeft;
    setPose(nextPose);
    setFacingLeft(resolvedLeft);
  }, []);

  const scheduleReturnToGreet = useCallback(
    (delayMs = 1200) => {
      clearSettleTimer();
      settleTimerRef.current = window.setTimeout(() => {
        settleTimerRef.current = null;
        if (!isDraggingRef.current && !flightRef.current.active) {
          applyPose("greet", false);
        }
      }, delayMs);
    },
    [applyPose, clearSettleTimer]
  );

  useEffect(() => {
    chatOpenRef.current = chatOpen;
    if (chatOpen) {
      clearSettleTimer();
      flightRef.current.active = false;
      applyPose("greet", false);
    }
  }, [chatOpen, applyPose, clearSettleTimer]);

  useEffect(() => {
    if (!chatOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setChatOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chatOpen]);

  useEffect(() => {
    if (mounted && robotRef.current) {
      robotRef.current.style.transform = `translate3d(${curPosRef.current.x.toFixed(1)}px, ${curPosRef.current.y.toFixed(1)}px, 0)`;
    }
  }, [mounted]);

  const syncBubbleSide = useCallback((x: number) => {
    const vw = window.innerWidth;
    const { w } = getRobotDimensions(vw);
    setBubbleOnLeft(x + w / 2 > vw / 2);
  }, []);

  const launchFairyFlight = useCallback(
    (destination: Point, preferredPose?: MascotPose) => {
      const from = { ...curPosRef.current };
      const dist = Math.hypot(destination.x - from.x, destination.y - from.y);
      targetPosRef.current = destination;
      syncBubbleSide(destination.x);

      if (dist < 18) {
        if (poseRef.current !== "greet" && !flightRef.current.active) {
          scheduleReturnToGreet(800);
        }
        return;
      }

      clearSettleTimer();
      const idx = ++swoopCounterRef.current;
      const nextPose: MascotPose = preferredPose ?? (idx % 2 === 1 ? "fly" : "glide");

      const dx = destination.x - from.x;
      const { w } = getRobotDimensions(window.innerWidth);
      const flyLeft =
        Math.abs(dx) > 25 ? dx < 0 : destination.x + w / 2 > window.innerWidth / 2;
      applyPose(nextPose, flyLeft);

      const swayDir = Math.random() > 0.5 ? 1 : -1;
      flightRef.current = {
        active: true,
        from,
        to: destination,
        startAt: performance.now(),
        duration: Math.max(850, Math.min(1750, 720 + dist * 0.85 + Math.random() * 180)),
        arcLift: -Math.min(72, Math.max(24, dist * (0.1 + Math.random() * 0.06))),
        swayAmp: swayDir * (10 + Math.random() * 14),
      };
    },
    [applyPose, clearSettleTimer, scheduleReturnToGreet, syncBubbleSide]
  );

  // Initialize physics, curved fairy flight, pose rotation, and stardust trail canvas
  useEffect(() => {
    setMounted(true);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const initialSection = detectActiveSection();
    activeSectionRef.current = initialSection;
    setActiveSection(initialSection);

    const { h } = getRobotDimensions(vw);
    const startPoint = clampRobotPosition(24, vh - h - 28, vw, vh);
    curPosRef.current = startPoint;
    targetPosRef.current = startPoint;
    lastScrollYRef.current = window.scrollY;
    syncBubbleSide(startPoint.x);

    const isBotOrReduced =
      typeof navigator !== "undefined" &&
      (/Lighthouse|PageSpeed|Google-InspectionTool|HeadlessChrome|PTST|Chrome-Lighthouse/i.test(
        navigator.userAgent
      ) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    if (isBotOrReduced) {
      setVisible(true);
      return;
    }

    const revealTimer = window.setTimeout(() => {
      setVisible(true);
    }, 950);

    const resizeCanvas = () => {
      const canvas = trailCanvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    let rafId = 0;
    const startedAt = performance.now();

    const handleScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollYRef.current;
      lastScrollYRef.current = y;
      scrollTiltRef.current = Math.max(-13, Math.min(13, -dy * 0.28));

      const nextSection = detectActiveSection();
      if (nextSection !== activeSectionRef.current) {
        activeSectionRef.current = nextSection;
        setActiveSection(nextSection);
        if (
          Date.now() > manualHoldUntilRef.current &&
          !isDraggingRef.current &&
          !chatOpenRef.current
        ) {
          const wp = pickRandomSafeWaypoint(
            window.innerWidth,
            window.innerHeight,
            curPosRef.current
          );
          launchFairyFlight(wp);
        }
      }
    };

    const handleResize = () => {
      resizeCanvas();
      const curVw = window.innerWidth;
      const curVh = window.innerHeight;
      const clampedTarget = clampRobotPosition(
        targetPosRef.current.x,
        targetPosRef.current.y,
        curVw,
        curVh
      );
      flightRef.current.active = false;
      clearSettleTimer();
      applyPose("greet", false);
      targetPosRef.current = clampedTarget;
      curPosRef.current = clampRobotPosition(curPosRef.current.x, curPosRef.current.y, curVw, curVh);
      syncBubbleSide(clampedTarget.x);
      if (chatOpenRef.current) {
        const vp = getViewportSize();
        setPanelStyle(computeChatPanelStyle(curPosRef.current, vp.vw, vp.vh, vp.offsetTop));
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
    };

    // Randomized organic patrol strictly inside safe viewport frame
    let patrolTimerId = 0;
    const scheduleNextRandomPatrol = () => {
      const delay = 4600 + Math.random() * 3600;
      patrolTimerId = window.setTimeout(() => {
        scheduleNextRandomPatrol();
        if (
          isHoveringRef.current ||
          isDraggingRef.current ||
          chatOpenRef.current ||
          flightRef.current.active
        ) {
          return;
        }
        if (Date.now() <= manualHoldUntilRef.current) return;

        const wp = pickRandomSafeWaypoint(
          window.innerWidth,
          window.innerHeight,
          curPosRef.current
        );
        launchFairyFlight(wp);
      }, delay);
    };
    scheduleNextRandomPatrol();

    const spawnSparkle = (x: number, y: number, vxBase: number, vyBase: number, highSpeed: boolean) => {
      if (sparklesRef.current.length >= MAX_SPARKLES) {
        sparklesRef.current.shift();
      }
      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
      sparklesRef.current.push({
        x: x + (Math.random() - 0.5) * 18,
        y: y + (Math.random() - 0.5) * 16,
        vx: vxBase + (Math.random() - 0.5) * 0.9,
        vy: vyBase + Math.random() * 0.55 + 0.15,
        size: highSpeed ? 2.4 + Math.random() * 3.4 : 1.8 + Math.random() * 2.4,
        alpha: highSpeed ? 0.95 : 0.7,
        decay: highSpeed ? 0.018 + Math.random() * 0.012 : 0.014 + Math.random() * 0.01,
        color,
        isStar: Math.random() > 0.35,
        rotation: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.08,
      });
    };

    const tick = (now: number) => {
      const el = robotRef.current;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const { isMobile, w, h } = getRobotDimensions(vw);

      let speed = 0;

      if (el) {
        const t = (now - startedAt) * 0.001;
        const pauseDrift = isHoveringRef.current || isDraggingRef.current || chatOpenRef.current;

        let nx = curPosRef.current.x;
        let ny = curPosRef.current.y;
        let bankTilt = 0;

        if (flightRef.current.active && !isDraggingRef.current && !chatOpenRef.current) {
          const fl = flightRef.current;
          const rawP = Math.min(1, (now - fl.startAt) / fl.duration);
          const p = easeInOutCubic(rawP);

          const arcY = Math.sin(rawP * Math.PI) * fl.arcLift;
          const swayX = Math.sin(rawP * Math.PI * 2) * fl.swayAmp;

          const desired = clampRobotPosition(
            fl.from.x + (fl.to.x - fl.from.x) * p + swayX,
            fl.from.y + (fl.to.y - fl.from.y) * p + arcY,
            vw,
            vh
          );

          nx = curPosRef.current.x + (desired.x - curPosRef.current.x) * 0.22;
          ny = curPosRef.current.y + (desired.y - curPosRef.current.y) * 0.22;

          const vx = nx - curPosRef.current.x;
          const vy = ny - curPosRef.current.y;
          speed = Math.hypot(vx, vy);
          bankTilt = Math.max(-14, Math.min(14, vx * 1.45));

          if (rawP >= 1) {
            fl.active = false;
            if (isHoveringRef.current || chatOpenRef.current) {
              applyPose("greet", false);
            } else if (poseRef.current === "fly") {
              // Brief arched fairy glide upon landing, then automatically return to greet pose
              applyPose("glide", facingLeftRef.current);
              scheduleReturnToGreet(1200);
            } else if (poseRef.current === "glide") {
              scheduleReturnToGreet(1050);
            }
          }
        } else {
          // Self-healing guard: never linger indefinitely outside the initial greet pose
          if (
            !isDraggingRef.current &&
            poseRef.current !== "greet" &&
            (isHoveringRef.current || chatOpenRef.current)
          ) {
            applyPose("greet", false);
          } else if (
            !isDraggingRef.current &&
            poseRef.current !== "greet" &&
            settleTimerRef.current === null
          ) {
            scheduleReturnToGreet(900);
          }

          dragTiltRef.current *= isDraggingRef.current ? 0.88 : 0.8;

          if (isDraggingRef.current) {
            nx = targetPosRef.current.x;
            ny = targetPosRef.current.y;
            speed = Math.abs(dragTiltRef.current) * 0.16;
            bankTilt = dragTiltRef.current;
          } else {
            const ampX = pauseDrift ? 0 : isMobile ? 6 : 15;
            const ampY = pauseDrift ? 0 : isMobile ? 6 : 12;
            const driftX = Math.sin(t * 0.85) * 0.65 + Math.cos(t * 1.37) * 0.35;
            const driftY = Math.cos(t * 1.1) * 0.65 + Math.sin(t * 1.7) * 0.35;
            const desired = clampRobotPosition(
              targetPosRef.current.x + driftX * ampX,
              targetPosRef.current.y + driftY * ampY,
              vw,
              vh
            );

            nx = curPosRef.current.x + (desired.x - curPosRef.current.x) * 0.085;
            ny = curPosRef.current.y + (desired.y - curPosRef.current.y) * 0.085;

            const vx = nx - curPosRef.current.x;
            const vy = ny - curPosRef.current.y;
            speed = Math.hypot(vx, vy);
            bankTilt = Math.max(-10, Math.min(10, (desired.x - nx) * 0.08)) + dragTiltRef.current;
          }
        }

        const prevX = curPosRef.current.x;
        const prevY = curPosRef.current.y;
        curPosRef.current = { x: nx, y: ny };

        scrollTiltRef.current *= 0.88;
        const totalTilt = bankTilt + scrollTiltRef.current;

        el.style.transform = `translate3d(${nx.toFixed(1)}px, ${ny.toFixed(1)}px, 0) rotate(${totalTilt.toFixed(2)}deg)`;

        // Cursor-tracking eye pupils for the front greet pose
        if (
          poseRef.current === "greet" &&
          pointerPosRef.current.x >= 0 &&
          leftEyeRef.current &&
          rightEyeRef.current
        ) {
          const centerX = nx + w * 0.48;
          const centerY = ny + h * 0.31;
          const dx = pointerPosRef.current.x - centerX;
          const dy = pointerPosRef.current.y - centerY;
          const dist = Math.hypot(dx, dy) || 1;
          const maxShift = isMobile ? 1.8 : 3.0;
          const ex = (dx / dist) * Math.min(maxShift, dist * 0.015);
          const ey = (dy / dist) * Math.min(maxShift, dist * 0.015);
          const eyeTransform = `translate(${ex.toFixed(2)}px, ${ey.toFixed(2)}px) rotate(4deg)`;
          leftEyeRef.current.style.transform = eyeTransform;
          rightEyeRef.current.style.transform = eyeTransform;
        }

        // Emit fairy stardust sparkles from trailing tail/feet
        const isFlyingFast = speed > 0.75;
        const spawnInterval = isFlyingFast ? 34 : 210;
        if (!chatOpenRef.current && now - lastSparkleAtRef.current >= spawnInterval) {
          lastSparkleAtRef.current = now;
          const moveDx = nx - prevX;
          const moveDy = ny - prevY;
          const tailX = nx + w * (moveDx >= 0 ? 0.28 : 0.72);
          const tailY = ny + h * 0.76;
          spawnSparkle(tailX, tailY, -moveDx * 0.25, -moveDy * 0.2, isFlyingFast);
          if (isFlyingFast) {
            spawnSparkle(tailX - moveDx * 1.4, tailY - moveDy * 1.4, -moveDx * 0.15, 0.25, true);
          }
        }
      }

      // Render & update fairy stardust trail canvas
      const canvas = trailCanvasRef.current;
      const sparkles = sparklesRef.current;
      if (canvas && sparkles.length > 0) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, vw, vh);
          for (let i = sparkles.length - 1; i >= 0; i--) {
            const p = sparkles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.vr;
            p.alpha -= p.decay;

            if (p.alpha <= 0.02) {
              sparkles.splice(i, 1);
              continue;
            }

            ctx.fillStyle = `rgba(${p.color}, ${p.alpha.toFixed(3)})`;
            if (p.isStar) {
              drawFourPointStar(ctx, p.x, p.y, p.size * 1.35, p.rotation);
            } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * 0.55, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    const handleViewportChange = () => {
      if (chatOpenRef.current) {
        const vp = getViewportSize();
        setPanelStyle(computeChatPanelStyle(curPosRef.current, vp.vw, vp.vh, vp.offsetTop));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    vv?.addEventListener("resize", handleViewportChange);
    vv?.addEventListener("scroll", handleViewportChange);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(patrolTimerId);
      clearSettleTimer();
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      vv?.removeEventListener("resize", handleViewportChange);
      vv?.removeEventListener("scroll", handleViewportChange);
    };
  }, [applyPose, clearSettleTimer, launchFairyFlight, scheduleReturnToGreet, syncBubbleSide]);

  const toggleChat = () => {
    setChatOpen((prev) => {
      const next = !prev;
      if (next) {
        const vp = getViewportSize();
        setPanelStyle(computeChatPanelStyle(curPosRef.current, vp.vw, vp.vh, vp.offsetTop));
      }
      return next;
    });
  };

  const handleRobotPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    flightRef.current.active = false;
    dragTiltRef.current = 0;
    clearSettleTimer();
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      lastPointerX: e.clientX,
      robotX: curPosRef.current.x,
      robotY: curPosRef.current.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleRobotPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.pointerX;
    const dy = e.clientY - dragStartRef.current.pointerY;
    const stepDx = e.clientX - dragStartRef.current.lastPointerX;
    dragStartRef.current.lastPointerX = e.clientX;

    if (!dragStartRef.current.moved && Math.hypot(dx, dy) >= 5) {
      dragStartRef.current.moved = true;
      applyPose("fly", dx < 0);
    } else if (dragStartRef.current.moved && Math.abs(stepDx) >= 2) {
      const nextLeft = stepDx < 0;
      if (nextLeft !== facingLeftRef.current) {
        applyPose("fly", nextLeft);
      }
    }

    if (dragStartRef.current.moved) {
      const nextPos = clampRobotPosition(
        dragStartRef.current.robotX + dx,
        dragStartRef.current.robotY + dy,
        window.innerWidth,
        window.innerHeight
      );
      dragTiltRef.current = Math.max(-14, Math.min(14, stepDx * 0.9));
      curPosRef.current = nextPos;
      targetPosRef.current = nextPos;
      if (robotRef.current) {
        robotRef.current.style.transform = `translate3d(${nextPos.x.toFixed(1)}px, ${nextPos.y.toFixed(1)}px, 0) rotate(${dragTiltRef.current.toFixed(2)}deg)`;
      }
      manualHoldUntilRef.current = Date.now() + 3_000;
      syncBubbleSide(nextPos.x);
      if (chatOpen) {
        const vp = getViewportSize();
        setPanelStyle(computeChatPanelStyle(nextPos, vp.vw, vp.vh, vp.offsetTop));
      }
    }
  };

  const handleRobotPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    dragTiltRef.current = 0;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!dragStartRef.current.moved) {
      toggleChat();
    } else {
      manualHoldUntilRef.current = Date.now() + 3_000;
      applyPose("greet", false);
    }
  };

  const handleRobotPointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    dragTiltRef.current = 0;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    applyPose("greet", false);
  };

  const appendAssistantTurn = (userText: string, reply: string, suggestWhatsApp = true) => {
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setMessages((prev) => [
      ...prev,
      { id: `u-${uid}`, role: "user", content: userText },
      { id: `a-${uid}`, role: "assistant", content: reply, suggestWhatsApp },
    ]);
  };

  const handleQuickAction = (item: QuickActionItem) => {
    appendAssistantTurn(item.prompt, item.reply, item.suggestWhatsApp ?? true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim().slice(0, MAX_USER_MESSAGE_CHARS);
    if (!trimmed || isLoading) return;

    const now = Date.now();
    if (now - lastSendAtRef.current < SEND_COOLDOWN_MS) return;
    lastSendAtRef.current = now;

    setInputValue("");

    const local = resolveLocalReply(trimmed);
    if (local.handled && local.reply) {
      appendAssistantTurn(trimmed, local.reply, local.suggestWhatsApp ?? false);
      return;
    }

    const cacheKey = trimmed.toLowerCase();
    const cached = responseCacheRef.current.get(cacheKey);
    if (cached) {
      appendAssistantTurn(trimmed, cached.reply, cached.suggestWhatsApp);
      return;
    }

    if (sessionAiRemaining <= 0) {
      appendAssistantTurn(
        trimmed,
        "Sesi chat AI kita sudah mencapai batas maksimal nih biar kuota tetap lancar. Yuk lanjut ngobrol langsung lewat konsultasi WhatsApp gratis di bawah!",
        true
      );
      return;
    }

    const userMsgId = `u-${Date.now()}`;
    const historySnapshot = messages.slice(-MAX_HISTORY_ITEMS).map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_HISTORY_ITEM_CHARS),
    }));

    setMessages((prev) => [...prev, { id: userMsgId, role: "user", content: trimmed }]);
    setIsLoading(true);
    setSessionAiRemaining((prev) => Math.max(0, prev - 1));

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historySnapshot,
          activeSection,
        }),
      });

      const data = (await res.json()) as {
        reply?: string;
        suggestWhatsApp?: boolean;
      };

      const reply = data.reply?.trim() || buildFallbackReply(trimmed, activeSection);
      const suggestWhatsApp = data.suggestWhatsApp ?? true;

      responseCacheRef.current.set(cacheKey, { reply, suggestWhatsApp });
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: reply, suggestWhatsApp },
      ]);
    } catch {
      const fallback = buildFallbackReply(trimmed, activeSection);
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: fallback, suggestWhatsApp: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const greetingText = SECTION_GREETINGS[activeSection] ?? SECTION_GREETINGS.home;

  // Pose-aware horizontal mirror so flying/gliding poses face their travel direction
  const flipSprite =
    (pose === "fly" && facingLeft) || (pose === "glide" && !facingLeft);

  return (
    <>
      {/* Swirling Fairy Stardust Sparkle Trail Canvas */}
      <canvas
        ref={trailCanvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30"
      />

      {/* Floating Flying Mascot */}
      <div
        ref={robotRef}
        onMouseEnter={() => {
          isHoveringRef.current = true;
          clearSettleTimer();
          if (!isDraggingRef.current) {
            applyPose("greet", false);
          }
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
        }}
        className={`fixed top-0 left-0 z-40 select-none transition-opacity duration-300 ${!visible
          ? "opacity-0 pointer-events-none"
          : chatOpen
            ? "max-sm:opacity-0 max-sm:pointer-events-none opacity-100"
            : "opacity-100"
          }`}
        style={{ willChange: "transform" }}
      >
        {/* Contextual Speech Bubble */}
        {!chatOpen && !bubbleDismissed && (
          <div
            className={`absolute bottom-[calc(100%+4px)] w-max max-w-[196px] sm:max-w-[220px] ${bubbleOnLeft ? "right-0" : "left-0"
              }`}
          >
            <div className="relative flex items-start gap-1.5 rounded-2xl border border-indigo-200/90 bg-white/95 px-3 py-2 text-[11px] font-semibold leading-snug text-slate-800 shadow-lg backdrop-blur-md dark:border-purple-400/25 dark:bg-[#131226]/95 dark:text-slate-100">
              <button
                type="button"
                onClick={toggleChat}
                className="text-left transition-colors hover:text-indigo-600 dark:hover:text-purple-300"
              >
                <span className="mr-1 font-extrabold text-indigo-600 dark:text-purple-400">
                  ForteAI:
                </span>
                {greetingText}
              </button>
              <button
                type="button"
                onClick={() => setBubbleDismissed(true)}
                aria-label="Tutup sapaan ForteAI"
                className="mt-0.5 shrink-0 rounded-full p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Clickable & Draggable Multi-Pose Robot Sprite */}
        <button
          type="button"
          onPointerDown={handleRobotPointerDown}
          onPointerMove={handleRobotPointerMove}
          onPointerUp={handleRobotPointerUp}
          onPointerCancel={handleRobotPointerCancel}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleChat();
            }
          }}
          aria-label={chatOpen ? "Tutup chat ForteAI" : "Buka chat ForteAI Assistant"}
          aria-expanded={chatOpen}
          title="Klik untuk chat atau geser ForteAI"
          className="group relative flex h-[84px] w-[64px] cursor-grab items-center justify-center touch-none focus:outline-none active:cursor-grabbing md:h-[118px] md:w-[92px]"
        >
          {/* Ambient fairy glow aura */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1 h-4 w-12 rounded-full bg-indigo-500/35 blur-md transition-transform duration-300 group-hover:scale-110 dark:bg-sky-400/35 md:w-16"
          />

          {/* Floating body wrapper */}
          <div
            className={`forteai-bob relative h-full w-full transition-transform duration-300 group-hover:scale-105 ${flipSprite ? "-scale-x-100" : ""
              }`}
          >
            <CyberFairyWings pose={pose} />

            {/* Pose 1: Front Greeting Pose (with live blinking + cursor-tracking cyan eyes) */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${pose === "greet" ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
              <img
                src="/images/forteai-mascot.png"
                alt="ForteAI Assistant"
                width={262}
                height={340}
                draggable={false}
                className="pointer-events-none h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(67,56,202,0.28)] dark:drop-shadow-[0_12px_22px_rgba(56,189,248,0.24)]"
              />
              <span
                ref={leftEyeRef}
                aria-hidden="true"
                style={{ left: "36.2%", top: "24.4%", width: "5.7%", height: "9.1%" }}
                className="pointer-events-none absolute flex items-center justify-center"
              >
                <span className="forteai-eye-blink h-full w-full rounded-full bg-[#67e8f9] shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
              </span>
              <span
                ref={rightEyeRef}
                aria-hidden="true"
                style={{ left: "56.8%", top: "25.6%", width: "6.0%", height: "9.1%" }}
                className="pointer-events-none absolute flex items-center justify-center"
              >
                <span className="forteai-eye-blink h-full w-full rounded-full bg-[#67e8f9] shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
              </span>
            </div>

            {/* Pose 2: Dynamic Soaring Fairy Flight Pose */}
            <img
              src="/images/forteai-mascot-fly.png"
              alt=""
              aria-hidden="true"
              width={282}
              height={340}
              draggable={false}
              className={`pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(67,56,202,0.28)] transition-opacity duration-300 dark:drop-shadow-[0_12px_22px_rgba(56,189,248,0.24)] ${pose === "fly" ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Pose 3: Dreamy Arched Fairy Glide Pose */}
            <img
              src="/images/forteai-mascot-glide.png"
              alt=""
              aria-hidden="true"
              width={237}
              height={340}
              draggable={false}
              className={`pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(67,56,202,0.28)] transition-opacity duration-300 dark:drop-shadow-[0_12px_22px_rgba(56,189,248,0.24)] ${pose === "glide" ? "opacity-100" : "opacity-0"
                }`}
            />
          </div>
        </button>
      </div>

      {/* Chat Panel */}
      {chatOpen && (
        <ForteAIChatPanel
          messages={messages}
          inputValue={inputValue}
          isLoading={isLoading}
          sessionAiRemaining={sessionAiRemaining}
          onInputChange={setInputValue}
          onSubmit={handleSubmit}
          onQuickAction={handleQuickAction}
          onResetChat={() => setMessages([])}
          onClose={() => setChatOpen(false)}
          panelStyle={panelStyle}
        />
      )}
    </>
  );
}
