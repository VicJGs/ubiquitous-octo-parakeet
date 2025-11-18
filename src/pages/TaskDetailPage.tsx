import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, CircleOff, Hourglass, Zap } from 'lucide-react';
import { tasks } from '../data/mockData';

const workspaceName = 'Atlas Research';

const phases = [
  { name: 'Planning', status: 'Completed', duration: '12m', summary: 'Framed objectives and scope.' },
  { name: 'Information Gathering', status: 'Completed', duration: '32m', summary: 'Aggregated reports and data pulls.' },
  { name: 'Analysis', status: 'Running', duration: '8m', summary: 'LLM summarization and scoring in progress.' },
  { name: 'Synthesis', status: 'Pending', duration: '-', summary: 'Awaiting upstream signals.' },
  { name: 'Validation', status: 'Pending', duration: '-', summary: 'Human review pending completion.' }
];

const results = [
  { title: 'Executive summary', status: 'Draft', description: 'One-page briefing with key signals and recommendations.' },
  { title: 'Data extracts', status: 'Ready', description: 'Structured CSV exports for leadership dashboards.' },
  { title: 'Knowledge article', status: 'Pending', description: 'Auto-generated article for the research library.' }
];

const renderStatusIcon = (status: string) => {
  if (status === 'Completed') return <CheckCircle2 size={18} />;
  if (status === 'Running') return <Zap size={18} />;
  if (status === 'Pending') return <Hourglass size={18} />;
  return <CircleOff size={18} />;
};

const TaskDetailPage = () => {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === id) ?? tasks[0];
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Task Detail</p>
            <h1 style={{ margin: 0 }}>{task.name}</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link className="ghost" to="/tasks/create">
              Edit
            </Link>
            <Link className="ghost" to="/tasks">
              Cancel
            </Link>
            <Link className="ghost" to="/tasks/create">
              Clone
            </Link>
          </div>
        </div>
        <p>{task.objective}</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="badge info">Status: {task.status}</span>
          <span className="badge info">Priority: {task.priority}</span>
          <span className="badge info">Workspace: {workspaceName}</span>
        </div>
        <div className="tabs">
          {['Overview', 'Phases', 'Execution Logs', 'Results', 'Settings'].map((tab) => (
            <button key={tab} className={activeTab === tab ? 'tab active' : 'tab'} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="grid-two">
        <div className="stack" style={{ gap: '1.5rem' }}>
          {activeTab === 'Overview' && (
            <>
              <div className="card">
                <div className="section-header">
                  <h2>Timeline</h2>
                  <button className="ghost">Execution Logs</button>
                </div>
                <div className="timeline">
                  {phases.map((phase) => (
                    <div className="timeline-item" key={phase.name}>
                      <span className="icon">
                        {renderStatusIcon(phase.status)}
                      </span>
                      <div>
                        <p>
                          <strong>{phase.name}</strong> · {phase.status}
                        </p>
                        <p className="workspace">{phase.summary}</p>
                        <p className="workspace">Duration: {phase.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="section-header">
                  <h2>Results</h2>
                  <button className="ghost">Download</button>
                </div>
                <p>Executive summary, structured datasets, and knowledge articles will appear here upon completion.</p>
              </div>
            </>
          )}

          {activeTab === 'Phases' && (
            <div className="card">
              <div className="section-header">
                <h2>Phases</h2>
                <button className="ghost">Edit phases</button>
              </div>
              <div className="timeline">
                {phases.map((phase) => (
                  <div key={phase.name} className="timeline-item">
                    <span className="icon" aria-hidden>
                      {renderStatusIcon(phase.status)}
                    </span>
                    <div>
                      <p style={{ margin: 0 }}>
                        <strong>{phase.name}</strong> · {phase.status} · ETA {phase.duration}
                      </p>
                      <p className="workspace">{phase.summary}</p>
                      <div className="task-tags">
                        <span className="badge info">Tools assigned</span>
                        <span className="badge info">Workflow linked</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Results' && (
            <div className="card">
              <div className="section-header">
                <h2>Results</h2>
                <button className="ghost">Publish to knowledge</button>
              </div>
              <div className="card-grid">
                {results.map((result) => (
                  <div key={result.title} className="card" style={{ borderStyle: 'dashed' }}>
                    <div className="section-header">
                      <strong>{result.title}</strong>
                      <span className="badge info">{result.status}</span>
                    </div>
                    <p className="workspace">{result.description}</p>
                    <div className="controls-inline">
                      <button className="ghost">Preview</button>
                      <button className="ghost">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="card">
              <div className="section-header">
                <h2>Settings</h2>
                <button className="ghost">Save</button>
              </div>
              <div className="stack" style={{ gap: '0.75rem' }}>
                <label>
                  <input type="checkbox" defaultChecked /> Notify on completion
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Require review before publishing
                </label>
                <label>
                  <input type="checkbox" /> Allow external connectors
                </label>
                <div className="controls-inline">
                  <input className="input" defaultValue="$1,200 budget" />
                  <input className="input" defaultValue="60 minute timeout" />
                </div>
              </div>
            </div>
          )}
        </div>
        <aside className="card">
          <h2>Status Panel</h2>
          <p>Current phase: {phases.find((phase) => phase.status === 'Running')?.name ?? 'N/A'}</p>
          <p>Elapsed time: 44m</p>
          <p>Budget: $420 / $1,200</p>
          <div className="stack" style={{ gap: '0.5rem' }}>
            <button className="primary">Notify me on completion</button>
            <button className="ghost">Add note</button>
            <button className="ghost">Pause</button>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p className="workspace">Upcoming transitions</p>
            <ul>
              <li>Analysis → Synthesis when signals processed</li>
              <li>Synthesis → Validation after reviewer approval</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default TaskDetailPage;
