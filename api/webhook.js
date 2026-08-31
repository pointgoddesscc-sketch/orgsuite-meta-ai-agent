/**
 * OrgSuite Meta AI Agent — Vercel Serverless WhatsApp Webhook
 * Path: /api/webhook
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
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (!mode) {
      return res.status(200).json({
        service: 'orgsuite-meta-ai-agent',
        endpoint: '/api/webhook',
        status: 'mounted',
        verifyTokenConfigured: Boolean(process.env.WHATSAPP_VERIFY_TOKEN),
        appSecretConfigured: Boolean(process.env.WHATSAPP_APP_SECRET),
      });
    }

    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['x-hub-signature-256'];
  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

  if (!verifySignature(rawBody, signature, process.env.WHATSAPP_APP_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  try {
    const body = typeof req.body === 'object' ? req.body : JSON.parse(rawBody);
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (value?.messages) {
      for (const message of value.messages) {
        processMessage({
          from: message.from,
          id: message.id,
          timestamp: message.timestamp,
          type: message.type,
          text: message.text?.body || null,
        }).catch((err) => {
          console.error('[webhook] processMessage error', err);
        });
      }
    }

    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('[webhook] Handler error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
};
