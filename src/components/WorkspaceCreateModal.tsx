import { useEffect, useMemo, useState } from 'react';
import { workspaceTemplates } from '../data/mockData';

const colorPalette = ['#4f46e5', '#0ea5e9', '#f59e0b', '#22c55e', '#8b5cf6', '#ef4444'];
const iconPalette = ['🜁', '✦', '🏛️', '🌌', '🛠️', '🔬', '📑', '🚀'];

const memberDirectory = [
  { name: 'Nova Liang', role: 'Lead Researcher' },
  { name: 'Avery Chen', role: 'Analyst' },
  { name: 'Priya Kumar', role: 'Program Manager' },
  { name: 'Mina Alvarado', role: 'Tech Lead' },
  { name: 'Samira Patel', role: 'Researcher' }
];

type FormState = {
  name: string;
  description: string;
  color: string;
  icon: string;
  privacy: 'Private' | 'Public';
  members: string[];
  templateId: string;
};

type WorkspaceCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (workspace: {
    name: string;
    description: string;
    color: string;
    icon: string;
    privacy: string;
    members: number;
    role: string;
    domain: string;
  }) => void;
};

const WorkspaceCreateModal = ({ isOpen, onClose, onCreate }: WorkspaceCreateModalProps) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    color: colorPalette[0],
    icon: iconPalette[0],
    privacy: 'Private',
    members: ['Nova Liang'],
    templateId: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setForm({
        name: '',
        description: '',
        color: colorPalette[0],
        icon: iconPalette[0],
        privacy: 'Private',
        members: ['Nova Liang'],
        templateId: ''
      });
    }
  }, [isOpen]);

  const selectedTemplate = useMemo(
    () => workspaceTemplates.find((template) => template.id === form.templateId),
    [form.templateId]
  );

  useEffect(() => {
    if (selectedTemplate) {
      setForm((prev) => ({
        ...prev,
        color: selectedTemplate.color,
        icon: selectedTemplate.icon,
        description: prev.description || selectedTemplate.description
      }));
    }
  }, [selectedTemplate]);

  const updateField = (key: keyof FormState, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMember = (name: string) => {
    setForm((prev) => {
      const exists = prev.members.includes(name);
      return { ...prev, members: exists ? prev.members.filter((m) => m !== name) : [...prev.members, name] };
    });
  };

  const isValid =
    form.name.trim().length >= 3 &&
    form.description.trim().length >= 10 &&
    form.color &&
    form.icon &&
    form.privacy;

  const handleCreate = () => {
    if (!isValid) return;
    onCreate({
      name: form.name.trim(),
      description: form.description.trim(),
      color: form.color,
      icon: form.icon,
      privacy: form.privacy,
      members: form.members.length,
      role: 'Owner',
      domain: selectedTemplate?.name ?? 'Custom workspace'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal-header">
          <div>
            <p className="workspace">Create workspace</p>
            <h2 style={{ margin: 0 }}>Launch a new space</h2>
          </div>
          <button className="ghost" onClick={onClose} aria-label="Close create workspace">
            Close
          </button>
        </header>

        <div className="modal-grid">
          <div className="form-group">
            <label>Name</label>
            <input
              className="input"
              placeholder="Give your workspace a clear title"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
            <small className="hint">At least 3 characters.</small>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Describe what collaborators should expect here"
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
            <small className="hint">At least 10 characters.</small>
          </div>

          <div className="form-inline">
            <div className="form-group">
              <label>Color</label>
              <div className="color-grid">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    className={`color-swatch ${form.color === color ? 'active' : ''}`}
                    style={{ background: color }}
                    onClick={() => updateField('color', color)}
                    aria-label={`Choose color ${color}`}
                  />
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Icon</label>
              <div className="icon-grid">
                {iconPalette.map((icon) => (
                  <button
                    key={icon}
                    className={`icon-swatch ${form.icon === icon ? 'active' : ''}`}
                    onClick={() => updateField('icon', icon)}
                    aria-label={`Choose icon ${icon}`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Privacy</label>
            <div className="pill-row">
              {(['Private', 'Public'] as const).map((option) => (
                <button
                  key={option}
                  className={`pill ${form.privacy === option ? 'active' : ''}`}
                  onClick={() => updateField('privacy', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Members & roles</label>
            <div className="chip-row">
              {memberDirectory.map((member) => {
                const checked = form.members.includes(member.name);
                return (
                  <button
                    key={member.name}
                    className={`chip ${checked ? 'active' : ''}`}
                    onClick={() => toggleMember(member.name)}
                  >
                    <span className="avatar-circle">{member.name.charAt(0)}</span>
                    <span>
                      <strong>{member.name}</strong>
                      <span className="workspace"> · {member.role}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label>Templates</label>
            <div className="template-grid">
              {workspaceTemplates.map((template) => (
                <button
                  key={template.id}
                  className={`template-card ${form.templateId === template.id ? 'active' : ''}`}
                  onClick={() => updateField('templateId', template.id)}
                >
                  <div className="template-icon" style={{ background: template.color }}>
                    {template.icon}
                  </div>
                  <div>
                    <p className="template-title">{template.name}</p>
                    <p className="workspace">{template.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <button className="ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="primary" disabled={!isValid} onClick={handleCreate}>
            Create workspace
          </button>
        </footer>
      </div>
    </div>
  );
};

export default WorkspaceCreateModal;
