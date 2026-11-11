"use client";

import React, { useEffect, useRef } from "react";
import {
  ArrowUp,
  Compass,
  Cpu,
  Globe,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import {
  buildWhatsAppHandoffUrl,
  MAX_USER_MESSAGE_CHARS,
  QUICK_ACTIONS,
  type ChatMessage,
  type QuickActionItem,
} from "@/lib/forteai-knowledge";

interface ForteAIChatPanelProps {
  messages: ChatMessage[];
  inputValue: string;
  isLoading: boolean;
  sessionAiRemaining: number;
  onInputChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onQuickAction: (item: QuickActionItem) => void;
  onResetChat: () => void;
  onClose: () => void;
  panelStyle: React.CSSProperties;
}

function getQuickActionIcon(id: string) {
  switch (id) {
    case "layanan":
      return <Globe className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />;
    case "app":
      return <Cpu className="h-4 w-4 text-violet-600 dark:text-purple-300" />;
    case "alur":
      return <Compass className="h-4 w-4 text-sky-600 dark:text-sky-300" />;
    default:
      return <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
  }
}

export default function ForteAIChatPanel({
  messages,
  inputValue,
  isLoading,
  sessionAiRemaining,
  onInputChange,
  onSubmit,
  onQuickAction,
  onResetChat,
  onClose,
  panelStyle,
}: ForteAIChatPanelProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 108)}px`;
  }, [inputValue]);

  const lastUserTopic = [...messages]
    .reverse()
    .find((m) => m.role === "user")?.content;

  const waUrl = buildWhatsAppHandoffUrl(lastUserTopic);

  return (
    <section
      aria-label="Kolom Chat ForteAI"
      style={panelStyle}
      className="fixed z-50 flex max-h-[calc(100dvh-96px)] w-[calc(100vw-24px)] max-w-[372px] flex-col overflow-hidden rounded-[26px] border border-indigo-200/90 bg-gradient-to-b from-[#f6f3ff]/96 via-white/96 to-[#eef2ff]/96 shadow-[0_24px_60px_-14px_rgba(99,102,241,0.32)] backdrop-blur-xl sm:rounded-[28px] dark:border-white/12 dark:bg-gradient-to-b dark:from-[#16132b]/96 dark:via-[#0d0d19]/96 dark:to-[#111226]/96 dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.85)]"
    >
      {/* Ambient soft glow accents behind glass (clipped so <section> never overflows) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
      >
        <div className="absolute -top-16 -right-12 h-44 w-44 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-600/20" />
        <div className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl dark:bg-indigo-500/20" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-indigo-100/80 px-4 py-3 dark:border-white/10">
        {messages.length > 0 ? (
          <button
            type="button"
            onClick={onResetChat}
            title="Mulai percakapan baru"
            aria-label="Mulai percakapan baru"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-200/80 bg-white/80 text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/15 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        ) : (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat WhatsApp Langsung"
            aria-label="Chat WhatsApp Langsung"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300"
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </a>
        )}

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.85)]" />
          <span className="text-xs font-extrabold tracking-wide text-slate-900 dark:text-white">
            ForteAI
          </span>
          <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-purple-500/20 dark:text-purple-300">
            Assistant
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          title="Tutup panel chat (Esc)"
          aria-label="Tutup panel chat"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-200 bg-white text-slate-800 shadow-sm transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-rose-400/50 dark:hover:bg-rose-500/20 dark:hover:text-rose-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Body: Welcome Orb View vs Active Chat Thread */}
      <div
        ref={bodyRef}
        className="relative z-10 min-h-0 flex-1 overflow-y-auto px-3.5 py-3.5 sm:px-4 sm:py-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center text-center">
            <p className="text-[13px] font-medium text-slate-600 sm:text-sm dark:text-slate-300">
              Hai! Aku <span className="font-bold text-slate-900 dark:text-white">ForteAI</span>
            </p>
            <h3 className="mt-0.5 text-base font-extrabold tracking-tight text-slate-950 sm:text-lg dark:text-white">
              Ada yang bisa aku bantu{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-indigo-300 dark:to-sky-400">
                hari ini?
              </span>
            </h3>

            {/* Center Glowing Orb Avatar matching mockup */}
            <div className="relative my-3.5 flex flex-col items-center sm:my-5">
              <div className="relative flex h-16 w-16 items-center justify-center sm:h-24 sm:w-24">
                {/* Outer luminous ring */}
                <div
                  aria-hidden="true"
                  className="forteai-orb-spin absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500/45 via-indigo-500/35 to-sky-400/45 blur-md"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-1 rounded-full border border-white/70 bg-gradient-to-br from-violet-400 via-indigo-500 to-sky-400 shadow-[inset_0_0_16px_rgba(255,255,255,0.65),0_10px_28px_rgba(99,102,241,0.38)] dark:border-white/25"
                />
                {/* Cute glowing cyan pill eyes */}
                <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <span className="forteai-eye-blink h-3.5 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.95)] sm:h-5 sm:w-2.5" />
                  <span className="forteai-eye-blink h-3.5 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.95)] sm:h-5 sm:w-2.5" />
                </div>
              </div>
              {/* Soft ground shadow */}
              <div
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-11 rounded-full bg-indigo-500/20 blur-[3px] sm:mt-2 sm:h-2 sm:w-14 dark:bg-purple-400/25"
              />
            </div>

            {/* 2x2 Quick Action Cards (single column on <350px screens, 0-token local answers) */}
            <div className="grid w-full grid-cols-1 gap-2 text-left min-[350px]:grid-cols-2 sm:gap-2.5">
              {QUICK_ACTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onQuickAction(item)}
                  className="group flex min-w-0 flex-col gap-1 rounded-2xl border border-indigo-100/90 bg-white/85 p-2.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white hover:shadow-md sm:p-3 dark:border-white/10 dark:bg-white/[0.05] dark:hover:border-purple-400/40 dark:hover:bg-white/[0.09]"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-indigo-50 sm:h-7 sm:w-7 dark:bg-white/10">
                      {getQuickActionIcon(item.id)}
                    </span>
                    <span className="truncate text-xs font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </span>
                  </div>
                  <span className="line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400">
                    {item.subtitle}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[86%] break-words whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      isUser
                        ? "rounded-br-md bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm"
                        : "rounded-bl-md border border-indigo-100/90 bg-white/90 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/[0.07] dark:text-slate-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {!isUser && msg.suggestWhatsApp && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300"
                    >
                      <MessageCircle className="h-3 w-3" />
                      <span>Konsultasi via WhatsApp</span>
                    </a>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-indigo-100/90 bg-white/90 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/[0.07]">
                  <span className="forteai-typing-dot h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-purple-400" />
                  <span
                    className="forteai-typing-dot h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-purple-400"
                    style={{ animationDelay: "0.18s" }}
                  />
                  <span
                    className="forteai-typing-dot h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-purple-400"
                    style={{ animationDelay: "0.36s" }}
                  />
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Bottom Pill Input Bar matching mockup */}
      <form
        onSubmit={onSubmit}
        className="relative z-10 shrink-0 border-t border-indigo-100/70 px-3.5 py-3 dark:border-white/10"
      >
        <div className="flex items-end gap-2 rounded-[22px] border border-indigo-200/80 bg-white/95 p-1.5 shadow-sm focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-white/12 dark:bg-white/[0.06] dark:focus-within:border-purple-400/60">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Lanjut diskusi di WhatsApp"
            aria-label="Lanjut diskusi di WhatsApp"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-colors hover:bg-emerald-50 hover:text-emerald-600 dark:bg-white/10 dark:text-purple-300 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </a>

          <textarea
            ref={inputRef}
            rows={1}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!isLoading && inputValue.trim() && sessionAiRemaining > 0) {
                  e.currentTarget.form?.requestSubmit();
                }
              }
            }}
            maxLength={MAX_USER_MESSAGE_CHARS}
            disabled={isLoading || sessionAiRemaining <= 0}
            placeholder={
              sessionAiRemaining > 0
                ? "Tanya seputar Fortesia..."
                : "Lanjut via WhatsApp ya!"
            }
            aria-label="Tulis pertanyaan untuk ForteAI"
            className="min-h-[32px] max-h-[108px] min-w-0 flex-1 resize-none overflow-y-auto bg-transparent px-1 py-[7px] text-xs font-medium leading-[18px] text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-60 dark:text-white dark:placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={isLoading || !inputValue.trim() || sessionAiRemaining <= 0}
            aria-label="Kirim pesan"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-400 text-white shadow-md transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </form>
    </section>
  );
}

