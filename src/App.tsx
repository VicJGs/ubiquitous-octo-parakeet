import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell';
import DashboardPage from './pages/DashboardPage';
import WorkspacesPage from './pages/WorkspacesPage';
import WorkspaceDetailPage from './pages/WorkspaceDetailPage';
import TaskCreationPage from './pages/TaskCreationPage';
import TasksPage from './pages/TasksPage';
import TaskDetailPage from './pages/TaskDetailPage';
import WorkflowDesignerPage from './pages/WorkflowDesignerPage';
import WorkflowsPage from './pages/WorkflowsPage';
import KnowledgePage from './pages/KnowledgePage';
import KnowledgeArticlePage from './pages/KnowledgeArticlePage';
import ProfilePage from './pages/ProfilePage';
import UserPermissionsPage from './pages/UserPermissionsPage';
import MainPage from './pages/MainPage';

const App = () => (
  <AppShell>
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/workspaces" element={<WorkspacesPage />} />
      <Route path="/workspaces/:id" element={<WorkspaceDetailPage />} />
      <Route path="/tasks/create" element={<TaskCreationPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/tasks/all" element={<TasksPage />} />
      <Route path="/tasks/:id" element={<TaskDetailPage />} />
      <Route path="/workflows" element={<WorkflowsPage />} />
      <Route path="/workflow-designer" element={<WorkflowDesignerPage />} />
      <Route path="/workflows" element={<WorkflowDesignerPage />} />
      <Route path="/knowledge" element={<KnowledgePage />} />
      <Route path="/knowledge/all" element={<KnowledgePage />} />
      <Route path="/knowledge/:id" element={<KnowledgeArticlePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/user-permissions" element={<UserPermissionsPage />} />
    </Routes>
  </AppShell>
);

export default App;
