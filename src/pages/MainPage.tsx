import { useMemo, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Chip, Input, Spacer, Tabs, Tab, User } from '@heroui/react';
import { Link } from 'react-router-dom';
import { mockData } from '../data/mockData';
import { EmptyState, ErrorToast, SkeletonList } from '../components/AsyncStates';
import { useMockedData } from '../hooks/useMockedData';

const environmentName = 'SageScope Environment';

const summaryTiles = [
  { label: 'Workspaces', value: 18, trend: '+8% vs last week', tone: 'positive' },
  { label: 'Tasks', value: 124, trend: '+14% vs last week', tone: 'positive' },
  { label: 'Workflows', value: 52, trend: '−3% vs last week', tone: 'negative' },
  { label: 'Knowledge', value: 642, trend: '+21 articles added', tone: 'positive' },
  { label: 'Active users', value: 86, trend: '3 new invites', tone: 'neutral' }
];

const MainPage = () => {
  const { data: workspaceData, loading, error, reload } = useMockedData(() => mockData.workspaces, { failFirst: true });
  const [query, setQuery] = useState('');
  const workspaces = workspaceData ?? [];
  const filtered = useMemo(
    () => workspaces.filter((ws) => ws.name.toLowerCase().includes(query.toLowerCase())),
    [query, workspaces]
  );

  return (
    <div className="main-page">
      <Card className="environment-card">
        <CardHeader className="environment-header">
          <div>
            <p className="eyebrow">Environment</p>
            <h1>{environmentName}</h1>
            <p className="muted">Unified research operating space for your teams and automations.</p>
            <div className="environment-status">
              <Chip color="success" variant="flat" size="sm">
                Operational · All systems healthy
              </Chip>
              <Chip color="secondary" variant="flat" size="sm">
                Updated just now
              </Chip>
            </div>
          </div>
          <User
            name="Avery Chen"
            description="Research Lead"
            avatarProps={{ src: 'https://i.pravatar.cc/150?img=32' }}
          />
        </CardHeader>
        <CardBody className="environment-body">
          <Tabs aria-label="Environment tabs" size="md" radius="sm">
            <Tab key="overview" title="Overview">
              <div className="summary-grid">
                {summaryTiles.map((tile) => (
                  <Card key={tile.label} className="summary-tile">
                    <CardHeader className="summary-tile__header">
                      <p className="stat-title">{tile.label}</p>
                      <Chip
                        size="sm"
                        color={tile.tone === 'negative' ? 'danger' : tile.tone === 'neutral' ? 'default' : 'success'}
                        variant="flat"
                      >
                        {tile.trend}
                      </Chip>
                    </CardHeader>
                    <CardBody className="stat-value">{tile.value}</CardBody>
                  </Card>
                ))}
              </div>
              <Divider className="section-divider" />
              <div className="stat-grid">
                <Card>
                  <CardHeader className="stat-title">Active Workspaces</CardHeader>
                  <CardBody className="stat-value">12</CardBody>
                </Card>
                <Card>
                  <CardHeader className="stat-title">Running Tasks</CardHeader>
                  <CardBody className="stat-value">27</CardBody>
                </Card>
                <Card>
                  <CardHeader className="stat-title">Published Workflows</CardHeader>
                  <CardBody className="stat-value">44</CardBody>
                </Card>
                <Card>
                  <CardHeader className="stat-title">Knowledge Articles</CardHeader>
                  <CardBody className="stat-value">318</CardBody>
                </Card>
              </div>
            </Tab>
            <Tab key="updates" title="Recent updates">
              <div className="updates">
                <div className="update-row">
                  <Chip color="success" variant="flat">
                    Completed
                  </Chip>
                  <div>
                    <p className="update-title">Market Pulse workflow published</p>
                    <p className="muted">Nova Labs · 12m ago</p>
                  </div>
                </div>
                <div className="update-row">
                  <Chip color="primary" variant="flat">
                    Knowledge
                  </Chip>
                  <div>
                    <p className="update-title">AI Policy Landscape 2024 refreshed</p>
                    <p className="muted">Atlas Research · 1h ago</p>
                  </div>
                </div>
                <div className="update-row">
                  <Chip color="warning" variant="flat">
                    Running
                  </Chip>
                  <div>
                    <p className="update-title">Supply Chain Stress Test entering validation</p>
                    <p className="muted">RiskOps · 2h ago</p>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <Spacer y={6} />

      <section className="workspace-search">
        <div className="workspace-search__header">
          <div>
            <p className="eyebrow">My Workspaces</p>
            <h2>Search, view, and add</h2>
            <p className="muted">Find a workspace quickly or spin up a new one to start collaborating.</p>
          </div>
          <Button as={Link} to="/workspaces" color="primary">
            Add Workspace
          </Button>
        </div>
        <div className="workspace-search__controls">
          <Input
            aria-label="Search workspaces"
            placeholder="Search by name, description, or tags"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startContent={<span role="img" aria-label="search">🔍</span>}
          />
          <Button as={Link} to="/workspaces" variant="flat">
            View all
          </Button>
        </div>
        <div className="workspace-grid">
          {loading && <SkeletonList count={3} />}
          {!loading &&
            filtered.map((ws) => (
              <Card key={ws.id} className="workspace-card">
                <CardHeader className="workspace-card__header">
                  <div className="workspace-icon" style={{ backgroundColor: ws.color }} aria-hidden>
                    {ws.icon}
                  </div>
                  <div>
                    <p className="eyebrow">{ws.lastActivity}</p>
                    <h3>{ws.name}</h3>
                    <p className="muted">{ws.description}</p>
                  </div>
                </CardHeader>
                <CardBody className="workspace-card__body">
                  <div className="workspace-metrics">
                    <span>{ws.members} members</span>
                    <span>{ws.activeTasks} active tasks</span>
                    <span>{ws.workflows} workflows</span>
                  </div>
                  <div className="workspace-actions">
                    <Button as={Link} to={`/workspaces/${ws.id}`} size="sm" variant="flat">
                      View
                    </Button>
                    <Button as={Link} to={`/workspaces/${ws.id}`} size="sm" color="primary">
                      Open
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          {!loading && filtered.length === 0 && (
            <EmptyState
              title="No workspaces match"
              message="Try a different search or create a new workspace to get started."
              actionLabel="Browse workspaces"
              to="/workspaces"
            />
          )}
        </div>
      </section>
      <ErrorToast message={error} onRetry={reload} />
    </div>
  );
};

export default MainPage;
