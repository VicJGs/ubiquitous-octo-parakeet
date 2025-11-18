import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Network, Sparkles } from 'lucide-react';
import { workspaceTemplates, workspaces as seedWorkspaces } from '../data/mockData';
import WorkspaceCreateModal from '../components/WorkspaceCreateModal';

const workspaceIcons = {
  atlas: <Network size={20} aria-hidden />,
  nova: <Sparkles size={20} aria-hidden />
};

const WorkspacesPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'recent' | 'name' | 'members' | 'tasks'>('recent');
  const [roleFilter, setRoleFilter] = useState<'all' | 'Owner' | 'Editor' | 'Viewer'>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [workspaceList, setWorkspaceList] = useState(seedWorkspaces);

  const filteredWorkspaces = useMemo(() => {
    const term = search.toLowerCase();
    let items = workspaceList.filter(
      (workspace) =>
        workspace.name.toLowerCase().includes(term) ||
        workspace.description.toLowerCase().includes(term) ||
        workspace.domain.toLowerCase().includes(term)
    );

    if (roleFilter !== 'all') {
      items = items.filter((workspace) => workspace.role === roleFilter);
    }

    return items.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'members') return b.members - a.members;
      if (sort === 'tasks') return b.activeTasks - a.activeTasks;
      return a.lastActivityMinutes - b.lastActivityMinutes;
    });
  }, [workspaceList, search, sort, roleFilter]);

  const handleCreate = (workspace: {
    name: string;
    description: string;
    color: string;
    icon: string;
    privacy: string;
    members: number;
    role: string;
    domain: string;
  }) => {
    setWorkspaceList((prev) => [
      {
        ...workspace,
        id: workspace.name.toLowerCase().replace(/\s+/g, '-'),
        activeTasks: 0,
        workflows: 0,
        lastActivity: 'Just now',
        lastActivityMinutes: 0,
        membersList: [],
        role: 'Owner'
      },
      ...prev
    ]);
  };

  const isEmpty = filteredWorkspaces.length === 0;

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="primary" onClick={() => setShowCreate(true)}>
              Create Workspace
            </button>
          </div>
        </div>
        <div className="controls-row">
          <div className="pill-row">
            <button className={`pill ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
              Grid view
            </button>
            <button className={`pill ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}>
              Table view
            </button>
          </div>

          <div className="pill-row">
            {['all', 'Owner', 'Editor', 'Viewer'].map((role) => (
              <button
                key={role}
                className={`pill ${roleFilter === role ? 'active' : ''}`}
                onClick={() => setRoleFilter(role as typeof roleFilter)}
              >
                {role === 'all' ? 'All roles' : role}
              </button>
            ))}
          </div>

          <div className="select-row">
            <label>Sort</label>
            <select className="input" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
              <option value="recent">Most recent</option>
              <option value="name">Name</option>
              <option value="members">Members</option>
              <option value="tasks">Active tasks</option>
            </select>
          </div>
        </div>
      </section>

      {isEmpty ? (
        <section className="card">
          <h2>No workspaces match your filters</h2>
          <p className="workspace">Try adjusting the search or create a new workspace.</p>
          <div className="template-grid">
            {workspaceTemplates.map((template) => (
              <div key={template.id} className="template-card active" style={{ textAlign: 'left' }}>
                <div className="template-icon" style={{ background: template.color }}>
                  {template.icon}
                </div>
                <p className="template-title">{template.name}</p>
                <p className="workspace">{template.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className={viewMode === 'grid' ? 'card-grid' : 'card'}>
          {viewMode === 'grid' ? (
            filteredWorkspaces.map((workspace) => (
              <Link
                key={workspace.id}
                to={`/workspaces/${workspace.id}`}
                className="workspace-card"
                style={{ borderColor: workspace.color }}
              >
                <div className="workspace-card-header">
                  <span className="workspace-icon" style={{ background: workspace.color }}>
                    {workspace.icon ?? workspaceIcons[workspace.id as keyof typeof workspaceIcons] ?? <Network size={20} />}
                  </span>
                  <div>
                    <p className="workspace-name">{workspace.name}</p>
                    <p className="workspace">{workspace.domain}</p>
                  </div>
                  <span className="badge info">{workspace.role}</span>
                </div>
                <p className="workspace-description">{workspace.description}</p>
                <div className="workspace-meta">
                  <span>{workspace.members} members</span>
                  <span>{workspace.activeTasks} active tasks</span>
                  <span>{workspace.workflows} workflows</span>
                  <span>{workspace.privacy}</span>
                  <span>Updated {workspace.lastActivity}</span>
                </div>
              </Link>
            ))
          ) : (
            <table className="workspace-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Domain</th>
                  <th>Role</th>
                  <th>Members</th>
                  <th>Active tasks</th>
                  <th>Workflows</th>
                  <th>Privacy</th>
                  <th>Last activity</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkspaces.map((workspace) => (
                  <tr key={workspace.id} className="workspace-row" onClick={() => navigate(`/workspaces/${workspace.id}`)}>
                    <td>
                      <div className="table-name">
                        <span className="workspace-icon" style={{ background: workspace.color }}>
                          {workspace.icon ?? workspaceIcons[workspace.id as keyof typeof workspaceIcons] ?? <Network size={20} />}
                        </span>
                        <div>
                          <p className="workspace-name">{workspace.name}</p>
                          <p className="workspace">{workspace.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>{workspace.domain}</td>
                    <td>
                      <span className="badge info">{workspace.role}</span>
                    </td>
                    <td>{workspace.members}</td>
                    <td>{workspace.activeTasks}</td>
                    <td>{workspace.workflows}</td>
                    <td>{workspace.privacy}</td>
                    <td>{workspace.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      <WorkspaceCreateModal isOpen={showCreate} onClose={() => setShowCreate(false)} onCreate={handleCreate} />
    </div>
  );
};

export default WorkspacesPage;
