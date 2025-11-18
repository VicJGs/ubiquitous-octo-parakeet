import { ReactNode, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Chip, Divider, Input, Spacer, User } from '@heroui/react';
import {
  BarChart3,
  BookOpen,
  CheckSquare,
  Compass,
  FileText,
  Folder,
  Globe2,
  Home,
  LayoutDashboard,
  Network,
  Search,
  Settings,
  Shield,
  Workflow
} from 'lucide-react';
import GlobalStatsBar from './GlobalStatsBar';

type Role = 'research' | 'dev' | 'admin';

type NavItem = {
  label: string;
  to?: string;
  icon: ReactNode;
  children?: (Omit<NavItem, 'children'> & { to: string })[];
};

const iconProps = { size: 18, strokeWidth: 1.75, 'aria-hidden': true };

const navHierarchy: Record<Role, NavItem[]> = {
  research: [
    { label: 'Main page', to: '/home', icon: <Home {...iconProps} /> },
    { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard {...iconProps} /> },
    {
      label: 'My Workspaces',
      icon: <Folder {...iconProps} />,
      children: [
        { label: 'Workflows', to: '/workflow-designer', icon: <Workflow {...iconProps} /> },
        { label: 'Tasks', to: '/tasks', icon: <CheckSquare {...iconProps} /> },
        { label: 'Knowledge', to: '/knowledge', icon: <BookOpen {...iconProps} /> }
      ]
    },
    { label: 'Settings', to: '/profile', icon: <Settings {...iconProps} /> }
  ],
  dev: [
    { label: 'Main page', to: '/home', icon: <Home {...iconProps} /> },
    { label: 'Dashboard', to: '/dashboard', icon: <BarChart3 {...iconProps} /> },
    {
      label: 'My Workspaces',
      icon: <Folder {...iconProps} />,
      children: [
        { label: 'Workflows', to: '/workflow-designer', icon: <Workflow {...iconProps} /> },
        { label: 'Tasks', to: '/tasks', icon: <CheckSquare {...iconProps} /> },
        { label: 'Knowledge', to: '/knowledge', icon: <BookOpen {...iconProps} /> }
      ]
    },
    { label: 'All Workflows', to: '/workflow-designer', icon: <Network {...iconProps} /> },
    { label: 'All Tasks', to: '/tasks', icon: <FileText {...iconProps} /> },
    { label: 'All Knowledge databases', to: '/knowledge', icon: <Compass {...iconProps} /> },
    { label: 'Settings', to: '/profile', icon: <Settings {...iconProps} /> }
  ],
  admin: [
    { label: 'Main page', to: '/home', icon: <Home {...iconProps} /> },
    { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard {...iconProps} /> },
    {
      label: 'My Workspaces',
      icon: <Folder {...iconProps} />,
      children: [
        { label: 'Workflows', to: '/workflow-designer', icon: <Workflow {...iconProps} /> },
        { label: 'Tasks', to: '/tasks', icon: <CheckSquare {...iconProps} /> },
        { label: 'Knowledge', to: '/knowledge', icon: <BookOpen {...iconProps} /> }
      ]
    },
    { label: 'All Workflows', to: '/workflow-designer', icon: <Globe2 {...iconProps} /> },
    { label: 'All Tasks', to: '/tasks', icon: <FileText {...iconProps} /> },
    { label: 'All Knowledge databases', to: '/knowledge', icon: <Compass {...iconProps} /> },
    { label: 'Settings', to: '/profile', icon: <Settings {...iconProps} /> },
    { label: 'User permissions', to: '/profile', icon: <Shield {...iconProps} /> }
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
          <Input size="sm" placeholder="Search" startContent={<Search size={16} aria-hidden />} className="nav-search" />
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
