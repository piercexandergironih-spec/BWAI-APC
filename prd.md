# MVP Product Requirements Document
## BWAI-APC — Student Organization Operations App

**Version:** 1.0  
**Date:** May 2026  
**Status:** Draft  
**Owner:** BWAI-APC Team  

---

## 1. Executive Summary

BWAI-APC is a lightweight MVP web application built for student organizations to manage their day-to-day operations — tracking events, tasks, deadlines, and meeting notes — with a clean, modern interface powered by Notion as the backend database.

The app does **not** replace Notion. Instead, it sits on top of Notion databases and provides a purpose-built operational dashboard that is faster, cleaner, and more intuitive for student org members who need clarity on what's active, what's overdue, and what needs to get done.

**Problem:** Student organizations are disorganized. Raw Notion databases are powerful but cluttered. Members miss deadlines, lose meeting notes, and don't know task ownership.

**Solution:** A lightweight frontend layer on Notion that surfaces what matters: active events, overdue tasks, and recent decisions.

---

## 2. Product Vision

> *The simplest useful operations tool for student organizations — powered by Notion, built for clarity.*

### Goals
- Give student orgs a cleaner view of their operational data
- Reduce time spent hunting for event status, task owners, and meeting notes
- Keep Notion as the single source of truth
- Ship a working MVP in days, not months

### Non-Goals
- Replace Notion as a note-taking or content management tool
- Build authentication or user accounts
- Create realtime collaboration features
- Add AI or analytics capabilities (out of MVP scope)

---

## 3. MVP Scope

### In Scope

| Feature | Description |
|---|---|
| Dashboard | Overview of events, tasks, and recent notes |
| Events / Projects | List, detail, create, and update events |
| Tasks | List, filter, create, and update tasks |
| Meeting Notes | List, create, and view meeting notes |
| Notion Settings | Configure API token and database IDs |

### Out of Scope (MVP)

- Authentication / login
- User accounts, roles, or permissions
- Organizations / workspaces
- Realtime collaboration
- File uploads
- Comments system
- Notifications / email
- Activity logs
- Discord integrations
- AI features
- Analytics dashboards
- Advanced reporting
- Two-way sync or conflict resolution
- Offline mode

---

## 4. Feature Requirements

### 4.1 Dashboard

**Purpose:** Give a quick operational overview at a glance.

**Displays:**

| Metric | Description |
|---|---|
| Total Events | Count of all events in Notion DB |
| Active Events | Events with status = "Active" |
| Upcoming Events | Events with future event dates |
| Overdue Tasks | Tasks past due date with status ≠ Done |
| Tasks Due Today | Tasks with due date = today |
| Tasks Due This Week | Tasks due within the next 7 days |
| Recent Meeting Notes | Last 5 meeting notes created |

**Behavior:**
- Loads on app open
- Refreshes on page revisit
- Gracefully handles empty state (no events, no tasks, no notes)
- Shows error state if Notion API fails

---

### 4.2 Events / Projects

**Purpose:** View and manage org events and projects.

**Notion Database Fields:**

| Field | Type | Required |
|---|---|---|
| Title | Text | ✅ |
| Description | Rich Text | ❌ |
| Status | Select | ✅ |
| Event Date | Date | ❌ |
| Start Date | Date | ❌ |
| End Date | Date | ❌ |
| Lead Name | Text | ❌ |
| Lead Email | Email | ❌ |

**Status Options:**
- `Planning` — Being prepared
- `Active` — Currently ongoing
- `Completed` — Finished
- `Cancelled` — No longer happening

**Views:**
- Event list (all events, sortable by date)
- Event detail page (all fields + related tasks + related meeting notes)
- Create event form
- Edit event form

**Acceptance Criteria:**
- [ ] User can view all events in a list
- [ ] User can click an event to view details
- [ ] User can create a new event
- [ ] User can update event status
- [ ] Related tasks are shown on event detail
- [ ] Related meeting notes are shown on event detail
- [ ] Empty state shown when no events exist

