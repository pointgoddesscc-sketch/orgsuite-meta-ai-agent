module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const flags = {
    WHATSAPP_VERIFY_TOKEN: Boolean(process.env.WHATSAPP_VERIFY_TOKEN),
    WHATSAPP_APP_SECRET: Boolean(process.env.WHATSAPP_APP_SECRET),
    WHATSAPP_ACCESS_TOKEN: Boolean(process.env.WHATSAPP_ACCESS_TOKEN),
    WHATSAPP_PHONE_NUMBER_ID: Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID),
    XAI_API_KEY: Boolean(process.env.XAI_API_KEY),
    MAKE_WEBHOOK_URL: Boolean(process.env.MAKE_WEBHOOK_URL),
  };

  const ready = flags.WHATSAPP_VERIFY_TOKEN && flags.WHATSAPP_APP_SECRET;
  const sendReady = flags.WHATSAPP_ACCESS_TOKEN && flags.WHATSAPP_PHONE_NUMBER_ID;

  return res.status(200).json({
    service: 'orgsuite-meta-ai-agent',
    status: ready && sendReady ? 'Connected' : 'Ready to Configure',
    webhook: '/api/webhook',
    configured: flags,
    note: 'Values are never returned. Meta App Review and Cloud API tokens require owner Facebook login.',
  });
};
