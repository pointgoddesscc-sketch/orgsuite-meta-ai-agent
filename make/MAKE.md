# OrgSuite + Make.com

Status labels: Connected · Completed · Available · Ready to Configure · Proposed · Requires Authorization.

## Owner-provided Make identifiers (not a session)

| Field | Value | Status |
|---|---|---|
| Zone | `us2.make.com` | **Available** (from owner URL) |
| Organization id | `8644501` | **Available** (from owner URL) |
| Dashboard | https://us2.make.com/organization/8644501/ | **Requires Authorization** — unauthenticated GET returned 404 `Cannot GET /organization/8644501/` |
| GitHub identity | `pointgoddesscc-sketch` | **Connected** |
| Make website login via GitHub | — | **Not available** |
| Make MCP from this Grok chat | https://mcp.make.com | **Requires Authorization** (HTTP 401) |

GitHub OAuth here is not Make SSO. Official Make login shows **Continue with Google** and **Continue with SSO** only.

## Owner login (one time)

1. Open https://www.make.com/en/login
2. Continue with Google as `pointgoddesscc@gmail.com`
3. You should land in zone `us2` org `8644501`
4. Create custom webhook `OrgSuite-Grok-In`
5. Store the hook URL only as Vercel env + GitHub Actions secret `MAKE_WEBHOOK_URL`
6. Turn the scenario ON and set scheduling to on-demand

Do not commit the hook URL.
