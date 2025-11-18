import { ReactNode, useEffect, useMemo, useState } from 'react';
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
type ThemeMode = 'light' | 'dark';

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
        { label: 'Workflows', to: '/workflows', icon: '🕸️' },
        { label: 'Workflow Designer', to: '/workflow-designer', icon: '🎛️' },
        { label: 'Tasks', to: '/tasks', icon: '✅' },
        { label: 'Knowledge', to: '/knowledge', icon: '📚' }
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
        { label: 'Workflows', to: '/workflows', icon: '🕸️' },
        { label: 'Workflow Designer', to: '/workflow-designer', icon: '🎛️' },
        { label: 'Tasks', to: '/tasks', icon: '✅' },
        { label: 'Knowledge', to: '/knowledge', icon: '📚' }
      ]
    },
    { label: 'All Workflows', to: '/workflows', icon: '🌐' },
    { label: 'All Tasks', to: '/tasks', icon: '🗒️' },
    { label: 'All Knowledge databases', to: '/knowledge', icon: '🧭' },
    { label: 'Settings', to: '/profile', icon: '⚙️' }
  ],
  admin: [
    { label: 'Main page', to: '/home', icon: <Home {...iconProps} /> },
    { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard {...iconProps} /> },
    {
      label: 'My Workspaces',
      icon: <Folder {...iconProps} />,
      children: [
        { label: 'Workflows', to: '/workflows', icon: '🕸️' },
        { label: 'Workflow Designer', to: '/workflow-designer', icon: '🎛️' },
        { label: 'Tasks', to: '/tasks', icon: '✅' },
        { label: 'Knowledge', to: '/knowledge', icon: '📚' }
      ]
    },
    { label: 'All Workflows', to: '/workflows', icon: '🌐' },
    { label: 'All Tasks', to: '/tasks', icon: '🗒️' },
    { label: 'All Knowledge databases', to: '/knowledge', icon: '🧭' },
    { label: 'Settings', to: '/profile', icon: '⚙️' },
    { label: 'User permissions', to: '/profile', icon: '🛡️' }
  ]
};

const AppShell = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>('research');
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_COLLAPSE_KEY) === 'true';
  });
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem(STORAGE_THEME_KEY) as ThemeMode) || 'light';
  });

  const navItems = useMemo(() => navHierarchy[role], [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_COLLAPSE_KEY, String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem(STORAGE_THEME_KEY, theme);
  }, [theme]);

  return (
    <div className={cn('app-shell', collapsed && 'collapsed')}>
      <Navbar isBordered maxWidth="full" className="app-navbar">
        <NavbarBrand className="brand">
          <div className="brand-mark" aria-hidden>
            <LayoutGrid size={18} />
          </div>
          <div>
            <p className="app-name">SageScope</p>
            <p className="workspace">Atlas Research Workspace</p>
          </div>
        </div>
        <div className="nav-actions">
          <Input
            size="sm"
            placeholder="Search"
            startContent={<span aria-hidden="true">🔍</span>}
            className="nav-search"
          />
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
          <Button
            isIconOnly
            variant="light"
            radius="md"
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            onPress={() => setCollapsed((value) => !value)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>

          {!collapsed && (
            <div className="role-switcher" role="group" aria-label="Switch role">
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
          )}
        </div>

        <Divider className="sidebar-divider" />

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div key={item.label} className="nav-group">
              {item.to ? (
                <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                  <span className="icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="label">{item.label}</span>
                </NavLink>
              ) : (
                <div className="nav-label">
                  <span className="icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="label">{item.label}</span>
                </div>
              )}
              {item.children && (
                <div className="nav-children" role="group" aria-label={`${item.label} items`}>
                  {item.children.map((child) => (
                    <NavLink key={child.to} to={child.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                      <span className="icon" aria-hidden="true">
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

        <Card className="sidebar-footer" radius="lg" shadow="sm">
          <CardBody>
            <p className="footer-title">Workspaces</p>
            <div className="workspace-buttons">
              <Button fullWidth size="sm" variant="flat">
                Atlas Research
              </Button>
              <Button fullWidth size="sm" variant="flat">
                Nova Labs
              </Button>
            </div>
          </CardBody>
        </Card>
      </aside>

      <main className="app-content">
        <GlobalStatsBar />
        <div className="page-surface">{children}</div>
        <Spacer y={4} />
      </main>
    </div>
  );
};

export default AppShell;
