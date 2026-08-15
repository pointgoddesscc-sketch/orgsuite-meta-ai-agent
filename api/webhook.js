/**
 * OrgSuite Meta AI Agent — Vercel Serverless WhatsApp Webhook
 * Path: /api/webhook
 *
 * Security first:
 * - Verifies X-Hub-Signature-256
 * - Challenge response for Meta verification
 * - Rate-limit aware design
 * - Never exposes secrets
 *
 * Deploy on Vercel. Set all required env vars before going live.
 */

const crypto = require('crypto');
const { processMessage } = require('../lib/agent');

function verifySignature(rawBody, signature, appSecret) {
  if (!signature || !appSecret) return false;
  const expected = 'sha256=' + crypto
    .createHmac('sha256', appSecret)
    .update(rawBody)
    .digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

module.exports = async function handler(req, res) {
  // 1. Meta webhook verification challenge
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log('[webhook] Verification successful');
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  // 2. Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 3. Signature verification (critical)
  const signature = req.headers['x-hub-signature-256'];
  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

  if (!verifySignature(rawBody, signature, process.env.WHATSAPP_APP_SECRET)) {
    console.warn('[webhook] Invalid signature');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  try {
    const body = typeof req.body === 'object' ? req.body : JSON.parse(rawBody);
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (value?.messages) {
      for (const message of value.messages) {
        // Process asynchronously so Meta gets 200 quickly
        processMessage({
          from: message.from,
          id: message.id,
          timestamp: message.timestamp,
          type: message.type,
          text: message.text?.body || null,
          // extend for interactive, image, audio, etc.
        }).catch((err) => {
          console.error('[webhook] processMessage error', err);
        });
      }
    }

    // Always acknowledge quickly
    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('[webhook] Handler error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
};
