# System Design Document (SDD)
## BWAI-APC — Student Organization Operations App

**Version:** 1.0 | **Date:** May 2026 | **Status:** Draft

---

## 1. System Overview

BWAI-APC is a **frontend-only web application** with no traditional backend. All data is stored in Notion databases, accessed via the Notion API through Next.js API Routes acting as a secure server-side proxy.

### Architecture Pattern
```
Browser (Next.js Client) ──► Next.js API Routes ──► Notion API ──► Notion Databases
```

---

## 2. Architecture Diagram

```
┌────────────────────────────────────────────────────────────┐
│                     BWAI-APC System                        │
│                                                            │
│   ┌─────────────────┐      ┌────────────────────────────┐ │
│   │ Next.js Frontend│      │   Next.js API Routes       │ │
│   │                 │─────►│  /api/events               │ │
│   │  Dashboard      │      │  /api/tasks                │ │
│   │  Events         │      │  /api/notes                │ │
│   │  Tasks          │      └───────────┬────────────────┘ │
│   │  Notes          │                  │ Notion SDK        │
│   │  Settings       │                  ▼                  │
│   └─────────────────┘      ┌────────────────────────────┐ │
│                             │    Notion API              │ │
│                             │  api.notion.com/v1         │ │
│                             └───────────┬────────────────┘ │
│                                         ▼                  │
│                             ┌────────────────────────────┐ │
│                             │    Notion Databases        │ │
│                             │  Events | Tasks | Notes    │ │
│                             └────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Framework | Next.js 14+ (App Router) | React + API routes |
| Language | TypeScript 5+ | Type safety |
| Styling | Tailwind CSS 3+ | Utility-first styles |
| UI Components | shadcn/ui | Accessible component library |
| Notion Client | `@notionhq/client` | Official Notion JS SDK |
| Deployment | Vercel | Hosting + serverless functions |
| Source Control | GitHub | CI/CD trigger |

---

## 4. Folder Structure

```
bwai-apc/
├── app/
│   ├── layout.tsx                  # Root layout (sidebar + nav)
│   ├── dashboard/page.tsx
│   ├── events/
│   │   ├── page.tsx                # Events list
│   │   ├── new/page.tsx            # Create event
│   │   └── [id]/page.tsx           # Event detail
│   ├── tasks/
│   │   ├── page.tsx                # Tasks list
│   │   ├── new/page.tsx            # Create task
│   │   └── [id]/page.tsx           # Task detail
│   ├── notes/
│   │   ├── page.tsx                # Meeting notes list
│   │   ├── new/page.tsx            # Create note
│   │   └── [id]/page.tsx           # Note detail
│   └── settings/page.tsx           # Notion settings
│
├── api/
│   ├── events/route.ts             # GET list, POST create
│   ├── events/[id]/route.ts        # GET detail, PATCH update
│   ├── tasks/route.ts              # GET list, POST create
│   ├── tasks/[id]/route.ts         # PATCH update
│   ├── notes/route.ts              # GET list, POST create
│   └── notes/[id]/route.ts         # GET detail
│
├── components/
│   ├── layout/                     # Sidebar, Header, PageWrapper
│   ├── dashboard/                  # MetricCard, RecentNotes
│   ├── events/                     # EventCard, EventList, EventForm
│   ├── tasks/                      # TaskRow, TaskList, TaskForm, TaskFilters
│   ├── notes/                      # NoteCard, NoteList, NoteForm
│   └── shared/                     # EmptyState, LoadingSkeleton, ErrorBanner
│
├── lib/
│   ├── notion.ts                   # Notion client init
│   ├── notion-helpers.ts           # Property parsers
│   └── constants.ts                # Enums
│
├── types/
│   ├── event.ts
│   ├── task.ts
│   └── note.ts
│
├── hooks/
│   ├── useEvents.ts
│   ├── useTasks.ts
│   └── useNotes.ts
│
├── .env.local                      # Secrets (not committed)
└── .env.example                    # Template (committed)
```

---

## 5. Data Models

### Event
```typescript
interface Event {
  id: string;
  title: string;
  description?: string;
  status: 'Planning' | 'Active' | 'Completed' | 'Cancelled';
  eventDate?: string;
  startDate?: string;
  endDate?: string;
  leadName?: string;
  leadEmail?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Task
```typescript
interface Task {
  id: string;
  taskName: string;
  relatedEventId?: string;
  relatedEventTitle?: string;
  ownerName?: string;
  ownerEmail?: string;
  status: 'To Do' | 'In Progress' | 'Done' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  isOverdue: boolean;   // Computed: dueDate < today && status !== 'Done'
  isDueToday: boolean;  // Computed: dueDate === today
  createdAt: string;
}
```

### MeetingNote
```typescript
interface MeetingNote {
  id: string;
  title: string;
  relatedEventId?: string;
  relatedEventTitle?: string;
  notes?: string;
  actionItems?: string;
  authorName?: string;
  date: string;
  createdAt: string;
}
```

### DashboardMetrics
```typescript
interface DashboardMetrics {
  totalEvents: number;
  activeEvents: number;
  upcomingEvents: number;
  overdueTasks: number;
  tasksDueToday: number;
  tasksDueThisWeek: number;
  recentNotes: MeetingNote[];
}
```

---

## 6. API Routes

### Events

| Method | Route | Description |
|---|---|---|
| GET | `/api/events` | List all events |
| POST | `/api/events` | Create new event |
| GET | `/api/events/[id]` | Get event detail + related tasks & notes |
| PATCH | `/api/events/[id]` | Update event fields |

### Tasks

| Method | Route | Query Params | Description |
|---|---|---|---|
| GET | `/api/tasks` | `filter`, `status`, `eventId` | List tasks with filters |
| POST | `/api/tasks` | — | Create new task |
| PATCH | `/api/tasks/[id]` | — | Update task (status, etc.) |

**Filter values:** `all` | `overdue` | `today` | `week`

### Notes

| Method | Route | Description |
|---|---|---|
| GET | `/api/notes` | List all notes (newest first) |
| POST | `/api/notes` | Create new note |
| GET | `/api/notes/[id]` | Get note detail |

### Standard Error Response
```json
{
  "error": "Human-readable error message",
  "code": "NOTION_TOKEN_INVALID | DATABASE_NOT_FOUND | API_ERROR | VALIDATION_ERROR"
}
```

---

## 7. Notion Integration

### Client Setup
```typescript
// lib/notion.ts
import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export const DATABASE_IDS = {
  events: process.env.NOTION_EVENTS_DB_ID!,
  tasks:  process.env.NOTION_TASKS_DB_ID!,
  notes:  process.env.NOTION_NOTES_DB_ID!,
};
```

### Property Helpers
```typescript
// lib/notion-helpers.ts
export const parseTitle  = (p: any) => p?.title?.[0]?.plain_text ?? '';
export const parseText   = (p: any) => p?.rich_text?.[0]?.plain_text ?? '';
export const parseSelect = (p: any) => p?.select?.name ?? '';
export const parseDate   = (p: any) => p?.date?.start ?? undefined;
export const parseEmail  = (p: any) => p?.email ?? '';
export const parseRelation = (p: any) => p?.relation?.map((r: any) => r.id) ?? [];
```

### Environment Variables
```bash
# .env.local (never commit)
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxx
NOTION_EVENTS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_TASKS_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_NOTES_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 8. State Management

**Strategy:** Server-first, minimal client state. No global state library needed.

| State Type | Solution |
|---|---|
| Page data | React Server Components (RSC) fetch on server |
| Mutations | Server Actions or `fetch` to API routes |
| UI state | `useState` / `useReducer` per component |
| Filters | URL search params (`useSearchParams`) |

---

## 9. Security

- Notion token stored only in server environment variables, never in client bundle
- All Notion API calls made exclusively from API Routes (server-side)
- User inputs sanitized before sending to Notion API
- No authentication in MVP (single trusted team assumed)

---

## 10. Error Handling

| Scenario | Client Behavior |
|---|---|
| Empty database | Show `EmptyState` component with CTA |
| Missing token | Redirect to `/settings` with warning banner |
| Invalid DB ID | Inline error in Settings form |
| 401 from Notion | Show "Invalid token" error |
| 500 from Notion | Show `ErrorBanner` with retry button |
| Task: no owner | Display "Unassigned" |
| Task: no due date | Display "No due date", skip overdue logic |

---

## 11. Deployment

```
GitHub push to main
       │
       ▼
Vercel CI/CD
  ├── npm run build
  ├── Env vars injected from Vercel dashboard
  ├── Static assets → Vercel CDN
  └── API Routes → Vercel Serverless Functions
       │
       ▼
  Production: bwai-apc.vercel.app
```

**Vercel environment variables to set:**
- `NOTION_TOKEN`
- `NOTION_EVENTS_DB_ID`
- `NOTION_TASKS_DB_ID`
- `NOTION_NOTES_DB_ID`

---

## 12. Constraints & Assumptions

| Constraint | Detail |
|---|---|
| Notion API rate limit | 3 req/sec — acceptable for small org teams |
| No offline support | Requires active internet connection |
| No real-time | Refresh page to see other users' changes |
| No auth | Trusted internal team environment |
| Single workspace | No multi-tenant support in MVP |
| Notion = source of truth | Direct Notion edits reflect on next page load |

---

*BWAI-APC SDD v1.0 — Student Organization Operations*
