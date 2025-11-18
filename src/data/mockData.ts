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
    dueDate: '2024-03-12',
    creator: 'Nova Liang',
    assignee: 'Priya Kumar',
    tags: ['logistics', 'risk'],
    effort: '6h'
  },
  {
    id: 'task-02',
    name: 'Synthetic Data Blueprint',
    objective: 'Document repeatable synthesis recipes per region.',
    status: 'Pending',
    priority: 'Medium',
    project: 'DataLab',
    createdDate: '2024-03-02',
    dueDate: '2024-03-14',
    creator: 'Avery Chen',
    assignee: 'Avery Chen',
    tags: ['synthetic-data', 'governance'],
    effort: '4h'
  },
  {
    id: 'task-03',
    name: 'Climate Impact Briefing',
    objective: 'Summarize climate disclosures and mitigation levers.',
    status: 'Backlog',
    priority: 'Medium',
    project: 'Sustain',
    createdDate: '2024-02-29',
    dueDate: '2024-03-18',
    creator: 'Samira Patel',
    assignee: 'Samira Patel',
    tags: ['climate', 'reporting'],
    effort: '5h'
  },
  {
    id: 'task-04',
    name: 'Vendor Reputation Sweep',
    objective: 'Capture latest news sentiment for tier-1 vendors.',
    status: 'Blocked',
    priority: 'High',
    project: 'RiskOps',
    createdDate: '2024-03-01',
    dueDate: '2024-03-09',
    creator: 'Avery Chen',
    assignee: 'Nova Liang',
    tags: ['news', 'reputation'],
    effort: '3h'
  },
  {
    id: 'task-05',
    name: 'Market Pulse Refresh',
    objective: 'Regenerate dashboard artifacts for weekly executive review.',
    status: 'Completed',
    priority: 'Low',
    project: 'Insights',
    createdDate: '2024-02-20',
    dueDate: '2024-02-28',
    creator: 'Workflow Engine',
    assignee: 'Workflow Engine',
    tags: ['automation', 'reporting'],
    effort: '2h'
  },
  {
    id: 'task-06',
    name: 'Policy Tracker Validation',
    objective: 'Cross-check AI policy tracker entries for EU region.',
    status: 'Review',
    priority: 'Medium',
    project: 'Governance',
    createdDate: '2024-03-03',
    dueDate: '2024-03-11',
    creator: 'Mina Alvarado',
    assignee: 'Priya Kumar',
    tags: ['policy', 'validation'],
    effort: '5h'
  },
  {
    id: 'task-07',
    name: 'Data Quality Tuning',
    objective: 'Benchmark data quality checks for ingestion pipeline.',
    status: 'Running',
    priority: 'High',
    project: 'DataLab',
    createdDate: '2024-03-05',
    dueDate: '2024-03-15',
    creator: 'DataOps Bot',
    assignee: 'Avery Chen',
    tags: ['data-quality', 'pipeline'],
    effort: '7h'
  },
  {
    id: 'task-08',
    name: 'Emerging Tech Scan',
    objective: 'Track weekly signals on frontier model capabilities.',
    status: 'Pending',
    priority: 'Low',
    project: 'Nova Labs',
    createdDate: '2024-03-06',
    dueDate: '2024-03-21',
    creator: 'Nova Liang',
    assignee: 'Nova Liang',
    tags: ['emerging-tech', 'weekly'],
    effort: '3h'
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
