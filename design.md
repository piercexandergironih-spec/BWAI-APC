# Design Document
## BWAI-APC — Student Organization Operations App

**Version:** 1.0 | **Date:** May 2026 | **Status:** Draft

---

## 1. Design Philosophy

BWAI-APC is designed to feel like a **focused, student-friendly tool** — not an enterprise dashboard. Every design decision should reduce cognitive load for org members who are juggling school, org work, and personal life.

### Core Principles

| Principle | Application |
|---|---|
| **Clarity first** | Every element should have a clear purpose. No decorative clutter. |
| **Speed** | Task status updates in 1 click. Event creation in under 30 seconds. |
| **Scanability** | Overdue tasks must be immediately obvious. Statuses must be color-coded. |
| **Mobile-ready** | Student org members work on phones. Design must hold on 375px screens. |
| **Familiarity** | Inspired by Notion and Linear — tools students already use. |

---

## 2. Design Inspiration

| Reference | What we borrow |
|---|---|
| **Notion** | Clean typography, minimal sidebar, neutral color palette |
| **Linear** | Status badges, compact task rows, keyboard-shortcut feel |
| **Vercel Dashboard** | Card-based metrics, clean dark/light modes |
| **Raycast** | Speed and intentionality — every interaction feels instant |

---

## 3. Color System

### Base Palette

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#FAFAFA` | Page background (light mode) |
| `--color-surface` | `#FFFFFF` | Card / panel backgrounds |
| `--color-border` | `#E5E7EB` | Dividers, borders |
| `--color-text-primary` | `#111827` | Headings, primary text |
| `--color-text-secondary` | `#6B7280` | Labels, metadata |
| `--color-text-muted` | `#9CA3AF` | Placeholder, empty state text |

### Brand / Accent

| Token | Value | Usage |
|---|---|---|
| `--color-accent` | `#6366F1` | Primary CTA buttons, active nav |
| `--color-accent-hover` | `#4F46E5` | Button hover states |
| `--color-accent-light` | `#EEF2FF` | Accent backgrounds, pills |

### Semantic Colors

| Token | Value | Context |
|---|---|---|
| `--color-success` | `#10B981` | Done status, success messages |
| `--color-success-bg` | `#ECFDF5` | Done badge background |
| `--color-warning` | `#F59E0B` | Due today, planning status |
| `--color-warning-bg` | `#FFFBEB` | Warning badge background |
| `--color-danger` | `#EF4444` | Overdue tasks, errors, cancelled |
| `--color-danger-bg` | `#FEF2F2` | Danger badge background |
| `--color-neutral` | `#6B7280` | Blocked status, muted elements |
| `--color-neutral-bg` | `#F3F4F6` | Neutral badge background |
| `--color-blue` | `#3B82F6` | Active status, info states |
| `--color-blue-bg` | `#EFF6FF` | Info badge background |

---

## 4. Typography

### Font
**Primary:** `Inter` (Google Fonts)
**Fallback:** `system-ui, -apple-system, sans-serif`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `--text-xs` | 12px | 400 | 1.5 | Metadata, timestamps |
| `--text-sm` | 14px | 400 | 1.5 | Body text, labels |
| `--text-base` | 16px | 400 | 1.5 | Default body |
| `--text-lg` | 18px | 500 | 1.4 | Section headers |
| `--text-xl` | 20px | 600 | 1.3 | Page titles |
| `--text-2xl` | 24px | 700 | 1.2 | Dashboard metrics |
| `--text-3xl` | 30px | 700 | 1.1 | Hero numbers |

---

## 5. Spacing System

Uses an 8px base grid:

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Micro gaps |
| `space-2` | 8px | Tight spacing |
| `space-3` | 12px | Inner padding |
| `space-4` | 16px | Component padding |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Page padding |
| `space-12` | 48px | Section separators |

---

## 6. Component Design Specs

### 6.1 Layout: Sidebar

```
┌─────────────────────────────────────────────────────┐
│  ┌──────────┐                                        │
│  │  SIDEBAR │  MAIN CONTENT                          │
│  │  240px   │  flex-1                                │
│  │          │                                        │
│  │ Logo     │                                        │
│  │          │                                        │
│  │ Dashboard│                                        │
│  │ Events   │                                        │
│  │ Tasks    │                                        │
│  │ Notes    │                                        │
│  │          │                                        │
│  │ Settings │                                        │
│  └──────────┘                                        │
└─────────────────────────────────────────────────────┘
```

