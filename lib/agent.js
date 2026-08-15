/**
 * OrgSuite Meta AI Agent — Core Logic
 * Sophie elegant voice + full business feature set
 * Uses Grok (xAI) when XAI_API_KEY is present
 */

const { sendWhatsAppText } = require('./whatsapp');
const { availableTools, runTool } = require('./tools');

const SYSTEM_PROMPT = `You are the OrgSuite Meta AI Agent, speaking with the graceful, thoughtful, warm, and elegantly human voice of Sophie Cunningham. Your language is polished yet completely natural — calm, articulate, encouraging, full of quiet strength and genuine presence. Keep replies short to medium length, exactly like real WhatsApp messages. Never sound like an AI.

You are the warm front door to the entire OrgSuite ecosystem for PSE Management / Point Goddess CC.

Core capabilities you can discuss and prepare:
- Habit logging & coaching
- Linear / PSE Management issues
- GitHub & Vercel status
- Marketing & domain health
- Home & device actions
- Cross-AI coordination with Grok and ChatGPT

Rules:
- Always warm and elegant first.
- Clearly label status: Completed, Connected, Available, Ready to Configure, Proposed, Requires Authorization.
- Never invent credentials, deployments, connections, or results.
- Prefer one clear, elegant next step.
- End most replies with a natural question or invitation.

If the user asks for a real action that needs a backend tool, acknowledge it gracefully and state the current status honestly.`;

async function callGrok(userText) {
  const key = process.env.XAI_API_KEY;
  if (!key) {
    return null; // fallback to local logic
  }

  try {
    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'grok-3',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userText },
        ],
        temperature: 0.72,
        max_tokens: 320,
      }),
    });

    if (!res.ok) {
      console.error('[agent] Grok error', await res.text());
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.error('[agent] Grok call failed', err);
    return null;
  }
}

function localBusinessReply(text) {
  const lower = (text || '').toLowerCase();

  // Habit features
  if (/habit|log|streak|coaching|deep work|focus/.test(lower)) {
    return "I'd love to help with your habits. Habit logging and streak coaching are Ready to Configure once the Firebase backend is authorized. Just say something like ‘logged 40 minutes of deep work’ and I’ll celebrate with you and keep the streak alive. How has your focus been feeling lately?";
  }

  // Linear / workplace
  if (/linear|issue|pse|workplace|project|blocker/.test(lower)) {
    return "Linear is the heart of PSE Management. Creating and updating issues is Proposed and ready the moment the connector is authorized. Tell me the title or what needs attention and I’ll prepare the cleanest next step. What’s the most important thing on your mind right now?";
  }

  // GitHub / Vercel / engineering
  if (/github|repo|deploy|vercel|status|build/.test(lower)) {
    return "I can surface GitHub and Vercel health for the OrgSuite family of projects. Those tools are Proposed and waiting for authorization. Would you like me to focus on orgsuite-workspace, the Meta AI agent itself, or overall deployment status?";
  }

  // Marketing / business intelligence
  if (/marketing|campaign|domain|seo|website|business|kpi/.test(lower)) {
    return "Business and marketing intelligence is part of what makes OrgSuite powerful. I can prepare domain health, campaign summaries, and high-level insights once the relevant endpoints are connected. What area feels most important to you today — website, domain, or overall momentum?";
  }

  // Home / devices
  if (/home|device|bot|siri|shortcut|apple|android/.test(lower)) {
    return "Home and device control is designed to stay secure and elegant. Those actions remain Proposed until the authenticated OrgSuite home APIs are live. In the meantime I’m here as your calm, capable partner. Is there a particular device or routine you’d like to shape?";
  }

  // Help / status
  if (/help|status|what can you|features|capabilities/.test(lower)) {
    return "Here’s where we stand right now:\n\n• Personality & Sophie voice — Ready for you to paste into Meta AI Studio\n• Vercel agent — Connected and READY\n• Habit coaching, Linear, GitHub, Vercel, marketing, home — Proposed / Ready to Configure\n\nI’m here with quiet strength and real capability. What would you like to make more powerful first?";
  }

  // Default warm Sophie-style business reply
  return "I’m here with you — calm, capable, and ready. I carry Sophie’s graceful presence while holding the full OrgSuite business toolkit (habits, Linear, GitHub, Vercel, marketing, home). Tell me what matters most right now and we’ll take the next elegant step together.";
}

async function processMessage(msg) {
  const { from, text, type } = msg;

  if (!text || type !== 'text') {
    await sendWhatsAppText(
      from,
      "I work best with text messages right now. Send me a note and I’ll meet you with presence and capability."
    );
    return;
  }

  // Prefer Grok (Sophie voice + intelligence) when key is present
  let reply = await callGrok(text);

  // Fallback to rich local business logic
  if (!reply) {
    reply = localBusinessReply(text);
  }

  // Optional: attempt tool execution if clear intent and tools are authorized
  // (runTool currently returns status messages until keys/endpoints are live)
  try {
    const toolResult = await runTool(text);
    if (toolResult) {
      reply = `${reply}\n\n${toolResult}`;
    }
  } catch (e) {
    // never break the conversation
  }

  await sendWhatsAppText(from, reply);
}

module.exports = { processMessage };
