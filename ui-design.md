# AI-Powered Research System — UI Design Blueprint

This blueprint translates the provided specification into a cohesive, implementation-ready UI plan. Each section includes structure, content guidance, and interaction notes so product, design, and engineering partners share a common reference.

## 1. Global Experience

### 1.1 Visual Language
- **Tone:** Enterprise-grade intelligence + approachable usability. Clean geometry, restrained palette, light borders, purposeful shadows.
- **Color Palette:**
  - Primary action: `#316BFF` (blue) with darker hover `#1F4BD8`.
  - Secondary action: `#556070` neutral blue-gray.
  - Backgrounds: `#F7F9FC` body, `#FFFFFF` surfaces, `#101828` text.
  - Semantic: success `#12B76A`, warning `#F79009`, danger `#F04438`, info `#2E90FA`.
- **Typography:** Sans-serif family (e.g., Inter). Headings 32/24/20px, body 16px, metadata 13-14px. Use weight to signal hierarchy (700/600/500/400).
- **Spacing:** 8px grid. 8px micro, 16–24px inter-section, 32px+ for page-level divisions.
- **Components:**
  - Buttons: 6px radius, subtle drop shadow `0 1px 2px rgba(16,24,40,0.05)`.
  - Cards: 8px radius, 1px border `#E4E7EC`, optional shadow `0 4px 8px rgba(15,23,42,0.08)`.
  - Inputs: 1px border, focus ring `0 0 0 3px rgba(49,107,255,0.15)`.
- **Interaction:** Hover elevations, keyboard focus ring `#98A2B3`, 200ms ease transitions. Skeletons for load, toast for alerts.

### 1.2 Global Navigation
```
┌────────────────────────────────────────────────────────────────────────┐
│Logo | Workspace Switcher ▾ | Global Search ⌘K | Notifications 🔔 | User│
└────────────────────────────────────────────────────────────────────────┘
```
- Fixed top bar, subtle backdrop blur.
- Workspace switcher reveals list + quick stats.
- Global search opens command menu modal.
- User menu: Profile, Preferences, Docs, Sign Out.

### 1.3 Responsive Behavior
- **Desktop (≥1024px):** Persistent sidebar, multi-column layouts.
- **Tablet (768–1023px):** Collapsible sidebar, stacked cards, two-column forms.
- **Mobile (<768px):** Hamburger nav, single-column cards, full-height modals, 48px touch targets.

---

## 2. Dashboard Page

### 2.1 Layout Overview
```
[Workspace Context Bar]
[Welcome Header & Overview]
[Stats Cards x4]
[Main Grid]
 ├─ Recent Activity Timeline
 ├─ Quick Actions
 └─ Upcoming & Scheduled
```

1. **Workspace Context Bar**: Workspace name + icon, dropdown, description, inline stats (active tasks/workflows/knowledge). Right side quick switch.
2. **Welcome Header**: “Good morning, Alex” + date/time, motivational blurb/achievement.
3. **Stats Cards** (row of four, responsive wrap): metric, label, trend arrow + %, clickable.
4. **Recent Activity**: Timeline list (15–20 items), filter chips (All / Current workspace). Each item = icon + description + user + workspace link + relative time. “Load more” button.
5. **Quick Actions**: Four pill buttons with icons (Task, Workflow, Workspace, Knowledge). Soft gradient background to stand out.
6. **Upcoming & Scheduled**: Table-like cards sorted chronologically, includes reschedule/cancel menu.

---

## 3. Workspaces

### 3.1 Workspaces List Page
- **Header Row:** Title + description snippet, “Create Workspace” primary button, view toggle (grid/list icons), search bar.
- **Filter/Sort Toolbar:** Role filter pills (Owner/Admin/etc.), sort dropdown (recent, alpha, active, created), optional sidebar for advanced filters.

#### Grid View Card Blueprint
```
[Icon + Color strip]
Workspace Name (heading)
Description (2 lines)
Member avatars + count | Active tasks chip | Last activity
Overflow menu ⋮
```
- Hover lifts card 4px, entire card clickable.

