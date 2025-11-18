const paletteCategories = {
  'Research Tasks': ['Task Brief', 'Human Review', 'LLM Co-Pilot'],
  'Data Access': ['Vector Search', 'SQL Runner', 'Document Loader'],
  'Control Flow': ['Branch', 'Parallel', 'Loop'],
  Integrations: ['Slack', 'Jira', 'Webhook']
};

const canvasNodes = [
  { name: 'Trigger · Webhook', status: 'Ready', validation: 'Clean', detail: 'Listening for new event payloads' },
  { name: 'Data Prep · Transform', status: 'Executing', validation: 'Warnings', detail: 'Handling missing vendor attributes' },
  { name: 'Analysis · Scenario', status: 'Validating', validation: 'Checks pending', detail: 'Running Monte Carlo iteration 6/10' },
  { name: 'Decision · Branch', status: 'Ready', validation: 'Clean', detail: 'Routing to responder lanes' },
  { name: 'Publish · Notifications', status: 'Ready', validation: 'Clean', detail: 'Posting to Slack + email' }
];

const executionHistory = [
  {
    id: 'run-148',
    status: 'Passed',
    started: 'Today · 14:55 UTC',
    duration: '3m 12s',
    actor: 'Workflow Engine',
    output: '12 insights published'
  },
  {
    id: 'run-147',
    status: 'Warnings',
    started: 'Today · 12:10 UTC',
    duration: '2m 50s',
    actor: 'Priya Kumar',
    output: 'Policy check pending human review'
  },
  {
    id: 'run-146',
    status: 'Failed',
    started: 'Yesterday · 20:15 UTC',
    duration: '1m 05s',
    actor: 'Workflow Engine',
    output: 'Vector search index unreachable'
  }
];

