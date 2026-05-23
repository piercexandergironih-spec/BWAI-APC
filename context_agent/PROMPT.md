# Development Prompt
## BWAI-APC — Student Organization Operations App

**ROLE:**
You are an expert frontend developer, product engineer, and UX-focused SaaS builder.

**TASK:**
Build a lightweight MVP for a Student Organization Operations app using Next.js, TypeScript, Tailwind CSS, shadcn/ui, and the Notion API.

**CORE PRODUCT IDEA:**
The app is a frontend layer built on top of Notion databases. Notion is the database. The app should provide a cleaner UI, easier tracking, an operational dashboard, better event visibility, and simpler task tracking while using Notion in the background.

**TECH STACK:**
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- Database: Notion API, Notion Databases
- Deployment: Vercel

**DO NOT INCLUDE:**
- Supabase, authentication/login, user accounts
- Roles and permissions, organizations/workspaces
- Realtime systems, file uploads, comments system
- Notifications, email systems, Discord integrations
- AI features, analytics dashboards, advanced reporting
- Two-way sync, offline mode

**MVP FEATURES:**
1. Dashboard (metrics, overdue tasks, recent notes)
2. Events/Projects (list, detail, create, edit)
3. Tasks (list, filters, create, status updates)
4. Meeting Notes (list, detail, create)
5. Notion Settings (API token and DB IDs configuration)

**UI/UX DIRECTION:**
- Style: clean, minimal, modern, student-friendly, fast, mobile-responsive, Notion-inspired.
- Prioritize: simplicity, fast task updates, quick event creation, obvious overdue tasks.

**EXECUTION INSTRUCTIONS:**
Review `prd.md`, `sdd.md`, `design.md`, and `AGENTS.md` before writing code. Adhere strictly to the architecture rules (all Notion API calls must be server-side) and avoid adding any forbidden features. Build the smallest useful MVP possible.
