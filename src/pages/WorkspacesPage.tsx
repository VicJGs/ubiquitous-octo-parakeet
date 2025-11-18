import { Link } from 'react-router-dom';
import { workspaces } from '../data/mockData';

const WorkspacesPage = () => {
  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Navigation</p>
            <h1 style={{ margin: 0 }}>Workspaces</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input placeholder="Search workspaces" className="input" />
            <button className="primary">Create Workspace</button>
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
        {workspaces.map((workspace) => (
          <Link key={workspace.id} to={`/workspaces/${workspace.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6b7280' }}>
              <span>{workspace.workflows} workflows</span>
              <span>Last activity {workspace.lastActivity}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default WorkspacesPage;
