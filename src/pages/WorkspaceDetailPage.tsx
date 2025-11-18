import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { workspaces, activityFeed } from '../data/mockData';

const WorkspaceDetailPage = () => {
  const { id } = useParams();
  const workspace = workspaces.find((w) => w.id === id) ?? workspaces[0];
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Tasks', 'Workflows', 'Knowledge', 'Members', 'Settings'];

  const memberBadges = useMemo(() => {
    const list = workspace.membersList ?? [];
    if (list.length === 0) return null;
    return (
      <div className="member-stack">
        {list.map((member) => (
          <div key={member.name} className="member-chip">
            <span className="avatar-circle">{member.name.charAt(0)}</span>
            <div>
              <strong>{member.name}</strong>
              <p className="workspace">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }, [workspace.membersList]);

  return (
    <div className="stack">
      <section className="card workspace-hero" style={{ borderColor: workspace.color }}>
        <div className="workspace-hero-top">
          <div className="workspace-hero-icon" style={{ background: workspace.color }}>
            {workspace.icon}
          </div>
          <div>
            <p className="workspace">Workspace</p>
            <h1 style={{ margin: '0 0 0.25rem 0' }}>{workspace.name}</h1>
            <p style={{ margin: 0 }}>{workspace.description}</p>
            <div className="workspace-meta" style={{ marginTop: '0.75rem' }}>
              <span className="badge info">{workspace.role}</span>
              <span className="badge info">{workspace.privacy}</span>
              <span className="badge info">{workspace.members} members</span>
              <span className="badge info">{workspace.activeTasks} tasks</span>
            </div>
          </div>
          <div className="hero-actions">
            <button className="ghost">Share</button>
            <button className="primary">Edit</button>
          </div>
        </div>
        {memberBadges}
      </section>

      <section className="card">
        <div className="tabs">
          {tabs.map((tab) => (
            <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
      </section>

      {activeTab === 'Overview' && (
        <section className="card">
          <div className="section-header">
            <h2>Overview</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/tasks/create" className="primary" style={{ textDecoration: 'none', color: '#fff' }}>
                Create Task
              </Link>
              <Link to="/workflow-designer" className="secondary" style={{ textDecoration: 'none', color: '#fff' }}>
                Create Workflow
              </Link>
            </div>
          </div>
          <div className="card-grid">
            <div className="card">
              <p className="stat-label">Total Tasks</p>
              <p className="stat-value">82</p>
              <p className="stat-trend">12 in progress</p>
            </div>
            <div className="card">
              <p className="stat-label">Workflows</p>
              <p className="stat-value">18</p>
              <p className="stat-trend">4 scheduled</p>
            </div>
            <div className="card">
              <p className="stat-label">Knowledge Articles</p>
              <p className="stat-value">204</p>
              <p className="stat-trend">+12 this month</p>
            </div>
            <div className="card">
              <p className="stat-label">Members</p>
              <p className="stat-value">{workspace.members}</p>
              <p className="stat-trend">3 pending invites</p>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'Tasks' && (
        <section className="card">
          <div className="section-header">
            <h2>Tasks</h2>
            <Link to="/tasks/create" className="primary" style={{ textDecoration: 'none', color: '#fff' }}>
              New Task
            </Link>
          </div>
          <p className="workspace">Task pipeline, owners, and states will appear here.</p>
        </section>
      )}

      {activeTab === 'Workflows' && (
        <section className="card">
          <div className="section-header">
            <h2>Workflows</h2>
            <Link to="/workflow-designer" className="secondary" style={{ textDecoration: 'none', color: '#fff' }}>
              Design Workflow
            </Link>
          </div>
          <p className="workspace">Workflow runs, schedules, and statuses will appear here.</p>
        </section>
      )}

      {activeTab === 'Knowledge' && (
        <section className="card">
          <div className="section-header">
            <h2>Knowledge</h2>
            <Link to="/knowledge" className="ghost" style={{ textDecoration: 'none' }}>
              Browse library
            </Link>
          </div>
          <p className="workspace">Surface articles, decision logs, and briefings relevant to this workspace.</p>
        </section>
      )}

      {activeTab === 'Members' && (
        <section className="card">
          <div className="section-header">
            <h2>Members</h2>
            <button className="ghost">Invite</button>
          </div>
          {memberBadges}
        </section>
      )}

      {activeTab === 'Settings' && (
        <section className="card">
          <div className="section-header">
            <h2>Settings</h2>
            <button className="ghost">Edit properties</button>
          </div>
          <p className="workspace">Privacy, integrations, and access controls are configured here.</p>
        </section>
      )}

      <section className="card">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <button className="ghost">View all</button>
        </div>
        <div className="timeline">
          {activityFeed.map((activity) => (
            <div key={activity.id} className="timeline-item">
              <span className="icon">📌</span>
              <div>
                <p>
                  <strong>{activity.user}</strong> {activity.description}
                </p>
                <p className="workspace">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkspaceDetailPage;
