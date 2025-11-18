import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState, ErrorToast, SkeletonTable } from '../components/AsyncStates';
import { mockData } from '../data/mockData';
import { useMockedData } from '../hooks/useMockedData';

const TasksPage = () => {
  const { data, loading, error, reload } = useMockedData(() => mockData.tasks, { failFirst: true });
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => (data ?? []).filter((task) => task.name.toLowerCase().includes(query.toLowerCase())),
    [data, query]
  );

  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Atlas Research</p>
            <h1 style={{ margin: 0 }}>Tasks</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              className="input"
              placeholder="Search tasks"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Link to="/tasks/create" className="primary" style={{ textDecoration: 'none', color: '#fff' }}>
              Create Task
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="ghost">Grid</button>
          <button className="ghost">List</button>
          <button className="ghost">Kanban</button>
          <button className="ghost">Filters</button>
          <button className="ghost">Sort</button>
        </div>
      </section>

      <section className="card">
        {loading && <SkeletonTable rows={5} />}
        {!loading && (
          <table className="table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Project</th>
                <th>Created</th>
                <th>Assignee</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((task) => (
                <tr key={task.id}>
                  <td>
                    <Link to={`/tasks/${task.id}`}>{task.name}</Link>
                    <p className="workspace" style={{ margin: 0 }}>
                      {task.objective}
                    </p>
                  </td>
                  <td>
                    <span className="badge info">{task.status}</span>
                  </td>
                  <td>{task.priority}</td>
                  <td>{task.project}</td>
                  <td>{task.createdDate}</td>
                  <td>{task.assignee}</td>
                  <td>
                    <Link className="ghost" to={`/tasks/${task.id}`}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && filtered.length === 0 && (
          <EmptyState
            title="No tasks found"
            message="Try another search or start a new task."
            actionLabel="Create a task"
            to="/tasks/create"
          />
        )}
      </section>
      <ErrorToast message={error} onRetry={reload} />
    </div>
  );
};

export default TasksPage;
