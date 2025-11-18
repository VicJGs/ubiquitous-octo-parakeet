export const activityFeed = [
  {
    id: '1',
    description: 'Validated findings for Climate Impact task',
    user: 'Avery Chen',
    workspace: 'Atlas Research',
    timestamp: '5m ago',
    type: 'validation'
  },
  {
    id: '2',
    description: 'Workflow "Market Pulse" started',
    user: 'Workflow Engine',
    workspace: 'Nova Labs',
    timestamp: '12m ago',
    type: 'workflow'
  },
  {
    id: '3',
    description: 'New knowledge article on Synthetic Data Patterns',
    user: 'Samira Patel',
    workspace: 'Atlas Research',
    timestamp: '35m ago',
    type: 'knowledge'
  }
];

export const quickActions = [
  { label: 'Create New Task', to: '/tasks/create', accent: 'primary' },
  { label: 'Create New Workflow', to: '/workflow-designer', accent: 'secondary' },
  { label: 'Create New Workspace', to: '/workspaces', accent: 'primary' },
  { label: 'Browse Knowledge Base', to: '/knowledge', accent: 'secondary' }
];

export const upcomingItems = [
  {
    id: 'u1',
    name: 'Weekly Insight Refresh',
    time: 'Today · 16:00 UTC',
    workspace: 'Atlas Research'
  },
  {
    id: 'u2',
    name: 'Policy Tracker Validation',
    time: 'Tomorrow · 09:30 UTC',
    workspace: 'Civic Lens'
  }
];

export const workspaces = [
  {
    id: 'atlas',
    name: 'Atlas Research',
    description: 'Primary research hub for strategic intelligence programs.',
    icon: '🜁',
    color: '#4f46e5',
    members: 32,
    activeTasks: 8,
    workflows: 11,
    lastActivity: '2 hours ago'
  },
  {
    id: 'nova',
    name: 'Nova Labs',
    description: 'Emerging technology explorations with rapid prototyping.',
    icon: '✦',
    color: '#0ea5e9',
    members: 14,
    activeTasks: 5,
    workflows: 4,
    lastActivity: '34 minutes ago'
  }
];

export const tasks = [
  {
    id: 'task-01',
    name: 'Supply Chain Stress Test',
    objective: 'Model cascading risks across vendor tiers and geographies.',
    status: 'Running',
    priority: 'High',
    project: 'RiskOps',
    createdDate: '2024-03-04',
    creator: 'Nova Liang',
    assignee: 'Priya Kumar'
  },
  {
    id: 'task-02',
    name: 'Synthetic Data Blueprint',
    objective: 'Document repeatable synthesis recipes per region.',
    status: 'Pending',
    priority: 'Medium',
    project: 'DataLab',
    createdDate: '2024-03-02',
    creator: 'Avery Chen',
    assignee: 'Avery Chen'
  }
];

export const knowledgeArticles = [
  {
    id: 'kb-1',
    title: 'AI Policy Landscape 2024',
    author: 'Mina Alvarado',
    excerpt: 'Breakdown of regulatory trends across major regions.',
    views: 234,
    category: 'Policy',
    tags: ['regulation', 'governance'],
    lastUpdated: '2 days ago'
  },
  {
    id: 'kb-2',
    title: 'Synthetic Data Patterns',
    author: 'Samira Patel',
    excerpt: 'Guide to selecting synthesis approaches per dataset.',
    views: 185,
    category: 'Data',
    tags: ['synthetic-data', 'tooling'],
    lastUpdated: '5 days ago'
  }
];

export const workflows = [
  {
    id: 'wf-01',
    name: 'Market Pulse Aggregator',
    workspace: 'Nova Labs',
    status: 'Published',
    owner: 'Avery Chen',
    runs: 128,
    lastRun: '2024-03-05T14:22:00Z',
    updatedAt: '2024-03-05T13:00:00Z',
    tags: ['News', 'Signals'],
    description: 'Ingests market feeds, scores signals, and posts insights to analysts.'
  },
  {
    id: 'wf-02',
    name: 'Supply Chain Stress Test',
    workspace: 'Atlas Research',
    status: 'Running',
    owner: 'Priya Kumar',
    runs: 42,
    lastRun: '2024-03-05T14:55:00Z',
    updatedAt: '2024-03-05T14:55:00Z',
    tags: ['Risk', 'Simulation'],
    description: 'Simulates cascading vendor risks across multiple geographies.'
  },
  {
    id: 'wf-03',
    name: 'Policy Tracker',
    workspace: 'Atlas Research',
    status: 'Draft',
    owner: 'Nova Liang',
    runs: 5,
    lastRun: '2024-03-04T19:10:00Z',
    updatedAt: '2024-03-04T19:10:00Z',
    tags: ['Policy', 'Monitoring'],
    description: 'Aggregates policy updates and routes to review queues.'
  },
  {
    id: 'wf-04',
    name: 'Synthetic Data Blueprint',
    workspace: 'Nova Labs',
    status: 'Published',
    owner: 'Samira Patel',
    runs: 67,
    lastRun: '2024-03-05T10:40:00Z',
    updatedAt: '2024-03-05T11:05:00Z',
    tags: ['Data', 'Automation'],
    description: 'Guides dataset synthesis with validation and approvals.'
  },
  {
    id: 'wf-05',
    name: 'Incident Comms Router',
    workspace: 'Civic Lens',
    status: 'Running',
    owner: 'Riley Ortiz',
    runs: 18,
    lastRun: '2024-03-05T15:05:00Z',
    updatedAt: '2024-03-05T15:05:00Z',
    tags: ['Alerts', 'Comms'],
    description: 'Routes validated incidents to the right responder channels.'
  }
];
