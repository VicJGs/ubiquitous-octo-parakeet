import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, Cog, Workflow } from 'lucide-react';
import { activityFeed, quickActions, upcomingItems } from '../data/mockData';

const metricCards = [
  { label: 'Active Tasks', value: 18, delta: '+12% WoW', trend: 'positive', to: '/tasks' },
  { label: 'Completed (30d)', value: 54, delta: '+8% MoM', trend: 'positive', to: '/tasks' },
  { label: 'Active Workflows', value: 6, delta: '2 running', trend: 'neutral', to: '/workflow-designer' },
  { label: 'Active Workspaces', value: 4, delta: '1 new invite', trend: 'neutral', to: '/workspaces' }
];

const currentWorkspaceId = 'atlas';
const currentWorkspaceName = 'Atlas Research';

const DashboardPage = () => {
  const [activityScope, setActivityScope] = useState<'current' | 'all'>('current');
  const [visibleActivityCount, setVisibleActivityCount] = useState(4);
  const [scheduleItems, setScheduleItems] = useState<typeof upcomingItems>([]);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);
  const [scheduleMessage, setScheduleMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setScheduleItems(upcomingItems);
      setIsLoadingSchedule(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const filteredActivities = useMemo(
    () =>
      activityFeed.filter(
        (activity) => activityScope === 'all' || activity.workspaceId === currentWorkspaceId
      ),
    [activityScope]
  );

  const visibleActivities = filteredActivities.slice(0, visibleActivityCount);
  const canLoadMore = visibleActivityCount < filteredActivities.length;

  const handleReschedule = (id: string) => {
    setScheduleItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, time: 'Rescheduled · Tomorrow · 14:00 UTC' } : item
      )
    );
    setScheduleMessage('Item rescheduled. Stakeholders have been notified.');
  };

  const handleCancel = (id: string) => {
    setScheduleItems((items) => items.filter((item) => item.id !== id));
    setScheduleMessage('Item cancelled. Automation paused.');
  };

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
        <p>
          {currentWorkspaceName} workspace · 3 running workflows · Motivation: "Yesterday you cleared 4
          tasks"
        </p>
      </section>

      <section className="card-grid">
        {metricCards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="card kpi-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="kpi-card__header">
              <p className="stat-label">{card.label}</p>
              <span className={`trend-badge ${card.trend}`}>{card.delta}</span>
            </div>
            <p className="stat-value">{card.value}</p>
            <p className="stat-trend">Tap to view details</p>
          </Link>
        ))}
      </section>

      <section className="grid-two">
        <div className="card">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <div>
              <button
                className={`ghost ${activityScope === 'current' ? 'active' : ''}`}
                onClick={() => setActivityScope('current')}
              >
                Current workspace
              </button>
              <button
                className={`ghost ${activityScope === 'all' ? 'active' : ''}`}
                onClick={() => setActivityScope('all')}
              >
                All workspaces
              </button>
            </div>
          </div>
            <div className="timeline">
              {activityFeed.map((activity) => (
                <div className="timeline-item" key={activity.id}>
                  <span className="icon" aria-hidden="true">
                    {activity.type === 'workflow' && <Workflow size={18} />}
                    {activity.type === 'knowledge' && <BookOpen size={18} />}
                    {activity.type === 'validation' && <CheckCircle2 size={18} />}
                    {!['workflow', 'knowledge', 'validation'].includes(activity.type) && <Cog size={18} />}
                  </span>
                  <div>
                    <p>
                      <strong>{activity.user}</strong> {activity.description}
                  </p>
                  <p className="workspace">
                    <Link to={`/workspaces/${activity.workspaceId}`} className="workspace-link">
                      {activity.workspace}
                    </Link>{' '}
                    · {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {visibleActivities.length === 0 && (
              <p className="muted">No activity yet. New updates will show up here.</p>
            )}
            {filteredActivities.length > 0 && (
              <button className="ghost" onClick={() => setVisibleActivityCount((count) => count + 3)} disabled={!canLoadMore}>
                {canLoadMore ? 'Load more' : 'No more activity'}
              </button>
            )}
          </div>
        </div>
        <div className="stack" style={{ gap: '1.5rem' }}>
          <div className="card">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="stack" style={{ gap: '0.75rem' }}>
              {mockData.quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className={`quick-action ${action.accent === 'primary' ? 'primary' : 'secondary'}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div>
                    <p className="quick-action__label">{action.label}</p>
                    <p className="quick-action__description">{action.description}</p>
                  </div>
                  <span aria-hidden>→</span>
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
              {mockData.schedules.map((item) => (
                <div key={item.id}>
                  <p style={{ margin: 0, fontWeight: 600 }}>{item.name}</p>
                  <p className="workspace" style={{ margin: 0 }}>
                    {item.time} · {item.workspace}
                  </p>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                    <Link
                      to={item.relatedTaskId ? `/tasks/${item.relatedTaskId}` : '/tasks'}
                      className="ghost"
                      style={{ textDecoration: 'none' }}
                    >
                      Reschedule
                    </Link>
                    <Link
                      to={item.relatedTaskId ? `/tasks/${item.relatedTaskId}` : '/tasks'}
                      className="ghost"
                      style={{ textDecoration: 'none' }}
                    >
                      Cancel
                    </Link>
                  </div>
                ))}
                {scheduleItems.length === 0 && (
                  <p className="muted">No items scheduled. Create a workflow run to populate this panel.</p>
                )}
                {scheduleMessage && <p className="status-message">{scheduleMessage}</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
