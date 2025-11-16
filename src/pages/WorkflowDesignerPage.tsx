const paletteCategories = {
  'Research Tasks': ['Task Brief', 'Human Review', 'LLM Co-Pilot'],
  'Data Access': ['Vector Search', 'SQL Runner', 'Document Loader'],
  'Control Flow': ['Branch', 'Parallel', 'Loop'],
  Integrations: ['Slack', 'Jira', 'Webhook']
};

const WorkflowDesignerPage = () => {
  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Workflow Studio</p>
            <h1 style={{ margin: 0 }}>Scenario Orchestrator</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="ghost">Undo</button>
            <button className="ghost">Redo</button>
            <button className="primary">Publish</button>
          </div>
        </div>
        <p>Design, test, and publish multi-phase workflows with data, AI, and human-in-the-loop steps.</p>
      </section>

      <section className="grid-two" style={{ gridTemplateColumns: '280px 1fr' }}>
        <aside className="card" style={{ maxHeight: '80vh', overflow: 'auto' }}>
          <h2>Node Palette</h2>
          <input className="input" placeholder="Search nodes" />
          <div className="stack" style={{ gap: '1rem', marginTop: '1rem' }}>
            {Object.entries(paletteCategories).map(([category, nodes]) => (
              <div key={category}>
                <p style={{ fontWeight: 600 }}>{category}</p>
                <div className="stack" style={{ gap: '0.5rem' }}>
                  {nodes.map((node) => (
                    <button key={node} className="ghost" style={{ justifyContent: 'flex-start' }}>
                      {node}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <div className="card" style={{ minHeight: '80vh' }}>
          <div className="section-header">
            <h2>Canvas</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="ghost">Zoom -</button>
              <button className="ghost">Fit</button>
              <button className="ghost">Zoom +</button>
            </div>
          </div>
          <p>Use drag-and-drop to connect nodes. This static mock shows how nodes align and display status.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {['Trigger', 'Data Prep', 'Analysis', 'Decision', 'Publish'].map((node) => (
              <div key={node} className="card" style={{ minWidth: '140px', borderStyle: 'dashed', borderColor: '#d1d5db' }}>
                <p style={{ margin: 0 }}>{node}</p>
                <p className="workspace" style={{ margin: 0 }}>
                  Status: {node === 'Analysis' ? 'Executing' : 'Ready'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkflowDesignerPage;
