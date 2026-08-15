/**
 * OrgSuite Meta AI Agent — Core Agent Logic
 *
 * This module receives verified WhatsApp messages, decides whether to
 * call OrgSuite tools, and sends a warm, accurate reply.
 *
 * Extend with real LLM tool-calling (xAI Grok or OpenAI) once API keys
 * are present in Vercel environment variables.
 */

const { sendWhatsAppText } = require('./whatsapp');
const { availableTools } = require('./tools');

async function processMessage(msg) {
  const { from, text, type } = msg;

  if (!text || type !== 'text') {
    // Future: handle interactive buttons, voice, images
    await sendWhatsAppText(from, "I currently process text messages best. Send me a text and I'll help with OrgSuite actions.");
    return;
  }

  // Simple keyword routing for now (replace with full LLM + tools later)
  const lower = text.toLowerCase();

  let reply = "I'm your OrgSuite Meta AI Agent on WhatsApp. I can help with habits, Linear, GitHub status, and more once the full tool layer is authorized.\n\nTell me what you'd like to do.";

  if (lower.includes('habit') || lower.includes('log') || lower.includes('streak')) {
    reply = "Habit logging is ready to connect via the Firebase backend. Once authorized, just say 'logged 45 min deep work' and I'll update your streak and reply with coaching.";
  } else if (lower.includes('linear') || lower.includes('issue') || lower.includes('pse')) {
    reply = "Linear workplace integration is designed. I can create or update PSE Management issues once the connector is live.";
  } else if (lower.includes('github') || lower.includes('repo') || lower.includes('deploy')) {
    reply = "GitHub and Vercel status tools are planned. I can report on orgsuite-workspace, deployments, and more after authorization.";
  } else if (lower.includes('status') || lower.includes('help')) {
    reply = "Current status:\n• Personality: Live on this Meta AI\n• Webhook: Ready to configure on Vercel\n• Tools: Proposed (habits, Linear, GitHub, home)\n\nWhat would you like to make powerful next?";
  }

  await sendWhatsAppText(from, reply);
}

module.exports = { processMessage };
