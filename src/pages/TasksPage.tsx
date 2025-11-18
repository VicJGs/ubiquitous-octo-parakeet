import type { DragEvent } from 'react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { tasks as mockTasks } from '../data/mockData';

type Task = (typeof mockTasks)[number];

const statusColumns = ['Backlog', 'Pending', 'Running', 'Blocked', 'Review', 'Completed'];

const statusTransitions: Record<string, string[]> = {
  Backlog: ['Pending', 'Running'],
  Pending: ['Running', 'Blocked', 'Backlog'],
  Running: ['Review', 'Blocked', 'Completed'],
  Blocked: ['Pending', 'Running'],
  Review: ['Completed', 'Running'],
  Completed: []
};

const priorityOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 };

const TasksPage = () => {
  const [taskList, setTaskList] = useState<Task[]>(mockTasks);
  const [view, setView] = useState<'list' | 'grid' | 'kanban'>('list');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState<'createdDate' | 'priority' | 'name'>('createdDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const assignees = Array.from(new Set(taskList.map((task) => task.assignee)));

  const filteredTasks = useMemo(() => {
    const filtered = taskList.filter((task) => {
      const matchesSearch =
        task.name.toLowerCase().includes(search.toLowerCase()) ||
        task.objective.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === 'all' || task.assignee === assigneeFilter;
      const matchesTag =
        !tagFilter.trim() || task.tags?.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()));
      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee && matchesTag;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        return (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.createdDate.localeCompare(b.createdDate);
    });

    if (sortDirection === 'desc') {
      return [...sorted].reverse();
    }
    return sorted;
  }, [taskList, search, statusFilter, priorityFilter, assigneeFilter, tagFilter, sortBy, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / pageSize));
  const paginatedTasks = filteredTasks.slice((page - 1) * pageSize, page * pageSize);

  const toggleSelected = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const clearSelection = () => setSelected([]);

  const handleBulkComplete = () => {
    setTaskList((prev) => prev.map((task) => (selected.includes(task.id) ? { ...task, status: 'Completed' } : task)));
    setMessage(`Marked ${selected.length} task(s) as Completed`);
    clearSelection();
  };

  const handleBulkAssign = () => {
    setTaskList((prev) => prev.map((task) => (selected.includes(task.id) ? { ...task, assignee: 'You' } : task)));
    setMessage(`Assigned ${selected.length} task(s) to you`);
    clearSelection();
  };

  const onDragStart = (event: DragEvent, taskId: string) => {
    event.dataTransfer.setData('text/plain', taskId);
  };

  const onDrop = (event: DragEvent, targetStatus: string) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    setTaskList((prev) => {
      const task = prev.find((t) => t.id === taskId);
      if (!task) return prev;
      if (task.status === targetStatus) return prev;

      const allowedTargets = statusTransitions[task.status] ?? [];
      if (!allowedTargets.includes(targetStatus)) {
        setMessage(`Cannot move from ${task.status} to ${targetStatus}. Allowed: ${allowedTargets.join(', ') || 'None'}`);
        return prev;
      }

      setMessage(`Moved ${task.name} to ${targetStatus}`);
      return prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t));
    });
  };

  const onDragOver = (event: DragEvent) => event.preventDefault();

  const kanbanColumns = statusColumns.map((status) => ({
    status,
    tasks: filteredTasks.filter((task) => task.status === status)
  }));

  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Atlas Research</p>
            <h1 style={{ margin: 0 }}>Tasks</h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              className="input"
              placeholder="Search tasks"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Link to="/tasks/create" className="primary" style={{ textDecoration: 'none', color: '#fff' }}>
              Create Task
            </Link>
          </div>
        </div>
        <div className="controls-row">
          <div className="controls-group">
            <label className="control-label">Status</label>
            <select className="input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All</option>
              {statusColumns.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="controls-group">
            <label className="control-label">Priority</label>
            <select className="input" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="controls-group">
            <label className="control-label">Assignee</label>
            <select className="input" value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}>
              <option value="all">All</option>
              {assignees.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>
          <div className="controls-group">
            <label className="control-label">Tags</label>
            <input
              className="input"
              placeholder="Filter by tag"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            />
          </div>
          <div className="controls-group">
            <label className="control-label">Sort</label>
            <div className="controls-inline">
              <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
                <option value="createdDate">Created date</option>
                <option value="priority">Priority</option>
                <option value="name">Name</option>
              </select>
              <button className="ghost" onClick={() => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))}>
                {sortDirection === 'asc' ? '⬆️' : '⬇️'}
              </button>
            </div>
          </div>
          <div className="controls-group">
            <label className="control-label">View</label>
            <div className="controls-inline">
              <button className={view === 'grid' ? 'primary' : 'ghost'} onClick={() => setView('grid')}>
                Grid
              </button>
              <button className={view === 'list' ? 'primary' : 'ghost'} onClick={() => setView('list')}>
                List
              </button>
              <button className={view === 'kanban' ? 'primary' : 'ghost'} onClick={() => setView('kanban')}>
                Kanban
              </button>
            </div>
          </div>
        </div>
        <div className="controls-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="controls-inline" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="ghost" onClick={handleBulkComplete} disabled={!selected.length}>
              Complete selected
            </button>
            <button className="ghost" onClick={handleBulkAssign} disabled={!selected.length}>
              Assign to me
            </button>
            <button className="ghost" onClick={clearSelection} disabled={!selected.length}>
              Clear selection
            </button>
            {message && <span className="workspace">{message}</span>}
          </div>
          <span className="workspace">Showing {filteredTasks.length} of {taskList.length} tasks</span>
        </div>
      </section>

      {view === 'list' && (
        <section className="card">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selected.length === paginatedTasks.length && paginatedTasks.length > 0}
                    onChange={(e) =>
                      setSelected(e.target.checked ? paginatedTasks.map((task) => task.id) : [])
                    }
                  />
                </th>
                <th>Task</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Project</th>
                <th>Created</th>
                <th>Due</th>
                <th>Assignee</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(task.id)}
                      onChange={() => toggleSelected(task.id)}
                    />
                  </td>
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
                  <td>{task.dueDate}</td>
                  <td>{task.assignee}</td>
                  <td>{task.tags?.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button className="ghost" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="ghost"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </section>
      )}

      {view === 'grid' && (
        <section className="card">
          <div className="card-grid">
            {paginatedTasks.map((task) => (
              <div key={task.id} className="card task-card">
                <div className="section-header">
                  <Link to={`/tasks/${task.id}`}>{task.name}</Link>
                  <span className="badge info">{task.status}</span>
                </div>
                <p className="workspace">{task.objective}</p>
                <div className="task-meta">
                  <span>Priority: {task.priority}</span>
                  <span>Project: {task.project}</span>
                  <span>Assignee: {task.assignee}</span>
                  <span>Due: {task.dueDate}</span>
                </div>
                <div className="task-tags">
                  {task.tags?.map((tag) => (
                    <span key={tag} className="badge info">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="controls-inline" style={{ justifyContent: 'space-between' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selected.includes(task.id)}
                      onChange={() => toggleSelected(task.id)}
                    />{' '}
                    Select
                  </label>
                  <span className="workspace">Created: {task.createdDate}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button className="ghost" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="ghost"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </section>
      )}

      {view === 'kanban' && (
        <section className="card kanban-board">
          <div className="section-header" style={{ marginBottom: '1rem' }}>
            <h2>Kanban (drag tasks to allowed status transitions)</h2>
            <span className="workspace">Allowed moves respect the workflow policy per column</span>
          </div>
          <div className="kanban-columns">
            {kanbanColumns.map((column) => (
              <div
                key={column.status}
                className="kanban-column"
                onDragOver={onDragOver}
                onDrop={(event) => onDrop(event, column.status)}
              >
                <div className="kanban-column-header">
                  <strong>{column.status}</strong>
                  <span className="badge info">{column.tasks.length}</span>
                  <p className="workspace">Allowed: {(statusTransitions[column.status] || []).join(', ') || 'N/A'}</p>
                </div>
                <div className="kanban-column-body">
                  {column.tasks.map((task) => (
                    <article
                      key={task.id}
                      className="kanban-card"
                      draggable
                      onDragStart={(event) => onDragStart(event, task.id)}
                    >
                      <div className="section-header">
                        <Link to={`/tasks/${task.id}`}>{task.name}</Link>
                        <span className="badge info">{task.priority}</span>
                      </div>
                      <p className="workspace">{task.objective}</p>
                      <div className="task-meta">
                        <span>Assignee: {task.assignee}</span>
                        <span>Effort: {task.effort}</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                      <div className="task-tags">
                        {task.tags?.map((tag) => (
                          <span key={tag} className="badge info">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TasksPage;
