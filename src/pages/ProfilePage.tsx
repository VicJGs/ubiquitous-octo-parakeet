import { useState } from 'react';

const notificationMatrix = [
  { label: 'Task updates', channels: { email: true, inApp: true, sms: false } },
  { label: 'Security alerts', channels: { email: true, inApp: true, sms: true } },
  { label: 'Workspace invites', channels: { email: true, inApp: true, sms: false } },
  { label: 'Reports ready', channels: { email: false, inApp: true, sms: false } }
];

const connectedAccounts = [
  { provider: 'GitHub', status: 'Connected', lastSync: '5m ago' },
  { provider: 'Slack', status: 'Connected', lastSync: '18m ago' },
  { provider: 'Google', status: 'Not connected', lastSync: '—' }
];

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Nova Liang',
    email: 'nova@sagescope.ai',
    title: 'Lead Research Strategist',
    bio: 'Research lead specializing in emerging regulation and alignment safety.',
    timezone: 'UTC-8',
    language: 'English'
  });

  return (
    <div className="stack settings-layout">
      <header className="page-header">
        <div>
          <p className="workspace">Account</p>
          <h1 className="page-title">Profile &amp; Personal Settings</h1>
          <p className="muted">Manage how your profile appears across workspaces and control notifications, privacy, and connections.</p>
        </div>
        <div className="action-row">
          <button className="ghost">Cancel</button>
          <button className="primary">Save changes</button>
        </div>
      </header>

      <section className="card">
        <div className="section-header">
          <h2>Profile information</h2>
          <span className="badge info">Visible to teammates</span>
        </div>
        <div className="grid-two responsive">
          <div className="stack" style={{ gap: '0.75rem' }}>
            <label className="field">
              <span>Full name</span>
              <input
                className="input"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </label>
            <label className="field">
              <span>Title</span>
              <input
                className="input"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                className="input"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </label>
            <label className="field">
              <span>Bio</span>
              <textarea
                className="input"
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </label>
          </div>
          <div className="stack" style={{ gap: '0.75rem' }}>
            <label className="field">
              <span>Timezone</span>
              <select
                className="input"
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
              >
                <option>UTC</option>
                <option>UTC-8</option>
                <option>UTC-5</option>
                <option>UTC+1</option>
              </select>
            </label>
            <label className="field">
              <span>Language</span>
              <select
                className="input"
                value={profile.language}
                onChange={(e) => setProfile({ ...profile, language: e.target.value })}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </label>
            <label className="field">
              <span>Pronouns</span>
              <input className="input" placeholder="they/them" />
            </label>
            <label className="field">
              <span>Profile visibility</span>
              <select className="input">
                <option>Workspace members only</option>
                <option>All organization</option>
                <option>Private</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>Account security</h2>
          <div className="chip-row">
            <span className="badge success">Device check enabled</span>
            <span className="badge warning">Password rotation due in 7 days</span>
          </div>
        </div>
        <div className="grid-two responsive">
          <div className="stack">
            <p className="muted">Protect access to your account with multi-factor authentication and session controls.</p>
            <div className="security-actions">
              <button className="ghost">Change password</button>
              <button className="ghost">Configure MFA</button>
              <button className="ghost">Session management</button>
            </div>
          </div>
          <div className="stack" style={{ gap: '0.5rem' }}>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span>Login alerts for new devices</span>
            </label>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span>Require WebAuthn for admin actions</span>
            </label>
            <label className="toggle">
              <input type="checkbox" />
              <span>Auto-sign out after 30 minutes idle</span>
            </label>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>Notification matrix</h2>
          <p className="muted">Choose delivery channels per event type.</p>
        </div>
        <div className="notification-matrix">
          <div className="matrix-header">
            <span>Event</span>
            <span>Email</span>
            <span>In-app</span>
            <span>SMS</span>
          </div>
          {notificationMatrix.map((row) => (
            <div key={row.label} className="matrix-row">
              <span>{row.label}</span>
              <label className="toggle center">
                <input type="checkbox" defaultChecked={row.channels.email} />
              </label>
              <label className="toggle center">
                <input type="checkbox" defaultChecked={row.channels.inApp} />
              </label>
              <label className="toggle center">
                <input type="checkbox" defaultChecked={row.channels.sms} />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="card grid-two responsive" style={{ gap: '1.5rem' }}>
        <div className="stack" style={{ gap: '0.85rem' }}>
          <div className="section-header">
            <h2>Workspace preferences</h2>
            <span className="badge info">Applies across teams</span>
          </div>
          <label className="field">
            <span>Default workspace</span>
            <select className="input">
              <option>Atlas Research</option>
              <option>Nova Labs</option>
              <option>Orbital Ops</option>
            </select>
          </label>
          <label className="field">
            <span>Default project role</span>
            <select className="input">
              <option>Research lead</option>
              <option>Reviewer</option>
              <option>Observer</option>
            </select>
          </label>
          <label className="field">
            <span>Meeting availability</span>
            <input className="input" placeholder="Mon–Thu, 9am–2pm PT" />
          </label>
        </div>
        <div className="stack" style={{ gap: '0.85rem' }}>
          <div className="section-header">
            <h2>Interface preferences</h2>
            <span className="badge info">Device specific</span>
          </div>
          <label className="field">
            <span>Theme</span>
            <select className="input">
              <option>Adaptive (system)</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </label>
          <label className="field">
            <span>Density</span>
            <select className="input">
              <option>Comfortable</option>
              <option>Compact</option>
              <option>Spacious</option>
            </select>
          </label>
          <label className="field">
            <span>Keyboard shortcuts</span>
            <select className="input">
              <option>Default</option>
              <option>Vim-inspired</option>
              <option>Accessible</option>
            </select>
          </label>
        </div>
      </section>

      <section className="card grid-two responsive" style={{ gap: '1.5rem' }}>
        <div className="stack" style={{ gap: '0.85rem' }}>
          <div className="section-header">
            <h2>Connected accounts</h2>
            <p className="muted">Manage integrations that can access your profile and workspaces.</p>
          </div>
          <div className="integration-list">
            {connectedAccounts.map((account) => (
              <div key={account.provider} className="integration-row">
                <div>
                  <p className="integration-title">{account.provider}</p>
                  <p className="muted">Last sync: {account.lastSync}</p>
                </div>
                <div className="chip-row">
                  <span className={`badge ${account.status === 'Connected' ? 'success' : 'warning'}`}>{account.status}</span>
                  <button className="ghost">Manage</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="stack" style={{ gap: '0.85rem' }}>
          <div className="section-header">
            <h2>Data &amp; privacy</h2>
            <p className="muted">Control data retention and export options.</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span>Share activity for workspace analytics</span>
          </label>
          <label className="toggle">
            <input type="checkbox" />
            <span>Allow AI assistants to index drafts</span>
          </label>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span>Prompt to encrypt sensitive uploads</span>
          </label>
          <div className="action-row">
            <button className="ghost">Export data</button>
            <button className="ghost">Request deletion</button>
          </div>
        </div>
      </section>

      <section className="card danger">
        <div className="section-header">
          <div>
            <h2>Danger zone</h2>
            <p className="muted">Delete your account and remove associated personal data.</p>
          </div>
          <button className="secondary">Deactivate account</button>
        </div>
        <div className="danger-actions">
          <div>
            <p className="muted">Once deleted, your account cannot be recovered. Ensure exports are downloaded first.</p>
          </div>
          <button className="primary">Delete account</button>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
