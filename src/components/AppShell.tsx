import { ReactNode, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Chip, Divider, Input, Spacer, User } from '@heroui/react';
import GlobalStatsBar from './GlobalStatsBar';

type Role = 'research' | 'dev' | 'admin';

const navHierarchy: Record<Role, { label: string; to?: string; icon: string; children?: { label: string; to: string; icon: string }[] }[]> = {
  research: [
    { label: 'Main page', to: '/home', icon: '🏠' },
    { label: 'Dashboard', to: '/dashboard', icon: '📊' },
    {
      label: 'My Workspaces',
      icon: '🗂️',
      children: [
        { label: 'Workflows', to: '/workflow-designer', icon: '🕸️' },
        { label: 'Tasks', to: '/tasks', icon: '✅' },
        { label: 'Knowledge', to: '/knowledge', icon: '📚' }
      ]
    },
    { label: 'Settings', to: '/profile', icon: '⚙️' }
  ],
  dev: [
    { label: 'Main page', to: '/home', icon: '🏠' },
    { label: 'Dashboard', to: '/dashboard', icon: '📊' },
    {
      label: 'My Workspaces',
      icon: '🗂️',
      children: [
        { label: 'Workflows', to: '/workflow-designer', icon: '🕸️' },
        { label: 'Tasks', to: '/tasks', icon: '✅' },
        { label: 'Knowledge', to: '/knowledge', icon: '📚' }
      ]
    },
    { label: 'All Workflows', to: '/workflow-designer', icon: '🌐' },
    { label: 'All Tasks', to: '/tasks', icon: '🗒️' },
    { label: 'All Knowledge databases', to: '/knowledge', icon: '🧭' },
    { label: 'Settings', to: '/profile', icon: '⚙️' }
  ],
  admin: [
    { label: 'Main page', to: '/home', icon: '🏠' },
    { label: 'Dashboard', to: '/dashboard', icon: '📊' },
    {
      label: 'My Workspaces',
      icon: '🗂️',
      children: [
        { label: 'Workflows', to: '/workflow-designer', icon: '🕸️' },
        { label: 'Tasks', to: '/tasks', icon: '✅' },
        { label: 'Knowledge', to: '/knowledge', icon: '📚' }
      ]
    },
    { label: 'All Workflows', to: '/workflow-designer', icon: '🌐' },
    { label: 'All Tasks', to: '/tasks', icon: '🗒️' },
    { label: 'All Knowledge databases', to: '/knowledge', icon: '🧭' },
    { label: 'Settings', to: '/profile', icon: '⚙️' },
    { label: 'User permissions', to: '/profile', icon: '🛡️' }
  ]
};

const AppShell = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>('research');
  const [collapsed, setCollapsed] = useState(false);
  const navItems = useMemo(() => navHierarchy[role], [role]);

  return (
    <div className={`app-shell ${collapsed ? 'collapsed' : ''}`}>
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
          <Input size="sm" placeholder="Search" startContent={<span aria-hidden>🔍</span>} className="nav-search" />
          <Chip color="primary" variant="flat" className="role-chip">
            {role === 'research' && 'Research' }
            {role === 'dev' && 'Developer'}
            {role === 'admin' && 'Admin'}
          </Chip>
          <User
            name="Nova Liang"
            description="Lead Researcher"
            className="nav-user"
            avatarProps={{ src: 'https://i.pravatar.cc/150?img=12' }}
          />
        </div>
      </header>
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-top">
          <Button size="sm" variant="flat" onPress={() => setCollapsed((v) => !v)} aria-label="Toggle navigation">
            {collapsed ? 'Expand' : 'Collapse'}
          </Button>
          <Divider className="sidebar-divider" />
          <div className="role-switcher">
            <Button size="sm" variant={role === 'research' ? 'solid' : 'flat'} onPress={() => setRole('research')}>
              Research
            </Button>
            <Button size="sm" variant={role === 'dev' ? 'solid' : 'flat'} onPress={() => setRole('dev')}>
              Dev
            </Button>
            <Button size="sm" variant={role === 'admin' ? 'solid' : 'flat'} onPress={() => setRole('admin')}>
              Admin
            </Button>
          </div>
        </div>
        <nav>
          {navItems.map((item) => (
            <div key={item.label} className="nav-group">
              {item.to ? (
                <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                  <span className="icon" aria-hidden>
                    {item.icon}
                  </span>
                  <span className="label">{item.label}</span>
                </NavLink>
              ) : (
                <div className="nav-label">
                  <span className="icon" aria-hidden>
                    {item.icon}
                  </span>
                  <span className="label">{item.label}</span>
                </div>
              )}
              {item.children && (
                <div className="nav-children">
                  {item.children.map((child) => (
                    <NavLink key={child.to} to={child.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                      <span className="icon" aria-hidden>
                        {child.icon}
                      </span>
                      <span className="label">{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>Workspace Switcher</p>
          <Button fullWidth size="sm" variant="flat">
            Atlas Research
          </Button>
          <Button fullWidth size="sm" variant="flat">
            Nova Labs
          </Button>
        </div>
      </aside>
      <main>
        <GlobalStatsBar />
        <div className="page-container">{children}</div>
      </main>
      <Spacer y={4} />
    </div>
  );
};

export default AppShell;
