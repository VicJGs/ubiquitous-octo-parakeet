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
    lastUpdated: '2 days ago',
    publishedOn: '2024-03-04',
    type: 'Brief',
    pinned: true,
    readingTime: '7 min'
  },
  {
    id: 'kb-2',
    title: 'Synthetic Data Patterns',
    author: 'Samira Patel',
    excerpt: 'Guide to selecting synthesis approaches per dataset.',
    views: 185,
    category: 'Data',
    tags: ['synthetic-data', 'tooling'],
    lastUpdated: '5 days ago',
    publishedOn: '2024-02-28',
    type: 'Guide',
    pinned: false,
    readingTime: '12 min'
  },
  {
    id: 'kb-3',
    title: 'Human-AI Collaboration Patterns',
    author: 'Nova Liang',
    excerpt: 'How to structure review loops and oversight for mixed teams.',
    views: 122,
    category: 'Delivery',
    tags: ['process', 'oversight'],
    lastUpdated: '1 day ago',
    publishedOn: '2024-03-05',
    type: 'Playbook',
    pinned: true,
    readingTime: '9 min'
  },
  {
    id: 'kb-4',
    title: 'Prompt Evaluation Checklist',
    author: 'Avery Chen',
    excerpt: 'Repeatable checklist for measuring prompt quality and safety.',
    views: 98,
    category: 'Quality',
    tags: ['evaluation', 'templates'],
    lastUpdated: '4 hours ago',
    publishedOn: '2024-03-07',
    type: 'Checklist',
    pinned: false,
    readingTime: '6 min'
  }
];

export const knowledgeCategories = [
  {
    name: 'Policy & Risk',
    color: '#f59e0b',
    description: 'Governance, regulatory watch, and risk mitigation patterns.'
  },
  {
    name: 'Data & Tooling',
    color: '#0ea5e9',
    description: 'Data management, pipelines, synthesis, and evaluation.'
  },
  {
    name: 'Delivery',
    color: '#4f46e5',
    description: 'Operating rhythms, service playbooks, and handoffs.'
  },
  {
    name: 'Quality & Safety',
    color: '#10b981',
    description: 'Assurance checklists, QA recipes, and red-team playbooks.'
  }
];

export const knowledgeStats = [
  { label: 'Total articles', value: '284', delta: '+12 this week' },
  { label: 'Pinned for workspace', value: '8', delta: 'Curated by leads' },
  { label: 'Average freshness', value: '9.2 days', delta: '↑ 1.1 since Feb' },
  { label: 'Contributors', value: '37', delta: '5 active this week' }
];

export const topContributors = [
  { name: 'Nova Liang', articles: 14, avatar: 'https://i.pravatar.cc/80?img=12', specialty: 'Delivery Ops' },
  { name: 'Samira Patel', articles: 11, avatar: 'https://i.pravatar.cc/80?img=6', specialty: 'Data systems' },
  { name: 'Mina Alvarado', articles: 9, avatar: 'https://i.pravatar.cc/80?img=32', specialty: 'Policy & Risk' }
];

export const knowledgeActivity = [
  {
    id: 'ka-1',
    actor: 'Automation Bot',
    action: 'exported',
    target: 'AI Policy Landscape 2024',
    time: '3m ago',
    category: 'Export'
  },
  {
    id: 'ka-2',
    actor: 'Nova Liang',
    action: 'commented on',
    target: 'Human-AI Collaboration Patterns',
    time: '24m ago',
    category: 'Collaboration'
  },
  {
    id: 'ka-3',
    actor: 'Mina Alvarado',
    action: 'scheduled publication for',
    target: 'Prompt Evaluation Checklist',
    time: '1h ago',
    category: 'Publishing'
  }
];
