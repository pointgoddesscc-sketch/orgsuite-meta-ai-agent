/**
 * Thin helper used by /api/webhook via lib/agent.js.
 * Does not replace WhatsApp verify / signature checks.
 */

const {
  isGrokConfigured,
  completeWithFallback,
  forwardToMake,
  DEFAULT_SYSTEM_PROMPT,
} = require("../lib/grokClient");

function extractInboundText(body) {
  const msg = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!msg) return null;
  return {
    from: msg.from,
    id: msg.id,
    text: msg.text?.body || "",
    type: msg.type,
  };
}

async function handleInboundWithGrok(whatsappBody, { systemPrompt } = {}) {
  const inbound = extractInboundText(whatsappBody);
  if (!inbound || !inbound.text) {
    return { handled: false, reason: "no inbound text" };
  }

  if (process.env.MAKE_WEBHOOK_URL) {
    try {
      await forwardToMake({
        from: inbound.from,
        id: inbound.id,
        text: inbound.text,
        type: inbound.type,
      });
    } catch (err) {
      console.warn("[grok] Make forward failed", err.message);
    }
  }

  if (!isGrokConfigured()) {
    return {
      handled: false,
      status: "Ready to Configure",
      reason: "XAI_API_KEY missing — not live yet",
      inbound,
    };
  }

  const result = await completeWithFallback({
    userMessage: inbound.text,
    systemPrompt: systemPrompt || DEFAULT_SYSTEM_PROMPT,
  });

  return {
    handled: true,
    status: "Grok completion ready",
    inbound,
    reply: result.content,
    model: result.model,
  };
}

module.exports = {
  handleInboundWithGrok,
  extractInboundText,
  isGrokConfigured,
};
