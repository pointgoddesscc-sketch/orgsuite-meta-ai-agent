/**
 * OrgSuite Meta AI Agent — Business Tool Catalog
 * Sophie voice + powerful operational features
 */

const availableTools = [
  {
    name: 'log_habit',
    description: 'Log a habit entry and update streaks',
    status: 'Proposed',
    keywords: ['habit', 'log', 'streak', 'deep work', 'focus'],
  },
  {
    name: 'habit_coaching',
    description: 'Provide warm streak insights and next micro-action',
    status: 'Proposed',
    keywords: ['coaching', 'streak', 'progress'],
  },
  {
    name: 'create_linear_issue',
    description: 'Create an issue in PSE Management Linear workspace',
    status: 'Proposed',
    keywords: ['linear', 'issue', 'pse', 'create'],
  },
  {
    name: 'linear_status',
    description: 'Summarize open issues or project health',
    status: 'Proposed',
    keywords: ['linear', 'status', 'blocker', 'project'],
  },
  {
    name: 'github_repo_status',
    description: 'Status of key OrgSuite repositories',
    status: 'Proposed',
    keywords: ['github', 'repo', 'orgsuite-workspace'],
  },
  {
    name: 'vercel_deployment_health',
    description: 'Check recent Vercel deployments',
    status: 'Proposed',
    keywords: ['vercel', 'deploy', 'build', 'status'],
  },
  {
    name: 'marketing_summary',
    description: 'High-level marketing / website / domain insights',
    status: 'Proposed',
    keywords: ['marketing', 'campaign', 'domain', 'website', 'seo'],
  },
  {
    name: 'home_service_action',
    description: 'Authenticated home bot or device action',
    status: 'Proposed',
    keywords: ['home', 'device', 'bot', 'siri', 'shortcut'],
  },
];

/**
 * Simple intent matcher that returns a graceful status message.
 * Real execution will be added once the corresponding secrets and endpoints are authorized.
 */
async function runTool(text) {
  if (!text) return null;
  const lower = text.toLowerCase();

  for (const tool of availableTools) {
    if (tool.keywords.some((k) => lower.includes(k))) {
      return `• ${tool.name}: currently **${tool.status}**. Once authorized I can execute this cleanly and report back with elegance.`;
    }
  }
  return null;
}

module.exports = { availableTools, runTool };
