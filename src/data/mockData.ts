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
    lastActivity: '2 hours ago',
    tags: ['intelligence', 'research', 'policy']
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
    lastActivity: '34 minutes ago',
    tags: ['technology', 'prototyping', 'ai']
  },
  {
    id: 'civic',
    name: 'Civic Lens',
    description: 'Policy tracking, stakeholder updates, and decision briefs.',
    icon: '🏛️',
    color: '#f97316',
    members: 21,
    activeTasks: 6,
    workflows: 7,
    lastActivity: '18 minutes ago',
    tags: ['policy', 'civic', 'briefs']
  },
  {
    id: 'riskops',
    name: 'RiskOps',
    description: 'Operational risk modeling with automated monitoring.',
    icon: '⧉',
    color: '#10b981',
    members: 17,
    activeTasks: 9,
    workflows: 12,
    lastActivity: 'Yesterday',
    tags: ['risk', 'operations', 'monitoring']
  },
  {
    id: 'datalab',
    name: 'DataLab',
    description: 'Data product R&D, evaluations, and documentation.',
    icon: '◉',
    color: '#a855f7',
    members: 11,
    activeTasks: 3,
    workflows: 5,
    lastActivity: '3 hours ago',
    tags: ['data', 'documentation', 'evaluation']
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
