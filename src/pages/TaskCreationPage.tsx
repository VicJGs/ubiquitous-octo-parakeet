import { Link } from 'react-router-dom';

const phases = ['Planning', 'Information Gathering', 'Analysis', 'Synthesis', 'Validation'];

const TaskCreationPage = () => {
  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Task Builder</p>
            <h1 style={{ margin: 0 }}>Create Task</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/tasks" className="ghost" style={{ textDecoration: 'none' }}>
              Save Draft
            </Link>
            <Link to="/tasks" className="primary" style={{ textDecoration: 'none', color: '#fff' }}>
              Create & Start
            </Link>
          </div>
        </div>
        <p>Configure objectives, phases, tools, workflows, and governance controls.</p>
      </section>

      <section className="grid-two">
        <div className="stack" style={{ gap: '1.5rem' }}>
          <div className="card">
            <h2>Task Information</h2>
            <div className="stack" style={{ gap: '0.75rem' }}>
              <input className="input" placeholder="Task name" />
              <textarea className="input" placeholder="Primary research objective" rows={4} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <select className="input">
                  <option>Atlas Research</option>
                </select>
                <input className="input" placeholder="Project tags" />
                <select className="input">
                  <option>Priority: High</option>
                </select>
                <input className="input" type="date" />
              </div>
            </div>
          </div>

          {phases.map((phase, index) => (
            <div className="card" key={phase}>
              <div className="section-header">
                <h2>
                  Phase {index + 1}: {phase}
                </h2>
                <Link to="/workflow-designer" className="ghost" style={{ textDecoration: 'none' }}>
                  Configure
                </Link>
              </div>
              <p>
                Describe objectives, expected outcomes, assign tools, workflows, and dependencies for the {phase.toLowerCase()} phase.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span className="badge info">Tools: 3 enabled</span>
                <span className="badge info">Workflow: Market Pulse</span>
                <span className="badge info">Outcome: Analysis Report</span>
              </div>
            </div>
          ))}

          <div className="card">
            <h2>Global Settings</h2>
            <div className="stack" style={{ gap: '0.75rem' }}>
              <select className="input">
                <option>Workspace model defaults</option>
              </select>
              <select className="input">
                <option>Privacy: Allow approved external services</option>
              </select>
              <input className="input" placeholder="Total budget" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <input className="input" placeholder="Execution timeout" />
                <input className="input" placeholder="Retries" />
              </div>
              <div>
                <label>
                  <input type="checkbox" /> Notify on phase completion
                </label>
              </div>
            </div>
          </div>
        </div>
        <aside className="card">
          <h2>Live Summary</h2>
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
              <li key={phase}>{phase}</li>
            ))}
          </ol>
        </aside>
      </section>
    </div>
  );
};

export default TaskCreationPage;
