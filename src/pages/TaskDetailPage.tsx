import { useParams } from 'react-router-dom';
import { CircleOff, CheckCircle2, Hourglass, Zap } from 'lucide-react';
import { tasks } from '../data/mockData';

const phases = [
  { name: 'Planning', status: 'Completed', duration: '12m', summary: 'Framed objectives and scope.' },
  { name: 'Information Gathering', status: 'Completed', duration: '32m', summary: 'Aggregated reports and data pulls.' },
  { name: 'Analysis', status: 'Running', duration: '8m', summary: 'LLM summarization and scoring in progress.' },
  { name: 'Synthesis', status: 'Pending', duration: '-', summary: 'Awaiting upstream signals.' },
  { name: 'Validation', status: 'Pending', duration: '-', summary: 'Human review pending completion.' }
];

const TaskDetailPage = () => {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === id) ?? tasks[0];

  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Task Detail</p>
            <h1 style={{ margin: 0 }}>{task.name}</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="ghost">Edit</button>
            <button className="ghost">Cancel</button>
            <button className="ghost">Clone</button>
          </div>
        </div>
        <p>{task.objective}</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="badge info">Status: {task.status}</span>
          <span className="badge info">Priority: {task.priority}</span>
          <span className="badge info">Workspace: Atlas Research</span>
        </div>
      </section>

      <section className="grid-two">
        <div className="stack" style={{ gap: '1.5rem' }}>
          <div className="card">
            <div className="section-header">
              <h2>Timeline</h2>
              <button className="ghost">Execution Logs</button>
            </div>
            <div className="timeline">
              {phases.map((phase) => (
                <div className="timeline-item" key={phase.name}>
                  <span className="icon" aria-hidden>
                    {phase.status === 'Completed' && <CheckCircle2 size={18} />}
                    {phase.status === 'Running' && <Zap size={18} />}
                    {phase.status === 'Pending' && <Hourglass size={18} />}
                    {!['Completed', 'Running', 'Pending'].includes(phase.status) && <CircleOff size={18} />}
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
        </div>
        <aside className="card">
          <h2>Status Panel</h2>
          <p>Current phase: Analysis</p>
          <p>Elapsed time: 44m</p>
          <p>Budget: $420 / $1,200</p>
          <div className="stack" style={{ gap: '0.5rem' }}>
            <button className="primary">Notify me on completion</button>
            <button className="ghost">Add note</button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default TaskDetailPage;
