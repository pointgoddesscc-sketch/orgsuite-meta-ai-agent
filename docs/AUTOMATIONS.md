# OrgSuite Make automations

Live bridge is Harmony, not a second copy of the route:

https://harmony-ai-spotify-agent.vercel.app/api/make-event

Owner steps:

1. Make → Custom webhook `OrgSuite-Grok-In`
2. Vercel project `harmony-ai-spotify-agent` env `MAKE_HARMONY_WEBHOOK_URL`
3. Redeploy
4. GET the route until `status` is `ready`

See also `make/MAKE.md` in this repo.