---

### 4.3 Tasks

**Purpose:** Track individual tasks, ownership, and deadlines.

**Notion Database Fields:**

| Field | Type | Required |
|---|---|---|
| Task Name | Title | ✅ |
| Related Event | Relation | ❌ |
| Owner Name | Text | ❌ |
| Owner Email | Email | ❌ |
| Status | Select | ✅ |
| Priority | Select | ✅ |
| Due Date | Date | ❌ |

**Status Options:**
- `To Do` — Not started
- `In Progress` — Being worked on
- `Done` — Completed
- `Blocked` — Cannot proceed

**Priority Options:**
- `Low`
- `Medium`
- `High`

**Views:**
- All tasks
- Overdue tasks (due date < today, status ≠ Done)
- Due today
- Due this week
- Tasks by event

**Visual Rules:**
- Overdue tasks → red highlight / badge
- Due today → orange highlight / badge
- Due this week → yellow/amber indicator
- Blocked tasks → gray / muted style

**Acceptance Criteria:**
- [ ] User can view all tasks
- [ ] User can filter tasks by status, priority, and due date
- [ ] User can create a new task
- [ ] User can update task status inline
- [ ] Overdue tasks are visually highlighted
- [ ] Tasks due today are highlighted differently from overdue
- [ ] Empty state shown when no tasks exist
- [ ] Tasks without owner show "Unassigned"
- [ ] Tasks without due date show "No due date"

---

### 4.4 Meeting Notes

**Purpose:** Document meeting outcomes and link them to events.

**Notion Database Fields:**

| Field | Type | Required |
|---|---|---|
| Title | Title | ✅ |
| Related Event | Relation | ❌ |
| Notes | Rich Text | ❌ |
| Action Items | Rich Text | ❌ |
| Author Name | Text | ❌ |
| Date | Date | ✅ |

**Views:**
- All meeting notes (sorted by date, newest first)
- Meeting note detail page
- Create meeting note form

**Acceptance Criteria:**
- [ ] User can view all meeting notes
- [ ] User can create a meeting note
- [ ] User can link a note to an event
- [ ] User can view full note detail
- [ ] Recent notes appear on dashboard
- [ ] Empty state shown when no notes exist

---

### 4.5 Notion Settings

**Purpose:** Allow the app to connect to the user's Notion workspace.

**Settings Required:**

| Setting | Description |
|---|---|
| Notion Integration Token | Secret token from Notion developer dashboard |
| Events Database ID | ID of the Events Notion database |
| Tasks Database ID | ID of the Tasks Notion database |
| Meeting Notes Database ID | ID of the Meeting Notes Notion database |

**Behavior:**
- Settings stored in localStorage or `.env.local`
- Validate token and database IDs on save
- Show connection success/failure feedback
- Redirect to Dashboard after successful connection

**Acceptance Criteria:**
- [ ] User can enter Notion integration token
- [ ] User can enter all three database IDs
- [ ] App validates the token on save
- [ ] App shows error if token is invalid
- [ ] App shows error if a database ID is invalid
- [ ] Settings persist across sessions

---

## 5. User Flows

### Flow 1: Connect Notion
```
Open app → Notion Settings page → Enter token → Enter database IDs → Save → Validate → Dashboard
```

### Flow 2: Load Dashboard
```
Open app → Dashboard loads → Fetch events, tasks, notes from Notion → Display metrics → Show recent activity
```

### Flow 3: Create Event
```
Events page → "New Event" button → Fill form (title, date, status, lead) → Submit → Notion creates page → Event appears in list
```

### Flow 4: Create Task
```
Tasks page → "New Task" button → Fill form (name, related event, owner, due date, priority) → Submit → Notion creates page → Task appears in list
```

### Flow 5: Update Task Status
```
Task list → Click status badge on task → Select new status → Submit → Notion updates page → UI reflects new status
```

### Flow 6: View Overdue Tasks
```
Tasks page → Filter by "Overdue" → See all tasks past due with status ≠ Done → Red visual indicators
```

