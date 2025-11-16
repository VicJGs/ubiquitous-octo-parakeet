const ProfilePage = () => {
  return (
    <div className="stack">
      <section className="card">
        <div className="section-header">
          <div>
            <p className="workspace">Account</p>
            <h1 style={{ margin: 0 }}>Profile & Settings</h1>
          </div>
          <button className="primary">Save Changes</button>
        </div>
        <div className="grid-two">
          <div>
            <h2>Profile Information</h2>
            <div className="stack" style={{ gap: '0.75rem' }}>
              <input className="input" placeholder="Full name" defaultValue="Nova Liang" />
              <input className="input" placeholder="Email" defaultValue="nova@sagescope.ai" />
              <textarea className="input" rows={3} placeholder="Bio" defaultValue="Lead research strategist focusing on emerging regulation." />
            </div>
          </div>
          <div>
            <h2>Security</h2>
            <div className="stack" style={{ gap: '0.75rem' }}>
              <button className="ghost">Change password</button>
              <button className="ghost">Enable 2FA</button>
              <button className="ghost">Manage sessions</button>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Notification Preferences</h2>
        <div className="grid-two">
          <div>
            <h3>Task Notifications</h3>
            <label>
              <input type="checkbox" defaultChecked /> Task assigned to me
            </label>
            <br />
            <label>
              <input type="checkbox" defaultChecked /> Task completed
            </label>
          </div>
          <div>
            <h3>System</h3>
            <label>
              <input type="checkbox" /> System announcements
            </label>
            <br />
            <label>
              <input type="checkbox" defaultChecked /> Workspace invitations
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
