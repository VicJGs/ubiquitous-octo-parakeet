export type Workspace = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  members: number;
  activeTasks: number;
  workflows: number;
  lastActivity: string;
};

export type Task = {
  id: string;
  name: string;
  objective: string;
  status: 'Running' | 'Pending' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  project: string;
  createdDate: string;
  creator: string;
  assignee: string;
  workspaceId?: string;
};

export type Workflow = {
  id: string;
  name: string;
  status: 'Running' | 'Idle' | 'Scheduled';
  owner: string;
  lastRun: string;
  workspaceId: string;
};

export type KnowledgeArticle = {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  views: number;
  category: string;
  tags: string[];
  lastUpdated: string;
};

export type UserProfile = {
  id: string;
  name: string;
  role: string;
  workspace: string;
};

export type ActivityItem = {
  id: string;
  description: string;
  user: string;
  workspace: string;
  timestamp: string;
  type: 'validation' | 'workflow' | 'knowledge' | 'task';
};

export type ScheduleItem = {
  id: string;
  name: string;
  time: string;
  workspace: string;
  relatedTaskId?: string;
};

export type QuickAction = {
  label: string;
  to: string;
  accent: 'primary' | 'secondary';
};

export const mockData = {
  activityFeed: [
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
  ] satisfies ActivityItem[],

  quickActions: [
    { label: 'Create New Task', to: '/tasks/create', accent: 'primary' },
    { label: 'Create New Workflow', to: '/workflow-designer', accent: 'secondary' },
    { label: 'Create New Workspace', to: '/workspaces/atlas', accent: 'primary' },
    { label: 'Browse Knowledge Base', to: '/knowledge', accent: 'secondary' }
  ] satisfies QuickAction[],

  schedules: [
    {
      id: 'u1',
      name: 'Weekly Insight Refresh',
      time: 'Today · 16:00 UTC',
      workspace: 'Atlas Research',
      relatedTaskId: 'task-01'
    },
    {
      id: 'u2',
      name: 'Policy Tracker Validation',
      time: 'Tomorrow · 09:30 UTC',
      workspace: 'Civic Lens',
      relatedTaskId: 'task-03'
    }
  ] satisfies ScheduleItem[],

  workspaces: [
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
    },
    {
      id: 'civic',
      name: 'Civic Lens',
      description: 'Policy intelligence and regulatory monitoring.',
      icon: '⚖️',
      color: '#10b981',
      members: 9,
      activeTasks: 3,
      workflows: 6,
      lastActivity: '1 hour ago'
    }
  ] satisfies Workspace[],

  tasks: [
    {
      id: 'task-01',
      name: 'Supply Chain Stress Test',
      objective: 'Model cascading risks across vendor tiers and geographies.',
      status: 'Running',
      priority: 'High',
      project: 'RiskOps',
      createdDate: '2024-03-04',
      creator: 'Nova Liang',
      assignee: 'Priya Kumar',
      workspaceId: 'atlas'
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
      assignee: 'Avery Chen',
      workspaceId: 'nova'
    },
    {
      id: 'task-03',
      name: 'Policy Tracker Refresh',
      objective: 'Aggregate and cluster new regulatory updates.',
      status: 'Completed',
      priority: 'Low',
      project: 'GovTrack',
      createdDate: '2024-02-27',
      creator: 'Samira Patel',
      assignee: 'Samira Patel',
      workspaceId: 'civic'
    }
  ] satisfies Task[],

  workflows: [
    {
      id: 'wf-01',
      name: 'Market Pulse',
      status: 'Running',
      owner: 'Workflow Engine',
      lastRun: '12m ago',
      workspaceId: 'nova'
    },
    {
      id: 'wf-02',
      name: 'Policy Tracker',
      status: 'Scheduled',
      owner: 'Avery Chen',
      lastRun: '2h ago',
      workspaceId: 'civic'
    }
  ] satisfies Workflow[],

  knowledgeArticles: [
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
    },
    {
      id: 'kb-3',
      title: 'Human-in-the-loop Governance',
      author: 'Nova Liang',
      excerpt: 'Practices for approvals, audits, and aligned incentives.',
      views: 128,
      category: 'Governance',
      tags: ['compliance', 'guardrails'],
      lastUpdated: '1 week ago'
    }
  ] satisfies KnowledgeArticle[],

  users: [
    { id: 'user-1', name: 'Nova Liang', role: 'Lead Researcher', workspace: 'Atlas Research' },
    { id: 'user-2', name: 'Avery Chen', role: 'Data Scientist', workspace: 'Nova Labs' },
    { id: 'user-3', name: 'Samira Patel', role: 'Policy Analyst', workspace: 'Civic Lens' }
  ] satisfies UserProfile[]
};

export type MockData = typeof mockData;