### Flow 7: Create Meeting Note
```
Meeting Notes page → "New Note" button → Fill form (title, date, event, notes, action items) → Submit → Notion creates page → Note appears in list
```

---

## 6. UI / UX Requirements

### Design Direction
- **Style:** Clean, minimal, modern, student-friendly
- **Inspirations:** Notion, Linear
- **Tone:** Calm, organized, professional but approachable

### Typography
- Use a clean sans-serif font (Inter recommended)
- Clear hierarchy: H1 for page titles, H2 for sections, body for content

### Color System
- Neutral backgrounds (white or light gray)
- Accent color for primary actions (blue or indigo)
- Red for overdue / error states
- Orange/amber for warnings / due today
- Green for completed / success states

### Layout
- Left sidebar navigation (collapsible on mobile)
- Main content area
- Responsive: works on desktop and mobile

### Navigation Structure
```
Sidebar:
├── Dashboard
├── Events
├── Tasks
├── Meeting Notes
└── Settings (Notion)
```

### Empty States
- Each page must handle empty states with a clear message and a call-to-action (e.g., "No events yet. Create your first event →")

### Error States
- Notion API failure → Show error banner with retry option
- Missing token → Redirect to Settings with message
- Invalid database ID → Show inline error in Settings

### Loading States
- Skeleton loaders or spinner while Notion data is fetching
- No blank pages during load

---

## 7. Notion Database Structure

### Events Database

| Property | Notion Type | Notes |
|---|---|---|
| Title | Title | Event name |
| Description | Rich Text | Long description |
| Status | Select | Planning / Active / Completed / Cancelled |
| Event Date | Date | Main event date |
| Start Date | Date | Project start |
| End Date | Date | Project end |
| Lead Name | Rich Text | Person in charge |
| Lead Email | Email | Contact email |

### Tasks Database

| Property | Notion Type | Notes |
|---|---|---|
| Task Name | Title | Task label |
| Related Event | Relation | Links to Events DB |
| Owner Name | Rich Text | Task assignee |
| Owner Email | Email | Assignee email |
| Status | Select | To Do / In Progress / Done / Blocked |
| Priority | Select | Low / Medium / High |
| Due Date | Date | Deadline |

### Meeting Notes Database

| Property | Notion Type | Notes |
|---|---|---|
| Title | Title | Meeting name |
| Related Event | Relation | Links to Events DB |
| Notes | Rich Text | Full meeting notes |
| Action Items | Rich Text | Follow-up items |
| Author Name | Rich Text | Who wrote the note |
| Date | Date | When the meeting occurred |

---

## 8. Notion API Integration

### Authentication
- Use `NOTION_TOKEN` (Notion Internal Integration Token)
- Stored in `.env.local` (never committed to git)

### API Endpoints Used

| Operation | Notion API Call |
|---|---|
| Fetch Events | `POST /databases/{id}/query` |
| Fetch Tasks | `POST /databases/{id}/query` |
| Fetch Meeting Notes | `POST /databases/{id}/query` |
| Create Event | `POST /pages` |
| Create Task | `POST /pages` |
| Create Meeting Note | `POST /pages` |
| Update Event | `PATCH /pages/{id}` |
| Update Task | `PATCH /pages/{id}` |

### API Layer (Next.js)
- All Notion API calls made via **Next.js API Routes** (`/api/...`)
- Notion token never exposed to the browser
- Client fetches only from internal `/api/` endpoints

### API Routes

```
/api/events        → GET (list), POST (create)
/api/events/[id]   → GET (detail), PATCH (update)
/api/tasks         → GET (list), POST (create)
/api/tasks/[id]    → PATCH (update)
/api/notes         → GET (list), POST (create)
/api/notes/[id]    → GET (detail)
```

### Error Handling
- 401 → Invalid Notion token
- 404 → Database not found or invalid ID
- 500 → Notion API failure
- All errors return structured JSON `{ error: string, code: string }`

---

## 9. Edge Cases

