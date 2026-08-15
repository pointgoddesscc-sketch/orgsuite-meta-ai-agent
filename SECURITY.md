# Security Policy — OrgSuite Meta AI Agent

## Reporting a Vulnerability

Please report security issues privately to the repository owner (pointgoddesscc-sketch / pointgoddesscc@gmail.com).

## Design Principles

- **Never store secrets in the repository.** All tokens live in Vercel Environment Variables or Firebase Secret Manager.
- **Verify every webhook** with `X-Hub-Signature-256` using the App Secret.
- **Least privilege** for every tool and API token.
- **Input validation** before any external call.
- **No credential logging** under any circumstances.
- **Rate limiting** per WhatsApp user ID to prevent abuse.
- **Audit trail**: significant actions should be logged to Linear or Firebase for OrgSuite visibility.

## Supported Versions

This repository is actively maintained for the current production design.
