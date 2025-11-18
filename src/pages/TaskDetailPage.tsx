import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmptyState, ErrorToast, SkeletonBlock, SkeletonList } from '../components/AsyncStates';
import { mockData } from '../data/mockData';
import { useMockedData } from '../hooks/useMockedData';

const phases = [
  { name: 'Planning', status: 'Completed', duration: '12m', summary: 'Framed objectives and scope.' },
  { name: 'Information Gathering', status: 'Completed', duration: '32m', summary: 'Aggregated reports and data pulls.' },
  { name: 'Analysis', status: 'Running', duration: '8m', summary: 'LLM summarization and scoring in progress.' },
  { name: 'Synthesis', status: 'Pending', duration: '-', summary: 'Awaiting upstream signals.' },
  { name: 'Validation', status: 'Pending', duration: '-', summary: 'Human review pending completion.' }
];

const TaskDetailPage = () => {
  const { id } = useParams();
  const { data, loading, error, reload } = useMockedData(() => mockData.tasks, { failFirst: true });
  const task = useMemo(() => data?.find((t) => t.id === id), [data, id]);
  const workspaceName = useMemo(
    () => mockData.workspaces.find((ws) => ws.id === task?.workspaceId)?.name ?? 'Atlas Research',
    [task?.workspaceId]
  );

  if (loading) {
    return (
      <div className="stack">
        <SkeletonList count={1} />
        <div className="grid-two">
          <div className="stack" style={{ gap: '1.5rem' }}>
            <div className="card">
              <SkeletonBlock width="40%" />
              <SkeletonBlock width="70%" />
            </div>
            <div className="card">
              <SkeletonBlock width="30%" />
              <SkeletonBlock width="80%" />
            </div>
          </div>
          <div className="card">
            <SkeletonBlock width="50%" />
            <SkeletonBlock width="60%" />
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="stack">
        <EmptyState
          title="Task not found"
          message="We couldn't find that task. Try navigating from the task list instead."
          actionLabel="Back to tasks"
          to="/tasks"
        />
        <ErrorToast message={error} onRetry={reload} />
      </div>
    );
  }

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
                  <span className="icon">{phase.status === 'Completed' ? '✅' : phase.status === 'Running' ? '⚡️' : '⏳'}</span>
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
      <ErrorToast message={error} onRetry={reload} />
    </div>
  );
};

export default TaskDetailPage;