| Scenario | Expected Behavior |
|---|---|
| No events in Notion | Show empty state with "Create Event" CTA |
| No tasks in Notion | Show empty state with "Create Task" CTA |
| Task has no owner | Display "Unassigned" |
| Task has no due date | Display "No due date" |
| Overdue task | Highlight red, show in "Overdue" filter |
| Missing Notion token | Redirect to Settings with warning |
| Invalid database ID | Show error in Settings, prevent dashboard load |
| Notion API timeout | Show error banner with retry option |
| Empty Notion database | Show empty state, no crash |
| Failed API request | Catch and display user-friendly error |

---

## 10. Development Roadmap

### Phase 1 — Foundation (Days 1–2)
- [ ] Initialize Next.js project with TypeScript + Tailwind + shadcn/ui
- [ ] Set up folder structure
- [ ] Build Notion API utility (notionClient)
- [ ] Create API routes for events, tasks, notes
- [ ] Build sidebar navigation component
- [ ] Build Settings page

### Phase 2 — Core Features (Days 3–5)
- [ ] Build Dashboard page with metrics
- [ ] Build Events list and detail pages
- [ ] Build Tasks page with filters and status updates
- [ ] Build Meeting Notes list and detail pages
- [ ] Build create/edit forms for all three entities

### Phase 3 — Polish (Days 6–7)
- [ ] Add empty states
- [ ] Add loading states (skeletons)
- [ ] Add error states
- [ ] Mobile responsiveness
- [ ] Final design polish

---

## 11. Testing Checklist

### Functional Tests
- [ ] Dashboard metrics load correctly
- [ ] Events list fetches from Notion
- [ ] Event detail loads correctly
- [ ] Create event writes to Notion
- [ ] Update event status updates in Notion
- [ ] Tasks list fetches from Notion
- [ ] Overdue tasks correctly identified
- [ ] Create task writes to Notion
- [ ] Update task status updates in Notion
- [ ] Meeting notes list fetches from Notion
- [ ] Create meeting note writes to Notion
- [ ] Settings saves and validates Notion token

### Edge Case Tests
- [ ] App handles empty Notion databases
- [ ] App handles Notion API errors gracefully
- [ ] App handles missing token
- [ ] App handles invalid database IDs
- [ ] Tasks with no owner show "Unassigned"
- [ ] Tasks with no due date show "No due date"

### UI Tests
- [ ] All pages are mobile responsive
- [ ] Overdue tasks are visually distinct
- [ ] Empty states appear correctly
- [ ] Loading states appear during fetch
- [ ] Error states appear when API fails

---

## 12. Deployment Checklist

- [ ] Environment variables set in Vercel (`NOTION_TOKEN`, database IDs)
- [ ] `.env.local` not committed to git
- [ ] `.gitignore` includes `.env.local`
- [ ] Production build passes (`npm run build`)
- [ ] Deployed to Vercel via GitHub integration
- [ ] Custom domain configured (if applicable)
- [ ] All pages tested in production

---

## 13. Future Features (Post-MVP)

These are intentionally excluded from the MVP but may be added later:

| Feature | Rationale |
|---|---|
| Member authentication | Useful once org has multiple users |
| Task comments | Richer task collaboration |
| Email notifications | Deadline reminders |
| Calendar view | Visual event timeline |
| Advanced analytics | Org productivity insights |
| Bulk task updates | Power-user workflow |
| AI summaries | Summarize meeting notes |
| Discord integration | Post updates to org Discord |

---

## 14. Final MVP Build Summary

**What we are building:** A clean operational dashboard for student organizations that reads and writes to Notion databases.

**What we are NOT building:** An enterprise SaaS, a Notion replacement, or any system with authentication, realtime features, or advanced tooling.

**Definition of Done:**
- A student org member can open the app, see their active events and overdue tasks, create a new task, and log a meeting note — all synced to their Notion workspace — in under 2 minutes.

---

*BWAI-APC MVP PRD v1.0 — Student Organization Operations*
