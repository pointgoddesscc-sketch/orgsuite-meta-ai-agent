# The Make (Integromat) Skills Repository: What It Is, How to Install It, and How It Fits With Claude and Make MCP

OrgSuite note (2026-08-31): filed from owner paste. GitHub write is Completed. Make.com login and MAKE_WEBHOOK_URL remain Requires Authorization. This brief is knowledge only. It does not create a Make session.

## TL;DR

- The `integromat/make-skills` repo is a Claude Code plugin / Open Agent Skills package that teaches an AI coding agent how to design, configure, and deploy Make automation scenarios. Official install is the Claude Code plugin marketplace (`/plugin marketplace add integromat/make-skills` then `/plugin install make-skills@make-marketplace`).
- These skills are primarily for Claude Code / Codex / other coding agents, not one-click Claude.ai. You can upload skill zip files into Claude.ai (Customize → Skills) and add the Make MCP connector separately. Uploading skills alone does not let Claude act on a Make account.
- Make MCP is a built-in Claude connector at `https://mcp.make.com` (OAuth). Scenario-run tools work on Make Free. Management tools that create or modify scenarios require a paid Make plan.
- Make Free constraints: 1,000 credits/month, maximum 2 active scenarios, 15-minute minimum interval, 1 MB storage = 1 data store.

## Key Findings

1. Repository skills: `make-scenario-building`, `make-module-configuring`, `make-mcp-reference`, `make-api-shell-connection-workflow` (plus E2B in current dist).
2. Official install = Claude Code plugin marketplace.
3. Claude.ai support is partial: zip upload for skills, directory connector for MCP. `/plugin` is Claude Code only.
4. Verify skills in Customize → Skills. Verify MCP in Customize → Connectors (claude.ai) or `/mcp` (Claude Code).
5. OAuth scopes: "Run your scenarios" (all plans) vs "View and modify…" (paid Make). Token scope `mcp:use` is run-only.
6. Free-plan limits block AI-driven scenario *building* via management MCP tools.

## Surfaces

| Surface | Skills | Make MCP |
|---|---|---|
| Claude Code | `/plugin marketplace add integromat/make-skills` | `/mcp` OAuth to https://mcp.make.com |
| claude.ai | Customize → Skills → upload dist zips, toggle on | Customize → Connectors → Browse → Make |
| Grok Build | `npx skills add integromat/make-skills` already run | Not connected (MCP 401, no Make connector) |
| GitHub Actions | `make-ping.yml` ready | Needs secret MAKE_WEBHOOK_URL |

## First OrgSuite scenario (when owner is in Make)

Webhook `OrgSuite-Grok-In` → Gmail to pointgoddesscc@gmail.com. Active + on-demand. Do not use polling on Free. Do not add WhatsApp until Cloud API env flags are true.

## Owner remaining steps

1. make.com/en/login → Continue with Google as pointgoddesscc@gmail.com
2. Create webhook scenario OrgSuite-Grok-In, turn ON, on-demand
3. Save hook URL only as GitHub Actions secret and Vercel env `MAKE_WEBHOOK_URL`
4. Confirm https://orgsuite-meta-ai-agent.vercel.app/api/health shows MAKE_WEBHOOK_URL true
5. On claude.ai add Make connector if Claude should run scenarios

Full long-form research from the owner paste follows in conversation history and Linear PSE-67. Do not commit webhook URLs or tokens.
