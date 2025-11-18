import { useMemo, useState } from 'react';
import { knowledgeCategories } from '../data/mockData';

const KnowledgeEditorPage = () => {
  const [title, setTitle] = useState('New knowledge article');
  const [visibility, setVisibility] = useState('workspace');
  const [autosaveMessage, setAutosaveMessage] = useState('Saved just now');
  const categories = useMemo(() => knowledgeCategories.map((c) => c.name), []);

  return (
    <div className="stack">
      <div className="section-header">
        <div>
          <p className="workspace">Editor</p>
          <h1 style={{ margin: 0 }}>Compose knowledge</h1>
        </div>
        <div className="pill-row">
          <span className="badge info">{autosaveMessage}</span>
          <button className="ghost">Preview</button>
          <button className="primary">Publish</button>
        </div>
      </div>

      <section className="grid-two">
        <div className="card stack">
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ fontSize: '1.2rem', fontWeight: 600 }}
          />
          <div className="toolbar">
            <button className="ghost">Bold</button>
            <button className="ghost">Italic</button>
            <button className="ghost">Heading</button>
            <button className="ghost">Bullet</button>
            <button className="ghost">Checklist</button>
            <button className="ghost">Table</button>
            <button className="ghost">Code</button>
            <button className="ghost">Insert media</button>
          </div>
          <div className="editor-area" role="textbox" aria-label="Rich text editor" contentEditable suppressContentEditableWarning>
            <p>
              Draft guidance goes here. Highlight insights, embed diagrams, and use the metadata panel to categorize content
              for discovery.
            </p>
          </div>
          <div className="pill-row" style={{ justifyContent: 'flex-end' }}>
            <button className="ghost" onClick={() => setAutosaveMessage('Saved as draft')}>
              Save draft
            </button>
            <button className="primary">Publish</button>
          </div>
        </div>

        <aside className="stack">
          <div className="card stack">
            <p className="workspace" style={{ margin: 0 }}>
              Metadata
            </p>
            <label className="field">
              <span>Category</span>
              <select className="input">
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Tags</span>
              <input className="input" placeholder="Add tags" />
            </label>
            <label className="field">
              <span>Visibility</span>
              <select className="input" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                <option value="workspace">Workspace</option>
                <option value="organization">Organization</option>
                <option value="private">Private draft</option>
              </select>
            </label>
            <label className="field">
              <span>Schedule</span>
              <input className="input" type="datetime-local" />
            </label>
            <label className="field">
              <span>SEO summary</span>
              <textarea className="input" placeholder="One-line summary for search" />
            </label>
          </div>

          <div className="card stack">
            <p className="workspace" style={{ margin: 0 }}>
              Versioning
            </p>
            <div className="meta-list">
              <div className="meta-row">
                <span>Status</span>
                <span className="badge">Draft</span>
              </div>
              <div className="meta-row">
                <span>Autosave</span>
                <span>{autosaveMessage}</span>
              </div>
              <div className="meta-row">
                <span>Last edited by</span>
                <span>Nova Liang</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default KnowledgeEditorPage;
