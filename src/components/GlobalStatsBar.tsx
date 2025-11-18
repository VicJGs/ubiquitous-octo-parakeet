const stats = [
  { label: 'Active Tasks', value: 18, trend: '+3 this week' },
  { label: 'Running Workflows', value: 6, trend: '2 scheduled' },
  { label: 'Knowledge Updates', value: 42, trend: 'Last 7 days' },
  { label: 'Members Online', value: 27, trend: 'Across 4 workspaces' }
];

const GlobalStatsBar = () => (
  <section className="global-stats">
    {stats.map((stat) => (
      <div key={stat.label} className="stat">
        <p className="stat-label">{stat.label}</p>
        <p className="stat-value">{stat.value}</p>
        <p className="stat-trend">{stat.trend}</p>
      </div>
    ))}
  </section>
);

export default GlobalStatsBar;
