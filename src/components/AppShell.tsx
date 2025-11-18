import { ReactNode, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spacer,
  Switch,
  Tooltip,
  User,
} from '@heroui/react';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Compass,
  FolderKanban,
  Globe2,
  Home,
  LayoutDashboard,
  LayoutGrid,
  ListTodo,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Workflow,
} from 'lucide-react';
import GlobalStatsBar from './GlobalStatsBar';

type Role = 'research' | 'dev' | 'admin';
type ThemeMode = 'light' | 'dark';

type NavItem = {
  label: string;
  to?: string;
  icon: LucideIcon;
  children?: NavItem[];
};

const navHierarchy: Record<Role, NavItem[]> = {
  research: [
    { label: 'Main page', to: '/home', icon: Home },
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    {
      label: 'My Workspaces',
      icon: FolderKanban,
      children: [
        { label: 'Workflows', to: '/workflow-designer', icon: Workflow },
        { label: 'Tasks', to: '/tasks', icon: CheckSquare },
        { label: 'Knowledge', to: '/knowledge', icon: BookOpen },
      ],
    },
    { label: 'Settings', to: '/profile', icon: Settings },
  ],
  dev: [
    { label: 'Main page', to: '/home', icon: Home },
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    {
      label: 'My Workspaces',
      icon: FolderKanban,
      children: [
        { label: 'Workflows', to: '/workflow-designer', icon: Workflow },
        { label: 'Tasks', to: '/tasks', icon: CheckSquare },
        { label: 'Knowledge', to: '/knowledge', icon: BookOpen },
      ],
    },
    { label: 'All Workflows', to: '/workflows', icon: Globe2 },
    { label: 'All Tasks', to: '/tasks/all', icon: ListTodo },
    { label: 'All Knowledge databases', to: '/knowledge/all', icon: Compass },
    { label: 'Settings', to: '/profile', icon: Settings },
  ],
  admin: [
    { label: 'Main page', to: '/home', icon: Home },
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    {
      label: 'My Workspaces',
      icon: FolderKanban,
      children: [
        { label: 'Workflows', to: '/workflow-designer', icon: Workflow },
        { label: 'Tasks', to: '/tasks', icon: CheckSquare },
        { label: 'Knowledge', to: '/knowledge', icon: BookOpen },
      ],
    },
    { label: 'All Workflows', to: '/workflows', icon: Globe2 },
    { label: 'All Tasks', to: '/tasks/all', icon: ListTodo },
    { label: 'All Knowledge databases', to: '/knowledge/all', icon: Compass },
    { label: 'User permissions', to: '/user-permissions', icon: ShieldCheck },
    { label: 'Settings', to: '/profile', icon: Settings },
  ],
};

const STORAGE_COLLAPSE_KEY = 'sagescope:sidebar-collapsed';
const STORAGE_THEME_KEY = 'sagescope:theme';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const SidebarLink = ({ item, collapsed, isChild = false }: { item: NavItem; collapsed: boolean; isChild?: boolean }) => {
  const content = (
    <NavLink
      to={item.to || '#'}
      className={({ isActive }) =>
        cn('sidebar-link', isChild && 'sidebar-link-child', isActive && 'active', collapsed && 'is-collapsed')
      }
    >
      <item.icon className="nav-icon" size={18} aria-hidden />
      {!collapsed && <span className="label">{item.label}</span>}
    </NavLink>
  );

  if (collapsed) {
    return (
      <Tooltip placement="right" content={item.label} closeDelay={0} offset={12}>
        {content}
      </Tooltip>
    );
  }

  return content;
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
        </NavbarBrand>
        <NavbarContent justify="center" className="navbar-center">
          <NavbarItem className="navbar-search">
            <Input
              aria-label="Search"
              placeholder="Search workspaces, tasks, or knowledge"
              startContent={<Search className="muted" size={18} aria-hidden />}
              size="sm"
              variant="bordered"
            />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="nav-actions">
          <NavbarItem>
            <Switch
              aria-label="Toggle theme"
              size="sm"
              color="secondary"
              isSelected={theme === 'dark'}
              thumbIcon={({ isSelected }) => (isSelected ? <Moon size={14} /> : <Sun size={14} />)}
              onChange={(ev) => setTheme(ev.target.checked ? 'dark' : 'light')}
            />
          </NavbarItem>
          <NavbarItem>
            <Chip color="primary" variant="flat" className="role-chip">
              {role === 'research' && 'Research'}
              {role === 'dev' && 'Developer'}
              {role === 'admin' && 'Admin'}
            </Chip>
          </NavbarItem>
          <NavbarItem>
            <User
              name="Nova Liang"
              description="Lead Researcher"
              className="nav-user"
              avatarProps={{ src: 'https://i.pravatar.cc/150?img=12' }}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <aside className={cn('sidebar-panel', collapsed && 'collapsed')} aria-label="Main navigation">
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
                <SidebarLink item={item} collapsed={collapsed} />
              ) : (
                <div className="nav-label">
                  <item.icon className="nav-icon" size={18} aria-hidden />
                  {!collapsed && <span className="label">{item.label}</span>}
                </div>
              )}
              {item.children && (
                <div className="nav-children" role="group" aria-label={`${item.label} items`}>
                  {item.children.map((child) => (
                    <SidebarLink key={child.label} item={child} isChild collapsed={collapsed} />
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
