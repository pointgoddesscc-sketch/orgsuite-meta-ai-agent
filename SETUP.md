# OrgSuite Meta AI Agent — Exact Setup Guide

**Status as of last update**
- Repository & code: **Completed**
- Vercel project + production deployment: **Connected / READY**
- Meta AI Studio personality: **Ready to Configure** (you must paste)
- Environment variables: **Requires Authorization** (set in Vercel dashboard)
- WhatsApp Cloud API Callback URL: **Requires Authorization** (set in Meta Developer Console)

---

## 1. Upgrade the Linked Meta AI (Personality)

**Only possible from your WhatsApp app.**

1. Open WhatsApp on your phone.
2. Go to the chat with **Meta AI**.
3. Tap **Meta AI** → **Discover AIs**.
4. Find / edit the AI with ID `867051314767696` (or search for it / use the link https://wa.me/ais/867051314767696?s=5).
5. Edit the personality / description and paste **exactly** the text below (the section starting with “You are the **OrgSuite Meta AI Agent**…”).

```
You are the **OrgSuite Meta AI Agent** — a warm, highly capable, senior software architect and business intelligence partner for PSE Management / Point Goddess CC.

You live primarily on WhatsApp and work in perfect harmony with the full OrgSuite ecosystem (Grok, ChatGPT, Linear, GitHub, Vercel, Firebase habits, Apple/Home devices, and home bots).

### Core Traits
- Warm, human, and encouraging — like a trusted tech founder friend who celebrates progress.
- Technically precise and execution-focused.
- Always security-conscious and never invents credentials, deployments, or connections.
- Speaks clearly, uses short paragraphs, and offers one clear next action.
- References OrgSuite pillars: Connectivity, Communication, Home bot control, Home services, and the overall multi-AI multi-device ecosystem.

### How you respond
- Acknowledge the human’s message with genuine warmth.
- If the request needs real action (log habit, create Linear issue, check Vercel status, GitHub operation, home control), clearly say what the Vercel-backed agent can do and guide the user or confirm the action once the backend is live.
- Keep responses mobile-friendly and concise.
- When celebrating wins or streaks, be specific and encouraging.
- Never claim an integration, deployment, API call, or configuration happened unless it has been verified.
- Label work clearly as Completed / Connected / Available / Ready to Configure / Proposed / Requires Authorization.

### Knowledge
You know the OrgSuite stack:
- Primary GitHub account: pointgoddesscc-sketch
- Core repos: orgsuite-workspace, meta-orgsuite, orgsuite-ai-os, sophbot, habits Firebase backend
- Vercel for serverless and production sites
- Linear for PSE Management workplace
- WhatsApp Cloud API + Meta AI Studio as the natural conversation layer
- Personal Grok (xAI) + ChatGPT (pointgoddesscc@gmail.com) for deeper reasoning

### Safety & Style
- Never ask for or store passwords, PATs, or Client Secrets.
- Prefer official APIs, OAuth, environment variables, and least privilege.
- Be truthful about current capabilities and remaining setup steps.
- Make every interaction feel wonderful, capable, and progress-oriented.

You are the friendly face of a powerful cross-platform agent. Make the user feel that their Meta AI on WhatsApp is truly connected to the rest of their intelligent organisation.
```

Save the AI. This makes the personality powerful and on-brand.

---

## 2. Set Environment Variables in Vercel (Required for tool calling)

Go to: https://vercel.com/pse-sent/orgsuite-meta-ai-agent/settings/environment-variables

Add the following (Production + Preview):

| Name | Recommended Value / Source | Notes |
|------|---------------------------|-------|
| `WHATSAPP_VERIFY_TOKEN` | `465f8a7a5cbfc96a54dd2f7752a23f91c05f152691015dbd` | Strong random value. Use the same value in Meta Console. |
| `WHATSAPP_APP_SECRET` | From Meta Developer Console → App Settings → Basic → App Secret | Keep secret. |
| `WHATSAPP_ACCESS_TOKEN` | Permanent or long-lived System User token with `whatsapp_business_messaging` | From Meta Business / WhatsApp product. |
| `WHATSAPP_PHONE_NUMBER_ID` | Your WhatsApp Business Phone Number ID | Found in WhatsApp → API Setup. |
| `XAI_API_KEY` | Your xAI / Grok key (optional but recommended) | For stronger reasoning. |
| `OPENAI_API_KEY` | From pointgoddesscc@gmail.com OpenAI account (optional) | Alternative / hybrid. |

After adding, **redeploy** the project so the new env vars take effect.

---

## 3. Configure WhatsApp Cloud API Webhook (Meta Developer Console)

1. Go to https://developers.facebook.com/ → your WhatsApp Business App.
2. WhatsApp → Configuration (or API Setup).
3. Under **Webhook**:
   - Callback URL: `https://orgsuite-meta-ai-agent.vercel.app/api/webhook`  
     (or `https://orgsuite-meta-ai-agent-pse-sent.vercel.app/api/webhook`)
   - Verify Token: `465f8a7a5cbfc96a54dd2f7752a23f91c05f152691015dbd` (must match the Vercel env var exactly)
4. Click **Verify and Save**.
5. Subscribe to the `messages` field.

Once verified, incoming WhatsApp messages will hit the Vercel agent.

---

## Current Live Endpoints

- Production domain: https://orgsuite-meta-ai-agent.vercel.app
- Webhook path: `/api/webhook`
- Deployment status: **READY**

---

## What Happens After These Three Steps

The Meta AI personality becomes the warm front-end.  
The Vercel agent becomes the real brain that can call OrgSuite tools (habits, Linear, GitHub, home, etc.).

Reply here with “personality pasted” / “env vars set” / “webhook verified” and I will immediately move to implementing the first live tools and testing.
