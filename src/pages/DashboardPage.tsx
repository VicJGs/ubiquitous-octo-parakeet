import { Link } from 'react-router-dom';
import { activityFeed, quickActions, upcomingItems } from '../data/mockData';

const metricCards = [
  { label: 'Active Tasks', value: 18, delta: '+12% WoW' },
  { label: 'Completed (30d)', value: 54, delta: '+8% MoM' },
  { label: 'Active Workflows', value: 6, delta: '2 running' },
  { label: 'Active Workspaces', value: 4, delta: '1 new invite' }
];

const DashboardPage = () => {
  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Welcome back, Nova Liang</p>
            <h1 style={{ margin: 0 }}>Dashboard</h1>
          </div>
          <p>{new Date().toLocaleString()}</p>
        </div>
        <p>Atlas Research workspace · 3 running workflows · Motivation: "Yesterday you cleared 4 tasks"</p>
      </section>

      <section className="card-grid">
        {metricCards.map((card) => (
          <Link key={card.label} to="/tasks" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <p className="stat-label">{card.label}</p>
            <p className="stat-value">{card.value}</p>
            <p className="stat-trend">{card.delta}</p>
          </Link>
        ))}
      </section>

      <section className="grid-two">
        <div className="card">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <div>
              <button className="ghost">Current workspace</button>
              <button className="ghost">All workspaces</button>
            </div>
          </div>
          <div className="timeline">
            {activityFeed.map((activity) => (
              <div className="timeline-item" key={activity.id}>
                <span className="icon" aria-hidden="true">
                  {activity.type === 'workflow' ? '⚙️' : activity.type === 'knowledge' ? '📚' : '✅'}
                </span>
                <div>
                  <p>
                    <strong>{activity.user}</strong> {activity.description}
                  </p>
                  <p className="workspace">
                    {activity.workspace} · {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <button className="ghost">Load more</button>
          </div>
        </div>
        <div className="stack" style={{ gap: '1.5rem' }}>
          <div className="card">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="stack" style={{ gap: '0.75rem' }}>
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className={action.accent === 'primary' ? 'primary' : 'secondary'}
                  style={{ textDecoration: 'none' }}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="section-header">
              <h2>Upcoming & Scheduled</h2>
              <button className="ghost">Manage</button>
            </div>
            <div className="stack" style={{ gap: '1rem' }}>
              {upcomingItems.map((item) => (
                <div key={item.id}>
                  <p style={{ margin: 0, fontWeight: 600 }}>{item.name}</p>
                  <p className="workspace" style={{ margin: 0 }}>
                    {item.time} · {item.workspace}
                  </p>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                    <button className="ghost">Reschedule</button>
                    <button className="ghost">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