#### List View Table Columns
`Name | Description | Members | Active Tasks | Workflows | Last Activity | Actions`
- Sortable headers, row hover highlight, row click opens workspace.

#### Empty State
Illustration + message “You have no workspaces yet” + CTA button + template suggestions cards.

### 3.2 Workspace Creation Modal
- Width ~720px, multi-section vertical layout with scroll.
- **Sections:**
  1. Workspace Identity: name input (inline validation), description textarea, color picker swatches, icon grid.
  2. Privacy & Access: radio cards with descriptions.
  3. Initial Configuration: member multi-select -> chips w/ role dropdown, template selection (empty / copy existing / predefined). If copy existing selected, show workspace dropdown.
- **Footer:** Cancel (ghost) + Create Workspace (primary). Disabled until name + privacy chosen. Loading spinner on submit.

### 3.3 Workspace Detail Page
- **Header:** Icon + name + color bar, description, member avatars + “+4”, buttons: Edit, Share.
- **Tabs:** Overview | Tasks | Workflows | Knowledge | Members | Settings.

#### Overview Tab
- Stats grid (2-column desktop, stacked on mobile). Cards for totals, creation date, last activity.
- Recent activity timeline scoped to workspace.
- Featured items (pinned tasks/articles) in card row with quick actions.
- Quick action buttons (task/workflow/knowledge) under stats.

#### Members Tab
- Filter/search bar + “Invite” button.
- Member cards/list: avatar, full name, username, role pill, joined date, activity count, action menu (change role/remove). Pending invites block with resend/cancel.

#### Settings Tab
- Accordion sections: Workspace Info, Default Configuration, Integrations, Danger Zone. Each section uses bordered card. Danger Zone uses red emphasis and confirm dialogs.

---

## 4. Tasks

### 4.1 Task Creation Page
```
[Progress Indicator Steps]
[Main Form Pane | Summary Sidebar]
```
- Steps: Information → Phases → Global Settings → Review (optional). Sticky progress tracker at top.
- Sidebar shows live summary: name, workspace, phases list, budget, notifications.

#### Task Information
- Large name input, RTE for objectives (toolbar). Workspace selector pill. Tag multi-select chips. Priority selector (pill buttons w/ colors). Due date picker, assignee search.

#### Phase Configuration
- Timeline accordion; default phases preloaded.
- Collapsed state: number, name, tool count, workflow icon, drag handle, delete icon.
- Expanded state content:
  - Editable name + description.
  - Purpose statement textarea + helper text.
  - Tools assignment grouped by category with toggles + custom tool button.
  - Expected outcomes: description, format dropdown, validation fields, example uploader.
  - Workflow assignment: dropdown, create new, trigger radios, parameter mapping grid, view workflow link.
  - Dependencies: visual chips, radio for start condition, dependency conditions (success/any/custom). Custom uses expression builder modal.

#### Global Task Settings
- Model preferences radio group.
- Privacy settings radio group with supporting text.
- Budget: total input + per-phase table.
- Execution timeouts: global + overrides.
- Notifications checkboxes.
- Retry settings: max attempts, delay input.

#### Task Actions
- Fixed footer: Cancel, Save as Draft, Save as Template, Create & Start, Create & Schedule (opens date-time picker). Buttons disabled until validation passes.

### 4.2 Tasks List Page
- Header: “Tasks – [Workspace]” + create button + view toggle (grid/list/kanban) + bulk actions button (inactive until selection).
- Filter panel (collapsible) with status, workspace, tags, priority, date range, assignee, creator; show active filter count + Clear All.
- Sort dropdown + asc/desc toggle.
- Search bar with suggestions + result count.

#### Grid View Card
- Card layout w/ name, objective preview, status badge, created info, creator + assignee avatars, priority indicator, tag chips, progress indicator. Hover quick actions.

#### List View Table
- Columns as specified. Checkbox column for selection; sticky header. Row click opens detail.

#### Kanban View
- Columns per status with count. Drag & drop tasks (if permitted). Column header includes create button for Pending. Cards similar to grid but condensed.

