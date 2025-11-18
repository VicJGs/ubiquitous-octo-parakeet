const phases = [
  {
    name: 'Planning',
    tools: ['Brief generator', 'Scope guardrails'],
    outcomes: ['Research brief'],
    dependencies: ['Executive approval'],
    workflows: ['Program kickoff']
  },
  {
    name: 'Information Gathering',
    tools: ['Web crawler', 'RAG search', 'Data connectors'],
    outcomes: ['Source packet'],
    dependencies: ['Planning brief'],
    workflows: ['Signal intake']
  },
  {
    name: 'Analysis',
    tools: ['LLM summarizer', 'Model evaluator'],
    outcomes: ['Comparative matrix'],
    dependencies: ['Source packet'],
    workflows: ['Scoring rubric']
  },
  {
    name: 'Synthesis',
    tools: ['Report composer', 'Reviewer assignment'],
    outcomes: ['Draft deliverable'],
    dependencies: ['Analysis scoring'],
    workflows: ['Narrative assembly']
  },
  {
    name: 'Validation',
    tools: ['Red-team prompts', 'Policy checklist'],
    outcomes: ['Approval memo'],
    dependencies: ['Draft deliverable'],
    workflows: ['Signoff flow']
  }
];

const TaskCreationPage = () => {
  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Task Builder</p>
            <h1 style={{ margin: 0 }}>Create Task</h1>
          </div>
          <div className="controls-inline">
            <button className="ghost">Save draft</button>
            <button className="ghost">Schedule start</button>
            <button className="ghost">Save as template</button>
            <button className="primary">Create & Start</button>
          </div>
        </div>
        <p>Configure objectives, phased execution, and governance controls before launching.</p>
      </section>

      <section className="grid-two">
        <div className="stack" style={{ gap: '1.5rem' }}>
          <div className="card">
            <h2>Task information</h2>
            <div className="stack" style={{ gap: '0.75rem' }}>
              <input className="input" placeholder="Task name" defaultValue="Executive Market Brief" />
              <textarea
                className="input"
                placeholder="Primary research objective"
                rows={4}
                defaultValue="Generate a weekly market intelligence brief with supply chain and policy updates."
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <select className="input">
                  <option>Atlas Research</option>
                  <option>Nova Labs</option>
                </select>
                <input className="input" placeholder="Project tags" defaultValue="risk, weekly" />
                <select className="input">
                  <option>Priority: High</option>
                  <option>Priority: Medium</option>
                  <option>Priority: Low</option>
                </select>
                <input className="input" type="date" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="section-header">
              <h2>Phased timeline</h2>
              <span className="workspace">Assign tools, workflows, and dependencies per stage</span>
            </div>
            <div className="timeline">
              {phases.map((phase, index) => (
                <details key={phase.name} open>
                  <summary className="phase-summary">
                    <span className="icon">{index + 1}</span>
                    <div>
                      <strong>{phase.name}</strong>
                      <p className="workspace" style={{ margin: 0 }}>
                        Configure tools, outcomes, workflows, and gating dependencies
                      </p>
                    </div>
                  </summary>
                  <div className="phase-body">
                    <div className="phase-grid">
                      <div>
                        <p className="workspace">Tools</p>
                        <div className="task-tags">
                          {phase.tools.map((tool) => (
                            <span key={tool} className="badge info">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="workspace">Outcomes</p>
                        <div className="task-tags">
                          {phase.outcomes.map((outcome) => (
                            <span key={outcome} className="badge info">
                              {outcome}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="workspace">Dependencies</p>
                        <div className="task-tags">
                          {phase.dependencies.map((dependency) => (
                            <span key={dependency} className="badge info">
                              {dependency}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="workspace">Workflows</p>
                        <div className="task-tags">
                          {phase.workflows.map((workflow) => (
                            <span key={workflow} className="badge info">
                              {workflow}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="controls-inline">
                      <button className="ghost">Assign tools</button>
                      <button className="ghost">Link workflow</button>
                      <button className="ghost">Add dependency</button>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="card">
            <h2>Global settings</h2>
            <div className="stack" style={{ gap: '0.75rem' }}>
              <select className="input">
                <option>Workspace model defaults</option>
                <option>Custom model policy</option>
              </select>
              <select className="input">
                <option>Privacy: Allow approved external services</option>
                <option>Privacy: Internal only</option>
              </select>
              <input className="input" placeholder="Total budget" defaultValue="$1,200" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <input className="input" placeholder="Execution timeout" defaultValue="60 minutes" />
                <input className="input" placeholder="Retries" defaultValue="3" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <input className="input" placeholder="Compliance profile" defaultValue="Standard" />
                <input className="input" placeholder="Notification rules" defaultValue="Phase completion" />
              </div>
              <div>
                <label>
                  <input type="checkbox" defaultChecked /> Notify on phase completion
                </label>
              </div>
            </div>
          </div>
        </div>
        <aside className="card">
          <h2>Live summary</h2>
          <p>Preview of task configuration, resource allocation, and governance.</p>
          <ul>
            <li>Workspace: Atlas Research</li>
            <li>Priority: High</li>
            <li>Phases configured: {phases.length}</li>
            <li>Budget guardrails enabled</li>
            <li>Notifications on phase completion</li>
          </ul>
          <h3>Timeline</h3>
          <ol>
            {phases.map((phase) => (
              <li key={phase.name}>{phase.name}</li>
            ))}
          </ol>
          <div className="stack" style={{ gap: '0.5rem' }}>
            <button className="primary">Save draft</button>
            <button className="secondary">Start now</button>
            <button className="ghost">Schedule</button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default TaskCreationPage;
