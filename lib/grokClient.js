/**
 * OrgSuite Grok client — Ready to Configure until XAI_API_KEY is set.
 * Uses environment only. Never hardcode secrets.
 */

const XAI_CHAT_URL = "https://api.x.ai/v1/chat/completions";
const PRIMARY_MODEL = "grok-4";
const FALLBACK_MODEL = "grok-3-latest";

const DEFAULT_SYSTEM_PROMPT = [
  "You are Sophie elegant voice + OrgSuite agent core.",
  "Stay short, warm, polished, and family-safe. WhatsApp-style.",
  "Do not claim Grok is live unless Vercel logs show [grok] + HTTP 200",
  "or Make shows webhook → xAI → WhatsApp.",
  "Never request or repeat API keys, tokens, or webhook URLs.",
].join(" ");

function getApiKey() {
  return process.env.XAI_API_KEY || "";
}

function isGrokConfigured() {
  return Boolean(getApiKey());
}

async function createChatCompletion({
  userMessage,
  systemPrompt = DEFAULT_SYSTEM_PROMPT,
  model = PRIMARY_MODEL,
  timeoutMs = 20000,
} = {}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    const err = new Error("XAI_API_KEY missing — Ready to Configure, not live yet.");
    err.code = "GROK_NOT_CONFIGURED";
    throw err;
  }
  if (!userMessage || typeof userMessage !== "string") {
    const err = new Error("userMessage is required");
    err.code = "GROK_BAD_INPUT";
    throw err;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const body = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.6,
  };

  try {
    const res = await fetch(XAI_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      const err = new Error(`xAI HTTP ${res.status}`);
      err.code = "GROK_HTTP";
      err.status = res.status;
      err.detail = detail.slice(0, 300);
      throw err;
    }

    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content;
    if (!content) {
      const err = new Error("Empty Grok completion");
      err.code = "GROK_EMPTY";
      throw err;
    }

    console.log("[grok] completion");
    return { content, model, raw: json };
  } finally {
    clearTimeout(timer);
  }
}

async function completeWithFallback(options) {
  try {
    return await createChatCompletion({ ...options, model: PRIMARY_MODEL });
  } catch (err) {
    if (err.code === "GROK_NOT_CONFIGURED" || err.code === "GROK_BAD_INPUT") {
      throw err;
    }
    console.warn("[grok] primary failed, trying fallback", err.status || err.code);
    return createChatCompletion({ ...options, model: FALLBACK_MODEL });
  }
}

async function forwardToMake(payload) {
  const url = process.env.MAKE_WEBHOOK_URL;
  if (!url) return { forwarded: false, reason: "MAKE_WEBHOOK_URL not set" };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "orgsuite-vercel-webhook",
      event: "whatsapp_inbound",
      payload,
    }),
  });

  return { forwarded: res.ok, status: res.status };
}

module.exports = {
  isGrokConfigured,
  createChatCompletion,
  completeWithFallback,
  forwardToMake,
  DEFAULT_SYSTEM_PROMPT,
  PRIMARY_MODEL,
  FALLBACK_MODEL,
};
