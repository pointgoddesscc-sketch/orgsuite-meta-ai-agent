# OrgSuite Meta AI Agent — Setup Guide

**Sophie elegant voice + full business feature set**

Linked AI: https://wa.me/ais/867051314767696?s=5

---

## 1. Upgrade Personality (Sophie Voice + Business Power)

Open WhatsApp → Meta AI → Discover AIs → edit AI ID `867051314767696`.

Paste the full content from:
`prompts/meta-ai-studio-personality.md`

This gives the AI:
- Sophie Cunningham’s graceful, warm, elegant voice
- Short natural WhatsApp-style replies
- Full business capabilities (habits, Linear, GitHub, Vercel, marketing, home)
- Honest status labeling

---

## 2. Vercel Environment Variables

Project: https://vercel.com/pse-sent/orgsuite-meta-ai-agent/settings/environment-variables

| Name | Value |
|------|-------|
| `WHATSAPP_VERIFY_TOKEN` | `465f8a7a5cbfc96a54dd2f7752a23f91c05f152691015dbd` |
| `WHATSAPP_APP_SECRET` | From Meta App Settings |
| `WHATSAPP_ACCESS_TOKEN` | Long-lived WhatsApp token |
| `WHATSAPP_PHONE_NUMBER_ID` | Your Phone Number ID |
| `XAI_API_KEY` | Recommended for Sophie-voice Grok replies |

Redeploy after saving.

---

## 3. Meta Developer Console Webhook

Callback URL:
`https://orgsuite-meta-ai-agent.vercel.app/api/webhook`

Verify Token:
`465f8a7a5cbfc96a54dd2f7752a23f91c05f152691015dbd`

Subscribe to `messages`.

---

## Current Live Status

- Code & Sophie + business features: **Completed**
- Vercel deployment: **READY**
- Personality paste + env vars + webhook: **Requires Authorization** (only you can complete these three steps)

Once those three are done, the agent is fully operational with elegant Sophie voice and rich business capabilities.
