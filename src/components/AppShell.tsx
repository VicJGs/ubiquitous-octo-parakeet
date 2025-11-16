import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import GlobalStatsBar from './GlobalStatsBar';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/workspaces', label: 'Workspaces' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/workflow-designer', label: 'Workflow Designer' },
  { to: '/knowledge', label: 'Knowledge' },
  { to: '/profile', label: 'Profile & Settings' }
];

const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="app-shell">
      <header className="global-nav">
        <div className="brand">
          <span className="logo" aria-hidden="true">
            ⧉
          </span>
          <div>
            <p className="app-name">SageScope</p>
            <p className="workspace">Atlas Research Workspace</p>
          </div>
        </div>
        <div className="nav-actions">
          <button className="ghost">Search</button>
          <button className="ghost">Notifications</button>
          <button className="ghost">Help</button>
        </div>
      </header>
      <aside className="sidebar">
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>Workspace Switcher</p>
          <button className="primary ghost">Atlas Research</button>
          <button className="secondary ghost">Nova Labs</button>
        </div>
      </aside>
      <main>
        <GlobalStatsBar />
        <div className="page-container">{children}</div>
      </main>
    </div>
  );
};

export default AppShell;
