import { Link } from 'react-router-dom';
import { tasks } from '../data/mockData';

const TasksPage = () => {
  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Atlas Research</p>
            <h1 style={{ margin: 0 }}>Tasks</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input className="input" placeholder="Search tasks" />
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
            {tasks.map((task) => (
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
                  <button className="ghost">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TasksPage;
