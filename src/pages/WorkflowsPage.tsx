import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { workflows as workflowData } from '../data/mockData';

type WorkflowStatus = 'All' | 'Running' | 'Published' | 'Draft';

type Workflow = (typeof workflowData)[number];

const statusOrder: Record<Exclude<WorkflowStatus, 'All'>, number> = {
  Running: 1,
  Published: 2,
  Draft: 3
};

const WorkflowsPage = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<WorkflowStatus>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'runs'>('recent');

  const filtered = useMemo(() => {
    return workflowData
      .filter((wf) => wf.name.toLowerCase().includes(query.toLowerCase()) || wf.workspace.toLowerCase().includes(query.toLowerCase()))
      .filter((wf) => (status === 'All' ? true : wf.status === status));
  }, [query, status]);

  const grouped = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'runs') return b.runs - a.runs;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return sorted.reduce<Record<string, Workflow[]>>((acc, wf) => {
      if (!acc[wf.workspace]) acc[wf.workspace] = [];
      acc[wf.workspace].push(wf);
      return acc;
    }, {});
  }, [filtered, sortBy]);

  const totalPublished = workflowData.filter((wf) => wf.status === 'Published').length;
  const totalRunning = workflowData.filter((wf) => wf.status === 'Running').length;

  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Automation Catalog</p>
            <h1 style={{ margin: 0 }}>All Workflows</h1>
            <p className="workspace" style={{ marginTop: '0.35rem' }}>
              Grouped by workspace with filters for status, freshness, and adoption.
            </p>
          </div>
          <div className="workflow-actions">
            <Link to="/workflow-designer" className="ghost">Open Designer</Link>
            <button className="primary">New Workflow</button>
          </div>
        </div>
        <div className="workflow-filters">
          <div className="workflow-search">
            <input
              className="input"
              placeholder="Search workflows or workspaces"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search workflows"
            />
            <select className="input select" value={sortBy} onChange={(e) => setSortBy(e.target.value as 'recent' | 'runs')}>
              <option value="recent">Recently updated</option>
              <option value="runs">Most runs</option>
            </select>
          </div>
          <div className="pill-row">
            {(['All', 'Running', 'Published', 'Draft'] as WorkflowStatus[]).map((option) => (
              <button
                key={option}
                className={`pill ${status === option ? 'active' : ''}`}
                onClick={() => setStatus(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="workflow-summary">
            <span className="badge info">{workflowData.length} total</span>
            <span className="badge success">{totalPublished} published</span>
            <span className="badge warning">{totalRunning} running</span>
          </div>
        </div>
      </section>

      <section className="card stack" style={{ gap: '1.25rem' }}>
        {Object.entries(grouped).map(([workspace, items]) => (
          <div key={workspace} className="workspace-group">
            <div className="workspace-group__header">
              <div>
                <p className="workspace" style={{ margin: 0 }}>Workspace</p>
                <h3 style={{ margin: 0 }}>{workspace}</h3>
              </div>
              <div className="workspace-group__meta">
                <span>{items.length} workflows</span>
                <span>
                  Top status:{' '}
                  <strong>
                    {[...items].sort(
                      (a, b) => statusOrder[a.status as Exclude<WorkflowStatus, 'All'>] - statusOrder[b.status as Exclude<WorkflowStatus, 'All'>]
                    )[0].status}
                  </strong>
                </span>
              </div>
            </div>
            <div className="workflow-list">
              {items.map((wf) => (
                <div key={wf.id} className="workflow-row">
                  <div className="workflow-row__main">
                    <div className="workflow-row__title">
                      <p className="workspace" style={{ margin: 0 }}>#{wf.id}</p>
                      <h4 style={{ margin: 0 }}>{wf.name}</h4>
                      <p className="workspace" style={{ margin: 0 }}>{wf.description}</p>
                    </div>
                    <div className="workflow-row__meta">
                      <span className={`badge ${wf.status === 'Running' ? 'warning' : wf.status === 'Published' ? 'success' : 'info'}`}>
                        {wf.status}
                      </span>
                      <span className="pill muted">{wf.runs} lifetime runs</span>
                      <span className="pill muted">Last run {new Date(wf.lastRun).toLocaleString()}</span>
                      <span className="pill muted">Owner: {wf.owner}</span>
                      <div className="pill muted" style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                        <span role="img" aria-label="tags">
                          🏷️
                        </span>
                        {wf.tags.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="workflow-row__actions">
                    <button className="ghost">Share</button>
                    <button className="ghost">Duplicate</button>
                    <Link to="/workflow-designer" className="primary" style={{ textDecoration: 'none', color: '#fff' }}>
                      Open in Designer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {Object.keys(grouped).length === 0 && <p className="workspace">No workflows match the current filters.</p>}
      </section>
    </div>
  );
};

export default WorkflowsPage;