#### Empty State & Pagination
- Illustration + CTA + “Clear filters” link. Pagination control bottom right with items-per-page dropdown.

### 4.3 Task Detail Page
- Header: Task name + status badge + action buttons (Edit, Cancel, Delete, Clone, Share).
- Metadata row: Created by (avatar), Created date, Workspace link, Tags, Priority, Assignee.
- Tabs: Overview | Phases | Execution Logs | Results | Settings.
- Sidebar: status tracker, progress, elapsed/remaining, resource usage, related tasks, activity feed, comments.

#### Overview Tab
- Objective block (RTE display).
- Configuration summary (model, privacy, budget, timeouts) in cards.
- Stats row: phases, completed, current, total time, ETA.
- Task timeline chart showing milestones.

#### Phases Tab
- Vertical timeline connecting phase cards. Each card shows name, status, duration, outcome summary. Expand reveals details: purpose, tools, workflows, logs excerpt, validation, actual outcomes, resources.

#### Execution Logs Tab
- Log viewer with filters (level checkboxes, search, time range). Monospace list with color-coded badges. Auto-refresh toggle, download button.

#### Results Tab
- Executive summary card. Phase result accordions with formatted outputs, quality metrics, downloads (PDF/Markdown/JSON/CSV). Share button + citations.

#### Settings Tab
- Editable configuration mirroring creation form, disabling completed phase edits. Save button + unsaved indicator.

---

## 5. Workflow Designer

### 5.1 Canvas Layout
```
┌ Toolbar ───────────────────────────────────────────────────────────────┐
│Name ▾ | Saved status | Undo/Redo | Zoom | Grid | Minimap | Save/Test…│
└────────────────────────────────────────────────────────────────────────┘
│ Palette |                Infinite Canvas + Minimap                 |Props│
```
- Palette left (collapsed option), canvas center, properties panel right (slide-in). Top toolbar contains file/edit/view/run/share menus.

### 5.2 Node Palette
- Expandable categories (Research Tasks, Model Interaction, Data Transformation, Data Access, Control Flow, Integration, Custom).
- Search bar, recently used, favorites.
- Node cards: icon + label, drag handle, description tooltip.

### 5.3 Canvas & Nodes
- Subtle grid background, pan/zoom gestures, minimap bottom right.
- Nodes: rounded rectangles, icon + name, input ports left, output right, port color-coded by data type. Status badges (waiting/executing/completed/failed). Invalid nodes show warning icon.
- Connections: bezier lines, style difference for triggers vs data vs error.
- Context menus for duplicate/delete/disable/docs.

### 5.4 Properties Panel
- Tabs (Parameters / Advanced / Documentation). Inputs with inline help + validation. “Test node” button, sample IO reference.

### 5.5 Workflow Configuration Panel
- Modal with Info, Triggers (manual/scheduled/webhook/event), schedule builder w/ cron or visual, webhook settings, parameters definition, error handling, execution settings (timeout, concurrency, retry). Save/Cancel.

### 5.6 Testing & History
- Test panel slides from bottom showing input fields, execution timeline, node-by-node progress, data inspector, download logs.
- Execution history list accessible from toolbar, filter by date/status/trigger, rerun button, download logs.

### 5.7 Empty Canvas State
- Illustrative prompt pointing to palette, quick-start templates, tutorial link.

---

## 6. Knowledge Base

### 6.1 Knowledge Home
- Header: “Knowledge Base – [Workspace/Global]”, toggle for workspace/global, search bar, create article button, view toggle.
- Stats cards (total articles, contributors, added this month, most viewed) + trend chart.
- Featured carousel + pinned list. Category navigation grid, recent articles list, top contributors leaderboard, activity feed.

### 6.2 Article Listings
- Filter sidebar (category, tags, author, date, content type) + sort dropdown.
- Grid cards with thumbnail/icon, title, excerpt, author, date, views, tags, category badge. Hover quick actions.
- List table with columns (title, author, category, tags, published, views, actions).
- Empty state with CTA + sample templates.

### 6.3 Article Detail
- Clean reading layout, table of contents for long content, metadata row (author, dates, views, reading time, category/tags). Content area supports images, code, tables. Related articles + comments/discussion section + share buttons + edit button.