const WorkflowDesignerPage = () => {
  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Workflow Studio</p>
            <h1 style={{ margin: 0 }}>Scenario Orchestrator</h1>
            <p className="workspace" style={{ marginTop: '0.35rem' }}>
              Canvas, palette, and properties panel for orchestrating data, AI, and human steps.
            </p>
          </div>
          <div className="workflow-toolbar">
            <button className="ghost">Save Draft</button>
            <button className="ghost">Test Run</button>
            <button className="primary">Publish</button>
            <button className="ghost">Share</button>
            <button className="ghost">Export</button>
          </div>
        </div>
        <div className="workflow-toolbar__meta">
          <div className="pill-row">
            <span className="pill muted">Version: v1.8</span>
            <span className="pill muted">Auto-save on</span>
            <span className="pill muted">Last edited 2m ago</span>
          </div>
          <div className="pill-row">
            <button className="ghost">Undo</button>
            <button className="ghost">Redo</button>
            <button className="ghost">Grid</button>
            <button className="ghost">Minimap</button>
            <button className="ghost">Zoom -</button>
            <button className="ghost">Fit</button>
            <button className="ghost">Zoom +</button>
          </div>
        </div>
      </section>

      <section className="designer-grid">
        <aside className="card palette">
          <div className="section-header">
            <div>
              <p className="workspace" style={{ margin: 0 }}>Palette</p>
              <h2 style={{ margin: 0 }}>Nodes</h2>
            </div>
            <button className="ghost">Collapse</button>
          </div>
          <input className="input" placeholder="Search nodes" />
          <div className="pill-row">
            <span className="pill active">All</span>
            <span className="pill muted">Recently used</span>
            <span className="pill muted">Validated</span>
          </div>
          <div className="stack" style={{ gap: '1rem', marginTop: '0.5rem' }}>
            {Object.entries(paletteCategories).map(([category, nodes]) => (
              <div key={category} className="palette-category">
                <p className="workspace" style={{ margin: 0 }}>{category}</p>
                <div className="stack" style={{ gap: '0.5rem' }}>
                  {nodes.map((node) => (
                    <button key={node} className="ghost palette-item" style={{ justifyContent: 'flex-start' }}>
                      {node}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="palette-footer">
            <p className="workspace" style={{ margin: 0 }}>Drag any node to the canvas to start.</p>
            <button className="ghost">Import template</button>
          </div>
        </aside>

        <div className="card canvas-area">
          <div className="canvas-header">
            <div>
              <p className="workspace" style={{ margin: 0 }}>Canvas</p>
              <h2 style={{ margin: 0 }}>Flow</h2>
            </div>
            <div className="pill-row">
              <span className="pill muted">Snap to grid</span>
              <span className="pill muted">Lines: Orthogonal</span>
              <span className="pill muted">Validation live</span>
            </div>
          </div>
          <div className="canvas-empty">
            <p className="workspace" style={{ margin: 0 }}>Empty state</p>
            <h3 style={{ margin: '0.25rem 0' }}>Drop nodes here to assemble your workflow</h3>
            <p className="workspace" style={{ margin: 0 }}>
              Use the palette to place triggers, data steps, and human approvals. Connect nodes to define paths.
            </p>
            <div className="pill-row" style={{ marginTop: '0.5rem' }}>
              <button className="ghost">Show grid</button>
              <button className="ghost">Show minimap</button>
              <button className="ghost">Add starter template</button>
            </div>
          </div>
          <div className="canvas-nodes">
            {canvasNodes.map((node) => (
              <div key={node.name} className="canvas-node card">
                <div className="canvas-node__status">
                  <span className={`status-dot ${node.status.toLowerCase()}`} aria-hidden />
                  <div>
                    <p className="workspace" style={{ margin: 0 }}>{node.status}</p>
                    <h4 style={{ margin: 0 }}>{node.name}</h4>
                  </div>
                  <span className="pill muted">{node.validation}</span>
                </div>
                <p className="workspace" style={{ margin: 0 }}>{node.detail}</p>
                <div className="pill-row" style={{ marginTop: '0.5rem' }}>
                  <button className="ghost">View properties</button>
                  <button className="ghost">Validation</button>
                </div>
              </div>
            ))}
          </div>
          <div className="minimap">
            <p className="workspace" style={{ margin: 0 }}>Minimap</p>
            <div className="minimap-box" aria-hidden />
          </div>
        </div>

        <aside className="card properties-panel">
          <div className="section-header">
            <div>
              <p className="workspace" style={{ margin: 0 }}>Properties</p>
              <h2 style={{ margin: 0 }}>Selected Node</h2>
            </div>
            <button className="ghost">Collapse</button>
          </div>
          <div className="stack">
            <div className="property-row">
              <p className="workspace" style={{ margin: 0 }}>Name</p>
              <input className="input" value="Data Prep · Transform" readOnly />
            </div>
            <div className="property-row">
              <p className="workspace" style={{ margin: 0 }}>Description</p>
              <textarea className="input" rows={3} value="Clean and enrich vendor records before scoring." readOnly />
            </div>
            <div className="property-row">
              <p className="workspace" style={{ margin: 0 }}>Inputs</p>
              <div className="pill-row">
                <span className="pill muted">Vendors table</span>
                <span className="pill muted">Schema v2.1</span>
                <span className="pill muted">Feature flags</span>
              </div>
            </div>
            <div className="property-row">
              <p className="workspace" style={{ margin: 0 }}>Validation</p>
              <div className="validation-summary">
                <span className="badge warning">2 warnings</span>
                <p className="workspace" style={{ margin: 0 }}>
                  Null values detected in supplier region. Auto-imputation enabled.
                </p>
              </div>
              <button className="ghost" style={{ marginTop: '0.5rem' }}>Open validation report</button>
            </div>
            <div className="property-row">
              <p className="workspace" style={{ margin: 0 }}>Outputs</p>
              <div className="pill-row">
                <span className="pill muted">Scorecard</span>
                <span className="pill muted">Explainability trace</span>
                <span className="pill muted">Routing decision</span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace" style={{ margin: 0 }}>Execution history</p>
            <h2 style={{ margin: 0 }}>Recent runs</h2>
          </div>
          <div className="pill-row">
            <select className="input select">
              <option>All statuses</option>
              <option>Passed</option>
              <option>Warnings</option>
              <option>Failed</option>
            </select>
            <select className="input select">
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
        </div>
        <div className="workflow-list">
          {executionHistory.map((run) => (
            <div key={run.id} className="workflow-row">
              <div className="workflow-row__main">
                <div className="workflow-row__title">
                  <p className="workspace" style={{ margin: 0 }}>{run.id}</p>
                  <h4 style={{ margin: 0 }}>{run.output}</h4>
                  <p className="workspace" style={{ margin: 0 }}>{run.actor}</p>
                </div>
                <div className="workflow-row__meta">
                  <span className={`badge ${run.status === 'Passed' ? 'success' : run.status === 'Warnings' ? 'warning' : 'info'}`}>
                    {run.status}
                  </span>
                  <span className="pill muted">{run.started}</span>
                  <span className="pill muted">{run.duration}</span>
                </div>
              </div>
              <div className="workflow-row__actions">
                <button className="ghost">Re-run</button>
                <button className="ghost">Download logs</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkflowDesignerPage;
