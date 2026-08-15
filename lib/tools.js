/**
 * OrgSuite Tool Catalog
 *
 * Each tool will be implemented as a secure callable once the corresponding
 * backend (Firebase, Linear API, GitHub connector, etc.) is authorized.
 *
 * Design principle: least privilege, validated inputs, audit logging.
 */

const availableTools = [
  {
    name: 'log_habit',
    description: 'Log a habit entry and update streaks via Firebase',
    status: 'Proposed',
    requires: ['Firebase Cloud Functions logHabit endpoint']
  },
  {
    name: 'get_habit_streaks',
    description: 'Return current habit streaks and insights',
    status: 'Proposed',
    requires: ['Firebase']
  },
  {
    name: 'create_linear_issue',
    description: 'Create an issue in PSE Management Linear workspace',
    status: 'Proposed',
    requires: ['Linear API key or OAuth']
  },
  {
    name: 'github_repo_status',
    description: 'Get status of key OrgSuite repositories',
    status: 'Proposed',
    requires: ['GitHub connector or token with minimal scopes']
  },
  {
    name: 'vercel_deployment_health',
    description: 'Check recent Vercel deployments for OrgSuite projects',
    status: 'Proposed',
    requires: ['Vercel API token']
  },
  {
    name: 'home_service_action',
    description: 'Trigger authenticated home bot or service action',
    status: 'Proposed',
    requires: ['OrgSuite home API with proper auth']
  }
];

module.exports = { availableTools };
