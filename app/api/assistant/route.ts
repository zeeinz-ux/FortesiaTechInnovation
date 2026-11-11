import { NextRequest, NextResponse } from "next/server";
import {
  buildFallbackReply,
  FORTEAI_SYSTEM_PROMPT,
  MAX_HISTORY_ITEM_CHARS,
  MAX_HISTORY_ITEMS,
  MAX_USER_MESSAGE_CHARS,
  resolveLocalReply,
  type ChatRole,
} from "@/lib/forteai-knowledge";

interface RequestHistoryItem {
  role?: ChatRole;
  content?: string;
}

interface AssistantRequestBody {
  message?: string;
  history?: RequestHistoryItem[];
  activeSection?: string;
}

interface RateBucket {
  minuteCount: number;
  minuteResetAt: number;
  hourCount: number;
  hourResetAt: number;
}

const RATE_LIMIT_PER_MINUTE = 12;
const RATE_LIMIT_PER_HOUR = 45;
const rateStore = new Map<string, RateBucket>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip")?.trim() || "anonymous";
}

function isOriginAllowed(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Same-origin fetch in some environments omits Origin

  try {
    const originHost = new URL(origin).hostname.toLowerCase();
    const requestHost = (request.headers.get("host") || "").split(":")[0].toLowerCase();
    return (
      originHost === requestHost ||
      originHost === "localhost" ||
      originHost === "127.0.0.1" ||
      originHost.endsWith(".vercel.app") ||
      originHost === "fortesiatechinnovation.web.id" ||
      originHost === "www.fortesiatechinnovation.web.id" ||
      originHost === "fortesiatech.com" ||
      originHost === "www.fortesiatech.com"
    );
  } catch {
    return false;
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Keep memory bounded if many IPs visit
  if (rateStore.size > 1000) {
    for (const [key, bucket] of rateStore.entries()) {
      if (bucket.hourResetAt <= now) {
        rateStore.delete(key);
      }
    }
  }

  const existing = rateStore.get(ip);
  const bucket: RateBucket = existing
    ? { ...existing }
    : {
      minuteCount: 0,
      minuteResetAt: now + 60_000,
      hourCount: 0,
      hourResetAt: now + 3_600_000,
    };

  if (now >= bucket.minuteResetAt) {
    bucket.minuteCount = 0;
    bucket.minuteResetAt = now + 60_000;
  }
  if (now >= bucket.hourResetAt) {
    bucket.hourCount = 0;
    bucket.hourResetAt = now + 3_600_000;
  }

  if (bucket.minuteCount >= RATE_LIMIT_PER_MINUTE || bucket.hourCount >= RATE_LIMIT_PER_HOUR) {
    rateStore.set(ip, bucket);
    return false;
  }

  bucket.minuteCount += 1;
  bucket.hourCount += 1;
  rateStore.set(ip, bucket);
  return true;
}

async function callGeminiApi(
  apiKey: string,
  model: string,
  contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>,
  includeThinkingBudget: boolean
): Promise<Response> {
  const generationConfig: Record<string, unknown> = {
    maxOutputTokens: 240,
    temperature: 0.5,
  };

  if (includeThinkingBudget) {
    generationConfig.thinkingConfig = { thinkingBudget: 0 };
  }

  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: FORTEAI_SYSTEM_PROMPT }],
        },
        contents,
        generationConfig,
      }),
      signal: AbortSignal.timeout(12_000),
    }
  );
}

export async function POST(request: NextRequest) {
  if (!isOriginAllowed(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  let body: AssistantRequestBody;
  try {
    body = (await request.json()) as AssistantRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const message = typeof body.message === "string"
    ? body.message.trim().slice(0, MAX_USER_MESSAGE_CHARS)
    : "";

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const activeSection = typeof body.activeSection === "string"
    ? body.activeSection.replace(/[^a-z0-9-]/gi, "").slice(0, 32)
    : undefined;

  // Defense-in-depth: intercept off-topic/jailbreak/standard FAQ before using any API quota
  const local = resolveLocalReply(message);
  if (local.handled && local.reply) {
    return NextResponse.json({
      reply: local.reply,
      source: "local",
      suggestWhatsApp: local.suggestWhatsApp ?? false,
    });
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({
      reply:
        "Wah, antrian chat lagi agak padat nih! Biar nggak nunggu, kamu bisa langsung konsultasi gratis sama tim kami lewat WhatsApp di bawah ya.",
      source: "fallback",
      suggestWhatsApp: true,
    });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({
      reply: buildFallbackReply(message, activeSection),
      source: "fallback",
      suggestWhatsApp: true,
    });
  }

  const model = process.env.GEMINI_MODEL?.trim() || "gemini-3.5-flash-lite";

  const sanitizedHistory = Array.isArray(body.history)
    ? body.history
      .slice(-MAX_HISTORY_ITEMS)
      .filter(
        (item): item is { role: ChatRole; content: string } =>
          (item?.role === "user" || item?.role === "assistant") &&
          typeof item.content === "string" &&
          item.content.trim().length > 0
      )
      .map((item) => ({
        role: item.role === "assistant" ? ("model" as const) : ("user" as const),
        parts: [{ text: item.content.trim().slice(0, MAX_HISTORY_ITEM_CHARS) }],
      }))
    : [];

  const contextualPrompt = activeSection
    ? `[Pengunjung sedang melihat bagian #${activeSection}]\n${message}`
    : message;

  const contents = [
    ...sanitizedHistory,
    { role: "user" as const, parts: [{ text: contextualPrompt }] },
  ];

  try {
    let res = await callGeminiApi(apiKey, model, contents, true);

    // Retry once without thinkingConfig if a custom model does not support thinkingBudget
    if (res.status === 400) {
      const errText = await res.text();
      if (/thinking/i.test(errText)) {
        res = await callGeminiApi(apiKey, model, contents, false);
      }
    }

    if (!res.ok) {
      return NextResponse.json({
        reply: buildFallbackReply(message, activeSection),
        source: "fallback",
        suggestWhatsApp: true,
      });
    }

    const data = (await res.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const replyText = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!replyText) {
      return NextResponse.json({
        reply: buildFallbackReply(message, activeSection),
        source: "fallback",
        suggestWhatsApp: true,
      });
    }

    return NextResponse.json({
      reply: replyText,
      source: "gemini",
      suggestWhatsApp: true,
    });
  } catch {
    return NextResponse.json({
      reply: buildFallbackReply(message, activeSection),
      source: "fallback",
      suggestWhatsApp: true,
    });
  }
}

