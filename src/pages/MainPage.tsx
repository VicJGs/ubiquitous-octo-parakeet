import { useMemo, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Chip, Input, Spacer, Tabs, Tab, User } from '@heroui/react';
import { workspaces } from '../data/mockData';

const environmentName = 'SageScope Environment';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => workspaces.filter((ws) => ws.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="main-page">
      <Card className="environment-card">
        <CardHeader className="environment-header">
          <div>
            <p className="eyebrow">Environment</p>
            <h1>{environmentName}</h1>
            <p className="muted">Unified research operating space for your teams and automations.</p>
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
          <Button color="primary">Add Workspace</Button>
        </div>
        <div className="workspace-search__controls">
          <Input
            aria-label="Search workspaces"
            placeholder="Search workspaces..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startContent={<span role="img" aria-label="search">🔍</span>}
          />
          <Button variant="flat">View all</Button>
        </div>
        <div className="workspace-grid">
          {filtered.map((ws) => (
            <Card key={ws.id} className="workspace-card">
              <CardHeader className="workspace-card__header">
                <div className="workspace-icon" style={{ backgroundColor: ws.color }} aria-hidden="true">
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
                  <Button size="sm" variant="flat">
                    View
                  </Button>
                  <Button size="sm" color="primary">
                    Open
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
          {filtered.length === 0 && <p className="muted">No workspaces found. Try a different search.</p>}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