- Sidebar width: `240px` desktop, collapsed to hamburger on mobile
- Active nav item: accent color background pill, accent text
- Inactive nav item: gray text, hover → light gray background
- Logo at top with org name

### 6.2 Dashboard Metric Cards

```
┌────────────────────────┐
│  Total Events          │
│                        │
│  ██  12                │
│                        │
│  ↑ 3 this month        │
└────────────────────────┘
```

- White card, 1px border, 8px border-radius
- Icon (lucide-react) + large number + subtitle
- Grid: 3 columns desktop, 2 columns tablet, 1 column mobile
- Color-coded icons: neutral → accent → orange → red

### 6.3 Status Badges

Small pill-shaped badges for status and priority:

| Status | Background | Text Color |
|---|---|---|
| Planning | `#FFFBEB` | `#F59E0B` |
| Active | `#EFF6FF` | `#3B82F6` |
| Completed | `#ECFDF5` | `#10B981` |
| Cancelled | `#F3F4F6` | `#6B7280` |
| To Do | `#F3F4F6` | `#374151` |
| In Progress | `#EFF6FF` | `#3B82F6` |
| Done | `#ECFDF5` | `#10B981` |
| Blocked | `#F3F4F6` | `#6B7280` |

Priority badges:

| Priority | Background | Text |
|---|---|---|
| High | `#FEF2F2` | `#EF4444` |
| Medium | `#FFFBEB` | `#F59E0B` |
| Low | `#F3F4F6` | `#6B7280` |

**Badge style:** `border-radius: 9999px; padding: 2px 10px; font-size: 12px; font-weight: 500`

### 6.4 Task Row

```
┌────────────────────────────────────────────────────────────┐
│ ● Book venue          [In Progress] [High]  Maria S.  Jun 1│
│                                                    ⚠ TODAY │
└────────────────────────────────────────────────────────────┘
```

- Overdue row: left border `4px solid #EF4444`, light red background `#FEF2F2`
- Due today row: left border `4px solid #F59E0B`, light amber background `#FFFBEB`
- Status badge: inline, clickable to open status dropdown
- Owner: gray text, right-aligned
- Due date: right-aligned with visual indicator

### 6.5 Forms

- Label above input, always visible (no placeholder-only labels)
- Input: `border: 1px solid #E5E7EB; border-radius: 6px; padding: 8px 12px`
- Focus state: `border-color: #6366F1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1)`
- Error state: `border-color: #EF4444; color: #EF4444`
- Primary button: `background: #6366F1; color: white; border-radius: 6px`
- Secondary button: outlined, `border: 1px solid #E5E7EB`

### 6.6 Empty States

```
┌─────────────────────────────────┐
│                                 │
│         📋  (illustration)      │
│                                 │
│      No events yet.             │
│   Create your first event to    │
│      get started.               │
│                                 │
│   [ + Create Event ]            │
│                                 │
└─────────────────────────────────┘
```

- Centered in content area
- Muted icon + short headline + subtitle + CTA button
- Avoid negative language ("nothing here") — use encouraging copy

### 6.7 Loading States

Use skeleton loaders that mimic the real layout:
- Dashboard: skeleton cards in a 3-column grid
- Task list: 5 skeleton rows with shimmer animation
- Event list: 3 skeleton cards

Shimmer animation:
```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
```

---

## 7. Page-by-Page UX Specs

### 7.1 Dashboard

**Layout:** 3-col metric cards → task due-date section → recent notes list

**Metric Cards (row 1):**
- Total Events
- Active Events
- Upcoming Events

**Metric Cards (row 2):**
- Overdue Tasks (red icon)
- Tasks Due Today (amber icon)
- Tasks Due This Week (blue icon)

**Recent Meeting Notes:** Last 5 notes as compact rows (title + date + linked event)

---

### 7.2 Events Page

**Header:** "Events" title + "New Event" button (top right)

**Filters:** All | Planning | Active | Completed | Cancelled (tab-style)

**Event List:** Cards or compact table rows
- Title (bold)
- Status badge
- Event date
- Lead name
- Action: click row → Event Detail

**Event Detail:**
- All event fields
- Related Tasks section (compact task list)
- Related Meeting Notes section (compact note list)
- Edit button

---

### 7.3 Tasks Page

**Header:** "Tasks" title + "New Task" button

