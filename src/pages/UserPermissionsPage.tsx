import { FiShield } from 'react-icons/fi';

const users = [
  { name: 'Nova Liang', role: 'Admin', workspaces: 'Atlas Research, Nova Labs', status: 'Active' },
  { name: 'Priya Raman', role: 'Maintainer', workspaces: 'Atlas Research', status: 'Active' },
  { name: 'Evan Soto', role: 'Contributor', workspaces: 'Nova Labs', status: 'Active' },
  { name: 'Lina Chen', role: 'Observer', workspaces: 'Orbital Ops', status: 'Invited' }
];

const invitations = [
  { email: 'taylor@orbital.ai', role: 'Contributor', workspace: 'Orbital Ops', invited: 'Today' },
  { email: 'devon@sagescope.ai', role: 'Observer', workspace: 'Atlas Research', invited: '2 days ago' }
];

const auditLog = [
  { actor: 'Nova Liang', action: 'Promoted Priya Raman to Maintainer', time: '5m ago' },
  { actor: 'Priya Raman', action: 'Removed access to Legacy Sandbox workspace', time: '22m ago' },
  { actor: 'System', action: 'Auto-expired invitation to alex@vendor.ai', time: '1h ago' }
];

const UserPermissionsPage = () => {
  return (
    <div className="stack settings-layout">
      <header className="page-header">
        <div>
          <p className="workspace">Admin</p>
          <h1 className="page-title">User permissions</h1>
          <p className="muted">Manage membership, enforce least privilege, and review recent access changes.</p>
        </div>
        <div className="action-row">
          <button className="ghost">Cancel</button>
          <button className="primary">Save access changes</button>
        </div>
      </header>

      <section className="card">
        <div className="section-header">
          <h2>User directory</h2>
          <div className="chip-row">
            <span className="badge info">42 members</span>
            <button className="ghost">Invite users</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Workspaces</th>
                <th>Status</th>
                <th>Bulk</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.name}>
                  <td>{user.name}</td>
                  <td>
                    <select className="input">
                      <option value={user.role}>{user.role}</option>
                      <option>Admin</option>
                      <option>Maintainer</option>
                      <option>Contributor</option>
                      <option>Observer</option>
                    </select>
                  </td>
                  <td>{user.workspaces}</td>
                  <td>
                    <span className={`badge ${user.status === 'Active' ? 'success' : 'warning'}`}>{user.status}</span>
                  </td>
                  <td>
                    <input type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="action-row" style={{ marginTop: '0.75rem' }}>
          <select className="input" style={{ maxWidth: '240px' }}>
            <option>Bulk action</option>
            <option>Set role: Admin</option>
            <option>Set role: Maintainer</option>
            <option>Set role: Contributor</option>
            <option>Set role: Observer</option>
          </select>
          <button className="secondary">Apply to selected</button>
        </div>
      </section>

      <section className="card grid-two responsive" style={{ gap: '1.5rem' }}>
        <div className="stack" style={{ gap: '0.75rem' }}>
          <div className="section-header">
            <h2>Workspace mappings</h2>
            <p className="muted">Scope roles per workspace.</p>
          </div>
          <div className="mapping-list">
            <div className="mapping-row">
              <div>
                <p className="integration-title">Atlas Research</p>
                <p className="muted">Primary production workspace</p>
              </div>
              <select className="input">
                <option>Maintainer</option>
                <option>Admin</option>
                <option>Contributor</option>
                <option>Observer</option>
              </select>
            </div>
            <div className="mapping-row">
              <div>
                <p className="integration-title">Nova Labs</p>
                <p className="muted">R&amp;D staging environment</p>
              </div>
              <select className="input">
                <option>Contributor</option>
                <option>Admin</option>
                <option>Maintainer</option>
                <option>Observer</option>
              </select>
            </div>
            <div className="mapping-row">
              <div>
                <p className="integration-title">Orbital Ops</p>
                <p className="muted">Vendor collaboration space</p>
              </div>
              <select className="input">
                <option>Observer</option>
                <option>Admin</option>
                <option>Maintainer</option>
                <option>Contributor</option>
              </select>
            </div>
          </div>
        </div>
        <div className="stack" style={{ gap: '0.75rem' }}>
          <div className="section-header">
            <h2>Invitations</h2>
            <p className="muted">Pending approvals and invites.</p>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Workspace</th>
                  <th>Invited</th>
                </tr>
              </thead>
              <tbody>
                {invitations.map((invite) => (
                  <tr key={invite.email}>
                    <td>{invite.email}</td>
                    <td>{invite.role}</td>
                    <td>{invite.workspace}</td>
                    <td>{invite.invited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="action-row">
            <button className="ghost">Resend</button>
            <button className="ghost">Revoke</button>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>Audit trail</h2>
          <p className="muted">Recent permission changes.</p>
        </div>
        <div className="timeline">
          {auditLog.map((entry) => (
            <div className="timeline-item" key={entry.action}>
              <div className="icon" aria-hidden>
                <FiShield size={16} />
              </div>
              <div>
                <p className="update-title">{entry.action}</p>
                <p className="muted">
                  {entry.actor} • {entry.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserPermissionsPage;
