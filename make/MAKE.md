# OrgSuite + Make.com

Status labels used here: Connected · Completed · Available · Ready to Configure · Proposed · Requires Authorization.

## What GitHub login can and cannot do

| Action | Status |
|---|---|
| GitHub identity `pointgoddesscc-sketch` | **Connected** |
| Push Make blueprint + GitHub Action from this repo | **Completed** |
| Log into [make.com](https://www.make.com/en/login) as the owner | **Requires Authorization** |
| Use GitHub as Make.com website SSO | **Not available** on standard Make plans. Make SSO is Enterprise and lists Okta, Microsoft AD, Google — not GitHub. |
| GitHub *module inside* a Make scenario | **Ready to Configure** after you are already logged into Make. That is a PAT/OAuth connection *in* the scenario, not a substitute for Make login. |

Grok cannot complete Make.com login. There is no Make connector on this workspace. A GitHub session here does not open a Make session.

## Owner login (one time)

1. Open https://www.make.com/en/login with `pointgoddesscc@gmail.com` (or the account you already use).
2. Create organization / team for OrgSuite if needed.
3. New scenario → Webhooks → Custom webhook → name `OrgSuite-Grok-In`.
4. Copy the hook URL. Store it only as:
   - Vercel env `MAKE_WEBHOOK_URL`
   - GitHub Actions secret `MAKE_WEBHOOK_URL`
   Never commit the URL.
5. Import or rebuild the scenario from `make/orgsuite-live-grok-blueprint.json`.
6. Optionally add a GitHub module *after* the first green webhook run.

## After the secret exists

GitHub Action: `.github/workflows/make-ping.yml`
Manual run: Actions → OrgSuite Make ping → Run workflow.

If the secret is missing the job fails on purpose and does not invent a successful Make run.
