# Development Roadmap
## BWAI-APC — Student Organization Operations App

This roadmap outlines the path to shipping the MVP.

### Phase 1: Foundation & Setup (Days 1–2)
- [ ] Initialize Next.js 14+ project with TypeScript, Tailwind CSS, and shadcn/ui.
- [ ] Set up project structure (`app/`, `components/`, `lib/`, `types/`).
- [ ] Initialize Notion client in `lib/notion.ts`.
- [ ] Create property parsing helpers in `lib/notion-helpers.ts`.
- [ ] Implement global layouts (Sidebar, Header, PageWrapper).
- [ ] Build the Notion Settings page (`/settings`) to input token and DB IDs.
- [ ] Configure environment variables `.env.local`.

### Phase 2: API Routes Construction (Days 2–3)
- [ ] Build `/api/events` (GET list, POST create).
- [ ] Build `/api/events/[id]` (GET detail, PATCH update).
- [ ] Build `/api/tasks` (GET list, POST create, applying filters).
- [ ] Build `/api/tasks/[id]` (PATCH status/priority).
- [ ] Build `/api/notes` (GET list, POST create).
- [ ] Build `/api/notes/[id]` (GET detail).
- [ ] Add structured error handling for API routes (401, 404, 500).

### Phase 3: Core UI & Features (Days 4–5)
- [ ] Build **Dashboard**: Fetch aggregated data and display metric cards, overdue tasks, and recent notes.
- [ ] Build **Events Module**:
  - Events list page.
  - Create/Edit event forms.
  - Event detail page with related tasks and notes.
- [ ] Build **Tasks Module**:
  - Tasks list page with filtering (Overdue, Due Today, Due This Week, All).
  - Create task form.
  - Inline task status updates.
- [ ] Build **Meeting Notes Module**:
  - Notes list page.
  - Create note form.
  - Note detail page.

### Phase 4: Polish & Edge Cases (Day 6)
- [ ] Implement empty states across all modules using `<EmptyState>` component.
- [ ] Implement loading skeletons across all data-fetching boundaries.
- [ ] Add specific visual highlighting for Overdue (Red) and Due Today (Amber) tasks.
- [ ] Handle missing Notion token/invalid DB IDs with proper redirects and banners.
- [ ] Test mobile responsiveness (sidebar collapse, grid layouts).

### Phase 5: Testing & Deployment (Day 7)
- [ ] Verify no `any` types remain (except in Notion helpers).
- [ ] Ensure no Notion token is exposed in the client bundle.
- [ ] Test CRUD operations end-to-end against a live Notion test workspace.
- [ ] Deploy to Vercel and configure production environment variables.
- [ ] Final QA of UI/UX interactions.
