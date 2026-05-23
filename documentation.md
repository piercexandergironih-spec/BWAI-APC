# BWAI-APC Operations App Documentation

## 1. Executive Summary
The BWAI-APC Operations App is a purpose-built, lightweight MVP web application designed to help student organizations manage their day-to-day operations. It uses **Notion** as the backend database/CMS and **Next.js (App Router)** as the frontend. It provides a clean, fast, and highly-readable dashboard that highlights active events, overdue tasks, and meeting notes, removing the clutter often found when using raw Notion databases directly.

## 2. Tech Stack & Architecture
- **Framework:** Next.js 16 (App Router) using Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom "Brutalist" Design Tokens
- **Components:** Radix UI primitives (`shadcn/ui` patterns), `lucide-react` for icons, `framer-motion` for micro-animations
- **Backend / Database:** Notion API (Direct server-side fetch integration)
- **State & Data Mutations:** Next.js Server Actions (No client-side API keys)
- **Date Handling:** `date-fns` for deadline calculations (overdue, due today, due this week)

## 3. Project Structure
```text
BWAI-APC/
├── src/
│   ├── app/                    # Next.js App Router (Pages & Layouts)
│   │   ├── dashboard/          # Aggregated dashboard metrics & recent activity
│   │   ├── events/             # Events list and [id] detail views
│   │   ├── tasks/              # Tasks list with URL searchParams filtering
│   │   ├── notes/              # Meeting notes list and [id] detail views
│   │   ├── settings/           # Notion configuration UI
│   │   ├── globals.css         # Tailwind directives and Brutalist design tokens
│   │   ├── layout.tsx          # Root layout & global providers
│   │   ├── loading.tsx         # Universal loading state (spinners)
│   │   └── error.tsx           # Universal error boundary for API failures
│   ├── components/
│   │   ├── features/           # Domain-specific UI (Create/Edit Modals, Status Select)
│   │   ├── layout/             # Universal Layout wrappers (Sidebar, PageHeader, AppLayout)
│   │   └── ui/                 # Reusable UI primitives (Buttons, Badges, Dialogs)
│   ├── lib/
│   │   ├── api.ts              # Notion GET fetchers (Read operations)
│   │   ├── actions.ts          # Next.js Server Actions (POST/PATCH write operations)
│   │   ├── notion.ts           # Notion API environment configurations
│   │   └── notion-helpers.ts   # Parsing logic for Notion's complex rich text and property arrays
│   └── types/
│       └── index.ts            # TypeScript interfaces (OrgEvent, Task, MeetingNote)
├── .env.local                  # Secure storage for NOTION_TOKEN & Database IDs
└── prd.md                      # Product Requirements Document MVP
```

## 4. Key Features Implemented

### 4.1. Dashboard
- Aggregates data from all three Notion databases.
- Displays vital metrics: Total Events, Active Events, Tasks Due Today, Overdue Tasks.
- Shows a quick feed of the most recently created meeting notes.

### 4.2. Events Management
- **List View:** Displays all events in a responsive card grid.
- **Detail View:** Fetches a specific event alongside a feed of all "Related Tasks" mapped specifically to that event.
- **Mutations:** Supports creating new events (`CreateEventModal`) and editing existing events (`EditEventModal`) which push updates directly back to Notion via Server Actions.

### 4.3. Task Management
- **List & Filtering:** Displays all tasks in a tabular format. Supports filtering via URL params (`?filter=overdue`, `?filter=today`, `?filter=week`).
- **Dynamic Indicators:** Tasks automatically flag red (`text-destructive`) if overdue, or amber (`text-warning`) if due today/this week based on server-side `date-fns` calculations.
- **Inline Editing:** The `TaskStatusSelect` component allows users to change a task's status from a dropdown, instantly patching the database and revalidating the UI without a page refresh.

### 4.4. Meeting Notes
- **Detail View:** Utilizes `whitespace-pre-wrap` to perfectly render Notion's rich text layouts without relying on complex markdown parsers. Cleanly separates "Discussion Notes" from "Action Items".

### 4.5. Notion Settings
- Provides a UI to view current environment mapping (`NOTION_TOKEN`, `EVENTS_DB_ID`, etc.).
- Saves configuration directly to `.env.local` using Node.js `fs` module (requires a server restart to apply).

## 5. Security & Data Flow
- **Server-Side Only:** The `NOTION_TOKEN` is never exposed to the client. All reads (`api.ts`) and writes (`actions.ts`) are executed entirely on the server.
- **No Caching for MVP:** Notion `fetch` calls utilize `next: { revalidate: 0 }` to ensure the dashboard instantly reflects changes made directly in the Notion workspace.
- **Form Validation:** Relies on native HTML5 constraints (`required`, `type="date"`) and Next.js Server Actions for processing `FormData`.

## 6. Design System (Brutalist Minimal)
The UI heavily utilizes high-contrast, tactile design elements avoiding soft shadows or gradients:
- Hard black borders (`border-2 border-foreground`).
- Sharp, non-rounded corners (`rounded-none`).
- Solid drop shadows (`shadow-[8px_8px_0px_0px_oklch(...)]`).
- Uppercase tracking for headers and micro-copy.

## 7. How to Run Locally
1. Ensure `.env.local` is populated with a valid `NOTION_TOKEN` and the 3 Database IDs.
2. Run `npm install` to ensure all dependencies (like `date-fns`, `lucide-react`) are present.
3. Run `npm run dev` to start the Next.js development server.
4. To test production builds, run `npm run build` followed by `npm start`.
