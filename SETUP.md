# OrgSuite Meta AI Agent — Setup Guide

Linked AI Studio profile (separate from Cloud API):
https://wa.me/ais/867051314767696?s=5

Make.com cannot create a Meta App ID or subscribe a WhatsApp webhook. Those steps stay on developers.facebook.com.

## 1. Personality (optional)
Paste `prompts/meta-ai-studio-personality.md` into Meta AI Studio for AI `867051314767696`.

## 2. Vercel environment variables
Project settings → Environment Variables. Do not commit values.

- `WHATSAPP_VERIFY_TOKEN`
- `WHATSAPP_APP_SECRET`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `XAI_API_KEY` (optional Grok replies)
- `MAKE_WEBHOOK_URL` (optional forward only)

Redeploy after saving.

## 3. Meta Developer webhook
Callback URL:
`https://orgsuite-meta-ai-agent.vercel.app/api/webhook`

Use the same verify token stored in Vercel. Subscribe to `messages`.

## Status after this repo update
- Public status page and `/api/health`: Completed on next production deploy
- Cloud API send/receive: Requires Authorization
