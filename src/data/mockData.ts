export const activityFeed = [
  {
    id: '1',
    description: 'Validated findings for Climate Impact task',
    user: 'Avery Chen',
    workspace: 'Atlas Research',
    workspaceId: 'atlas',
    timestamp: '5m ago',
    type: 'validation'
  },
  {
    id: '2',
    description: 'Workflow "Market Pulse" started',
    user: 'Workflow Engine',
    workspace: 'Nova Labs',
    workspaceId: 'nova',
    timestamp: '12m ago',
    type: 'workflow'
  },
  {
    id: '3',
    description: 'New knowledge article on Synthetic Data Patterns',
    user: 'Samira Patel',
    workspace: 'Atlas Research',
    workspaceId: 'atlas',
    timestamp: '35m ago',
    type: 'knowledge'
  },
  {
    id: '4',
    description: 'Completed validation for Global Risk Radar',
    user: 'Priya Kumar',
    workspace: 'Civic Lens',
    workspaceId: 'civic',
    timestamp: '1h ago',
    type: 'validation'
  },
  {
    id: '5',
    description: 'Workspace invite accepted by new analyst',
    user: 'System',
    workspace: 'Atlas Research',
    workspaceId: 'atlas',
    timestamp: '2h ago',
    type: 'workspace'
  },
  {
    id: '6',
    description: 'Workflow "Supply Chain Sentinel" published',
    user: 'Nova Liang',
    workspace: 'Nova Labs',
    workspaceId: 'nova',
    timestamp: '3h ago',
    type: 'workflow'
  }
];

export const quickActions = [
  {
    label: 'Create New Task',
    to: '/tasks/create',
    accent: 'primary',
    description: 'Capture a new objective or follow-up item and assign an owner.'
  },
  {
    label: 'Create New Workflow',
    to: '/workflow-designer',
    accent: 'secondary',
    description: 'Design an automation with triggers, approvals, and runbooks.'
  },
  {
    label: 'Create New Workspace',
    to: '/workspaces',
    accent: 'primary',
    description: 'Spin up a dedicated collaboration space with members and goals.'
  },
  {
    label: 'Browse Knowledge Base',
    to: '/knowledge',
    accent: 'secondary',
    description: 'Search best practices, runbooks, and previous research drops.'
  }
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
    iconKey: 'network',
    color: '#4f46e5',
    members: 32,
    activeTasks: 8,
    workflows: 11,
    lastActivity: '2 hours ago',
    lastActivityMinutes: 120,
    privacy: 'Private',
    role: 'Owner',
    domain: 'Policy & Strategy',
    membersList: [
      { name: 'Nova Liang', role: 'Lead Researcher' },
      { name: 'Avery Chen', role: 'Analyst' },
      { name: 'Priya Kumar', role: 'Program Manager' }
    ]
  },
  {
    id: 'nova',
    name: 'Nova Labs',
    description: 'Emerging technology explorations with rapid prototyping.',
    iconKey: 'sparkles',
    color: '#0ea5e9',
    members: 14,
    activeTasks: 5,
    workflows: 4,
    lastActivity: '34 minutes ago',
    lastActivityMinutes: 34,
    privacy: 'Private',
    role: 'Editor',
    domain: 'Emerging Tech',
    membersList: [
      { name: 'Mina Alvarado', role: 'Tech Lead' },
      { name: 'Samira Patel', role: 'Researcher' },
      { name: 'Alex Rivers', role: 'Reviewer' }
    ]
  },
  {
    id: 'civic',
    name: 'Civic Lens',
    description: 'Policy tracking and civic analysis for regulatory shifts.',
    icon: '🏛️',
    color: '#f59e0b',
    members: 22,
    activeTasks: 6,
    workflows: 7,
    lastActivity: '1 day ago',
    lastActivityMinutes: 1440,
    privacy: 'Public',
    role: 'Viewer',
    domain: 'Civic Intelligence',
    membersList: [
      { name: 'Jon Reyes', role: 'Policy Lead' },
      { name: 'Lina Ortega', role: 'Researcher' },
      { name: 'Shawn Lee', role: 'Contributor' }
    ]
  },
  {
    id: 'aurora',
    name: 'Aurora Signal',
    description: 'Signal monitoring for geopolitical and supply chain health.',
    icon: '🌌',
    color: '#8b5cf6',
    members: 18,
    activeTasks: 9,
    workflows: 10,
    lastActivity: '48 minutes ago',
    lastActivityMinutes: 48,
    privacy: 'Private',
    role: 'Editor',
    domain: 'Signals',
    membersList: [
      { name: 'Dana Wood', role: 'Signal Analyst' },
      { name: 'Igor Mendez', role: 'Data Engineer' },
      { name: 'Rei Nakamura', role: 'Reviewer' }
    ]
  },
  {
    id: 'horizon',
    name: 'Horizon Forge',
    description: 'Experimentation workspace for automation and workflow R&D.',
    icon: '🛠️',
    color: '#22c55e',
    members: 9,
    activeTasks: 3,
    workflows: 5,
    lastActivity: '5 hours ago',
    lastActivityMinutes: 300,
    privacy: 'Public',
    role: 'Viewer',
    domain: 'Automation',
    membersList: [
      { name: 'Gio Park', role: 'Automation Lead' },
      { name: 'Mika Ito', role: 'Engineer' },
      { name: 'Ash Adams', role: 'Researcher' }
    ]
  }
];

export const workspaceTemplates = [
  {
    id: 'research-lab',
    name: 'Research Lab',
    description: 'Hypothesis boards, literature reviews, and validation workflows.',
    icon: '🔬',
    color: '#4f46e5'
  },
  {
    id: 'policy-tracker',
    name: 'Policy Tracker',
    description: 'Monitor regulatory change and stakeholder impacts by region.',
    icon: '📑',
    color: '#f59e0b'
  },
  {
    id: 'delivery-hub',
    name: 'Delivery Hub',
    description: 'Launch plans, milestones, and go-to-market tasks.',
    icon: '🚀',
    color: '#0ea5e9'
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
