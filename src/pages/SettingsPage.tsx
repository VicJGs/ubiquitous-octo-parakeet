const SettingsPage = () => {
  return (
    <div className="stack settings-layout">
      <header className="page-header">
        <div>
          <p className="workspace">Workspace</p>
          <h1 className="page-title">Settings &amp; Policies</h1>
          <p className="muted">Configure workspace defaults, automation guardrails, and communications. Changes affect all members unless scoped.</p>
        </div>
        <div className="action-row">
          <button className="ghost">Cancel</button>
          <button className="primary">Save settings</button>
        </div>
      </header>

      <section className="card grid-two responsive" style={{ gap: '1.5rem' }}>
        <div className="stack" style={{ gap: '0.85rem' }}>
          <div className="section-header">
            <h2>Workspace defaults</h2>
            <span className="badge info">Org-wide</span>
          </div>
          <label className="field">
            <span>Default project template</span>
            <select className="input">
              <option>Risk assessment sprint</option>
              <option>Discovery research</option>
              <option>Compliance review</option>
            </select>
          </label>
          <label className="field">
            <span>Default reviewer group</span>
            <select className="input">
              <option>Research QA</option>
              <option>Engineering QA</option>
              <option>Policy board</option>
            </select>
          </label>
          <label className="field">
            <span>Working hours</span>
            <input className="input" placeholder="8am – 6pm local time" />
          </label>
        </div>
        <div className="stack" style={{ gap: '0.85rem' }}>
          <div className="section-header">
            <h2>Automation guardrails</h2>
            <span className="badge warning">Required</span>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span>Require human approval before external data sharing</span>
          </label>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span>Restrict AI actions to whitelisted domains</span>
          </label>
          <label className="toggle">
            <input type="checkbox" />
            <span>Block file downloads on unmanaged devices</span>
          </label>
          <label className="field">
            <span>Escalation contact</span>
            <input className="input" placeholder="security@sagescope.ai" />
          </label>
        </div>
      </section>

      <section className="card grid-two responsive" style={{ gap: '1.5rem' }}>
        <div className="stack" style={{ gap: '0.85rem' }}>
          <div className="section-header">
            <h2>Notification routing</h2>
            <p className="muted">Define defaults for how teams receive critical alerts.</p>
          </div>
          <label className="field">
            <span>Incident channel</span>
            <select className="input">
              <option>#incidents</option>
              <option>#security</option>
              <option>#operations</option>
            </select>
          </label>
          <label className="field">
            <span>Digest cadence</span>
            <select className="input">
              <option>Daily 9am</option>
              <option>Twice weekly</option>
              <option>Weekly</option>
            </select>
          </label>
          <label className="field">
            <span>Escalation window</span>
            <select className="input">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
            </select>
          </label>
        </div>
        <div className="stack" style={{ gap: '0.85rem' }}>
          <div className="section-header">
            <h2>Workspace preferences</h2>
            <p className="muted">How new members experience this workspace.</p>
          </div>
          <label className="field">
            <span>Landing page</span>
            <select className="input">
              <option>Dashboard</option>
              <option>Tasks</option>
              <option>Knowledge</option>
            </select>
          </label>
          <label className="field">
            <span>Default permission</span>
            <select className="input">
              <option>Member</option>
              <option>Contributor</option>
              <option>Observer</option>
            </select>
          </label>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span>Show onboarding checklist to new members</span>
          </label>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>Save states</h2>
          <p className="muted">Track when changes are staged versus committed.</p>
        </div>
        <div className="save-state-grid">
          <div className="save-state">
            <p className="save-state__label">Current draft</p>
            <p className="save-state__value">Unsubmitted changes</p>
            <p className="muted">Not yet applied. Visible only to admins.</p>
          </div>
          <div className="save-state">
            <p className="save-state__label">Last published</p>
            <p className="save-state__value">Today, 09:14 UTC</p>
            <p className="muted">Active policies for all teams.</p>
          </div>
          <div className="save-state">
            <p className="save-state__label">Rollback target</p>
            <p className="save-state__value">Yesterday, 17:40 UTC</p>
            <p className="muted">Revert if new settings cause issues.</p>
          </div>
        </div>
        <div className="action-row" style={{ marginTop: '1rem' }}>
          <button className="ghost">Discard draft</button>
          <button className="secondary">Publish changes</button>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
