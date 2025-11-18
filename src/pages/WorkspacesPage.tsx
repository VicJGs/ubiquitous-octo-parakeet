import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockData } from '../data/mockData';
import { EmptyState, ErrorToast, SkeletonList } from '../components/AsyncStates';
import { useMockedData } from '../hooks/useMockedData';

const WorkspacesPage = () => {
  const { data, loading, error, reload } = useMockedData(() => mockData.workspaces, { failFirst: true });
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => (data ?? []).filter((workspace) => workspace.name.toLowerCase().includes(query.toLowerCase())),
    [data, query]
  );

  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Navigation</p>
            <h1 style={{ margin: 0 }}>Workspaces</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              placeholder="Search workspaces"
              className="input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Link
              to={`/workspaces/${mockData.workspaces[0].id}`}
              className="primary"
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              Create Workspace
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="ghost">Grid View</button>
          <button className="ghost">List View</button>
          <button className="ghost">Filter</button>
          <button className="ghost">Sort</button>
        </div>
      </section>

      <section className="card-grid">
        {loading && <SkeletonList count={4} />}
        {!loading &&
          filtered.map((workspace) => (
            <Link
              key={workspace.id}
              to={`/workspaces/${workspace.id}`}
              className="card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{workspace.icon}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>{workspace.name}</p>
                  <p className="workspace" style={{ margin: 0 }}>
                    {workspace.members} members · {workspace.activeTasks} active tasks
                  </p>
                </div>
              </div>
              <p>{workspace.description}</p>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6b7280' }}
              >
                <span>{workspace.workflows} workflows</span>
                <span>Last activity {workspace.lastActivity}</span>
              </div>
            </Link>
          ))}
        {!loading && filtered.length === 0 && (
          <EmptyState
            title="No workspaces to show"
            message="Try clearing filters or add a new workspace."
            actionLabel="Back to workspace hub"
            to="/home"
          />
        )}
      </section>
      <ErrorToast message={error} onRetry={reload} />
    </div>
  );
};

export default WorkspacesPage;