### 6.4 Article Editor
- Rich text toolbar (styles, lists, alignment, code, quote, HR). Insert options for image/video/link/table/attachment. Markdown toggle, autosave indicator, preview mode.
- Metadata panel: title, excerpt, category (with create), tags, featured image, related articles, SEO meta, visibility, publication schedule.

### 6.5 Search Results / Global Knowledge
- Search page shows query, counts, time, filters (type/workspace/date). Each result shows highlighted excerpt, metadata, breadcrumbs. Provide “save search” + “related searches”. Global view surfaces workspace chips, cross-workspace stats, tag cloud, trending topics, knowledge graph visualization.

---

## 7. User Profile & Settings

### 7.1 Profile Header
- Avatar (editable), name, username, email, role, member since, completion meter.

### 7.2 Profile Edit
- Form for personal info (name, display name, email verification badge, bio, location, timezone, contact). Save/Cancel, unsaved warning.

### 7.3 Account Security
- Status cards (password age, 2FA, sessions). Actions: change password modal, enable 2FA with QR + backup codes, view/revoke sessions table, login history log, download security report.

### 7.4 Notification Preferences
- Matrix layout with notification types vs channels (email/in-app/push). Global settings: frequency, quiet hours, DND toggle, sound choice, test notification.

### 7.5 Workspace Preferences
- Default workspace dropdown, recently accessed limit slider, display order selector, hide archived toggle, color coding preference.

### 7.6 Interface Preferences
- Theme selector (light/dark/auto), sidebar default, default list view, date/time formats, language, accessibility toggles (high contrast, reduce motion, larger text, focus indicators).

### 7.7 Connected Accounts
- Integration cards showing service icon, status, account, permissions, connect/disconnect buttons. API key table with create/revoke.

### 7.8 Data & Privacy
- Buttons for export data, manage retention, consent toggles, marketing opt-in/out. Danger zone card for account deletion with confirmation.

---

## 8. System-Wide Patterns

### 8.1 Loading & Error States
- Skeleton placeholders for data tables/cards.
- Inline validation errors with helper text.
- Toast notifications stacked top-right, auto-dismiss with manual close.
- Error dialogs for critical failures with support link.

### 8.2 Empty States
- Illustrated cards with explanation + CTA + tips or sample content.

### 8.3 Confirmation Dialogs
- Title + descriptive body + Cancel/Confirm (severity-based). Optionally “don’t show again” for low-risk actions.

### 8.4 Contextual Help
- Info icons, inline help text, “Need help?” link to docs, optional step-by-step overlays for complex flows.

### 8.5 Accessibility & Interaction
- Keyboard navigable, focus order logical, skip links, reduced motion mode, screen reader labels on icons.
- Drag-and-drop complemented with keyboard reorder actions and undo.

---

## 9. Responsive Cheat Sheet

| Area | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Dash Stats | 4 columns | 2 columns | Carousel stack |
| Tables | Full tables | Condensed table / card hybrid | Card list with key metadata |
| Modals | Centered 720–960px | 90% width | Full screen sheets |
| Navigation | Top bar + sidebar | Top bar + collapsible sidebar | Top bar + hamburger + bottom quick nav |
| Workflow Designer | Full tri-pane layout | Collapsible palette/props | Limited editing, focus on review |
| Task Creation | Two-pane + sticky footer | Stacked sections, summary below | Accordion-only, CTA bottom sheet |

---

## 10. Implementation Notes
- Document tokens in design system (colors, typography, spacing, radii, elevation, motion).
- Provide component specs (buttons, inputs, tabs, cards) with states: default, hover, focus, disabled, loading.
- Use design tooling (Figma) to wireframe: start with Dashboard, Workspaces, Task Creation, Task Detail, Workflow Designer, Knowledge Hub, Profile.
- Include annotation layers for interactions, data states, and responsive adjustments.

---

This document captures the holistic UI vision, ensuring every page—from dashboards to workflow designer—aligns with the AI-powered research system’s goals of clarity, intelligence, and trustworthiness.