**Filter Bar:**
```
[All] [Overdue] [Due Today] [Due This Week]
[Status ▾] [Priority ▾] [Event ▾]
```

**Task Table:**
```
Task Name        | Status       | Priority | Owner    | Due Date
Book venue       | In Progress  | High     | Maria S. | Jun 1 ⚠
Design poster    | To Do        | Medium   | —        | Jun 5
Send invitations | Blocked      | High     | Ana R.   | Jun 3 🔴
```

- Overdue rows: red left border + red background tint
- Due today: amber left border + amber background tint
- Click status badge → inline status update dropdown
- Click row → Task detail drawer/page

---

### 7.4 Meeting Notes Page

**Header:** "Meeting Notes" title + "New Note" button

**Note List:** Sorted newest first
- Title (bold)
- Date
- Linked event name (if any)
- Author
- Click → Note detail

**Note Detail:**
- Title + date + author + linked event
- Full notes section (rich text display)
- Action items section

---

### 7.5 Settings Page

**Notion Integration Setup:**
```
┌─────────────────────────────────────────┐
│  Notion Settings                        │
│                                         │
│  Integration Token                      │
│  ┌─────────────────────────────────┐   │
│  │ secret_xxxxxxxxxxxxxxxxxx        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Events Database ID                     │
│  ┌─────────────────────────────────┐   │
│  │ xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Tasks Database ID                      │
│  [ ...                              ]   │
│                                         │
│  Meeting Notes Database ID              │
│  [ ...                              ]   │
│                                         │
│  [ Save & Connect ]                     │
│                                         │
│  ✅ Connected successfully              │
└─────────────────────────────────────────┘
```

---

## 8. Navigation Structure

```
Sidebar Nav:
├── 🏠  Dashboard
├── 📅  Events
├── ✅  Tasks
├── 📝  Meeting Notes
└── ⚙️  Settings
```

- Active page: accent pill highlight
- Icons: lucide-react icon library (consistent stroke width: 1.5)
- On mobile: hamburger → slide-in drawer

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Layout Change |
|---|---|---|
| Mobile | < 640px | Sidebar hidden, hamburger menu, 1-col grid |
| Tablet | 640–1024px | Sidebar collapsible, 2-col metric cards |
| Desktop | > 1024px | Full sidebar visible, 3-col metric cards |

---

## 10. Iconography

**Library:** `lucide-react`  
**Stroke width:** `1.5` (consistent across all icons)  
**Size:** 20px for nav icons, 16px for inline icons, 24px for metric card icons

Key icons:

| Element | Icon |
|---|---|
| Dashboard | `LayoutDashboard` |
| Events | `Calendar` |
| Tasks | `CheckSquare` |
| Notes | `FileText` |
| Settings | `Settings` |
| Overdue | `AlertCircle` (red) |
| Due today | `Clock` (amber) |
| Add new | `Plus` |
| Edit | `Pencil` |
| Delete | `Trash2` |
| Success | `CheckCircle2` (green) |

---

## 11. Micro-interactions & Animations

| Interaction | Animation |
|---|---|
| Page load | Fade in `opacity: 0 → 1`, 150ms |
| Card hover | `box-shadow` subtle lift, `translateY(-1px)`, 150ms |
| Button hover | Background color transition, 150ms |
| Status badge click | Dropdown appears with `scaleY` transition |
| Skeleton → content | Cross-fade, 200ms |
| Toast/notification | Slide in from bottom-right, auto-dismiss 3s |
| Sidebar collapse | Width transition 200ms ease |

All transitions: `transition: all 150ms ease-in-out`

---

## 12. Copy & Tone

| Context | Tone | Example |
|---|---|---|
| Empty states | Encouraging | "No events yet — create your first one!" |
| Error states | Calm, actionable | "Couldn't connect to Notion. Check your token and try again." |
| Success | Affirming | "Task updated successfully." |
| Loading | Neutral | "Loading your events…" |
| Overdue highlight | Direct, not alarming | "Overdue" badge — no scary language |

---

## 13. Accessibility

- All interactive elements have focus-visible styles
- Color contrast ratio: minimum 4.5:1 (WCAG AA)
- Status communicated by color **and** label (not color alone)
- Form fields have associated `<label>` elements
- Error messages linked to inputs via `aria-describedby`
- Keyboard navigation supported throughout

---

*BWAI-APC Design Document v1.0 — Student Organization Operations*
