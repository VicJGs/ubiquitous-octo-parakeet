import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmptyState, ErrorToast, SkeletonList } from '../components/AsyncStates';
import { mockData } from '../data/mockData';
import { useMockedData } from '../hooks/useMockedData';

const WorkspaceDetailPage = () => {
  const { id } = useParams();
  const { data, loading, error, reload } = useMockedData(() => mockData.workspaces, { failFirst: true });
  const workspace = useMemo(() => data?.find((w) => w.id === id), [data, id]);

  if (loading) {
    return <SkeletonList count={2} />;
  }

  if (!workspace) {
    return (
      <div className="stack">
        <EmptyState
          title="Workspace missing"
          message="We couldn't find this workspace."
          actionLabel="Back to workspaces"
          to="/workspaces"
        />
        <ErrorToast message={error} onRetry={reload} />
      </div>
    );
  }

  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Workspace</p>
            <h1 style={{ margin: 0 }}>{workspace.name}</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link className="ghost" to="/home">
              Share
            </Link>
            <Link className="ghost" to="/workspaces">
              Edit
            </Link>
          </div>
        </div>
        <p>{workspace.description}</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="badge info">{workspace.members} members</span>
          <span className="badge info">{workspace.activeTasks} tasks</span>
          <span className="badge info">{workspace.workflows} workflows</span>
        </div>
      </section>

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

      <section className="card">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <button className="ghost">View all</button>
        </div>
        <div className="timeline">
          {mockData.activityFeed.map((activity) => (
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
      <ErrorToast message={error} onRetry={reload} />
    </div>
  );
};

export default WorkspaceDetailPage;
