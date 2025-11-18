import { ReactNode, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card, CardBody, Chip, Divider, Input, Navbar, NavbarBrand, Spacer, User } from '@heroui/react';
import { BarChart3, ChevronLeft, ChevronRight, Folder, Home, LayoutDashboard, LayoutGrid } from 'lucide-react';
import {
  FiBookOpen,
  FiCheckSquare,
  FiCompass,
  FiGlobe,
  FiList,
  FiSearch,
  FiSettings,
  FiShare2,
  FiShield,
  FiSliders,
  FiUser
} from 'react-icons/fi';
import GlobalStatsBar from './GlobalStatsBar';

const STORAGE_COLLAPSE_KEY = 'app-shell-collapsed';
const STORAGE_THEME_KEY = 'app-shell-theme';

type Role = 'research' | 'dev' | 'admin';
type ThemeMode = 'light' | 'dark';

type NavItem = {
  label: string;
  to?: string;
  icon: ReactNode;
  children?: (Omit<NavItem, 'children'> & { to: string })[];
};

const lucideIconProps = { size: 18, strokeWidth: 1.75, 'aria-hidden': true };
const reactIconProps = { size: 18, 'aria-hidden': true };

const navHierarchy: Record<Role, NavItem[]> = {
  research: [
    { label: 'Main page', to: '/home', icon: <Home {...lucideIconProps} /> },
    { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard {...lucideIconProps} /> },
    {
      label: 'My Workspaces',
      icon: <Folder {...lucideIconProps} />,
      children: [
        { label: 'Workflows', to: '/workflows', icon: <FiShare2 {...reactIconProps} /> },
        { label: 'Workflow Designer', to: '/workflow-designer', icon: <FiSliders {...reactIconProps} /> },
        { label: 'Tasks', to: '/tasks', icon: <FiCheckSquare {...reactIconProps} /> },
        { label: 'Knowledge', to: '/knowledge', icon: <FiBookOpen {...reactIconProps} /> }
      ]
    },
    { label: 'Profile', to: '/profile', icon: <FiUser {...reactIconProps} /> },
    { label: 'Settings', to: '/settings', icon: <FiSettings {...reactIconProps} /> }
  ],
  dev: [
    { label: 'Main page', to: '/home', icon: <Home {...lucideIconProps} /> },
    { label: 'Dashboard', to: '/dashboard', icon: <BarChart3 {...lucideIconProps} /> },
    {
      label: 'My Workspaces',
      icon: <Folder {...lucideIconProps} />,
      children: [
        { label: 'Workflows', to: '/workflows', icon: <FiShare2 {...reactIconProps} /> },
        { label: 'Workflow Designer', to: '/workflow-designer', icon: <FiSliders {...reactIconProps} /> },
        { label: 'Tasks', to: '/tasks', icon: <FiCheckSquare {...reactIconProps} /> },
        { label: 'Knowledge', to: '/knowledge', icon: <FiBookOpen {...reactIconProps} /> }
      ]
    },
    { label: 'All Workflows', to: '/workflows', icon: <FiGlobe {...reactIconProps} /> },
    { label: 'All Tasks', to: '/tasks', icon: <FiList {...reactIconProps} /> },
    { label: 'All Knowledge databases', to: '/knowledge', icon: <FiCompass {...reactIconProps} /> },
    { label: 'Profile', to: '/profile', icon: <FiUser {...reactIconProps} /> },
    { label: 'Settings', to: '/settings', icon: <FiSettings {...reactIconProps} /> }
  ],
  admin: [
    { label: 'Main page', to: '/home', icon: <Home {...lucideIconProps} /> },
    { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard {...lucideIconProps} /> },
    {
      label: 'My Workspaces',
      icon: <Folder {...lucideIconProps} />,
      children: [
        { label: 'Workflows', to: '/workflows', icon: <FiShare2 {...reactIconProps} /> },
        { label: 'Workflow Designer', to: '/workflow-designer', icon: <FiSliders {...reactIconProps} /> },
        { label: 'Tasks', to: '/tasks', icon: <FiCheckSquare {...reactIconProps} /> },
        { label: 'Knowledge', to: '/knowledge', icon: <FiBookOpen {...reactIconProps} /> }
      ]
    },
    { label: 'All Workflows', to: '/workflows', icon: <FiGlobe {...reactIconProps} /> },
    { label: 'All Tasks', to: '/tasks', icon: <FiList {...reactIconProps} /> },
    { label: 'All Knowledge databases', to: '/knowledge', icon: <FiCompass {...reactIconProps} /> },
    { label: 'Profile', to: '/profile', icon: <FiUser {...reactIconProps} /> },
    { label: 'Settings', to: '/settings', icon: <FiSettings {...reactIconProps} /> },
    { label: 'User permissions', to: '/admin/users', icon: <FiShield {...reactIconProps} /> }
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
    <div className={`app-shell ${collapsed ? 'collapsed' : ''}`}>
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
            <div className="sidebar-meta">
              <p className="app-name">SageScope</p>
              <p className="workspace">Atlas Research Workspace</p>
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

      <div className="main-area">
        <header className="topbar">
          <Navbar isBordered maxWidth="full" className="app-navbar">
            <NavbarBrand className="brand">
              <div className="brand-mark" aria-hidden>
                <LayoutGrid size={18} />
              </div>
              <div className="brand-copy">
                <p className="app-name">SageScope</p>
                <p className="workspace">Atlas Research Workspace</p>
              </div>
            </NavbarBrand>

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

            <div className="nav-actions">
              <Input
                size="sm"
                placeholder="Search"
                startContent={<FiSearch size={16} aria-hidden />}
                className="nav-search"
              />
              <Chip color="primary" variant="flat" className="role-chip">
                {role === 'research' && 'Research'}
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
          </Navbar>
        </header>

        <section className="app-main">
          <GlobalStatsBar />
          <main className="page-content" role="main">
            {children}
          </main>
          <Spacer y={4} />
        </section>
      </div>
    </div>
  );
};

export default AppShell;
