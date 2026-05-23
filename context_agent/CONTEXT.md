# Project Context
## BWAI-APC — Student Organization Operations App

**Project Name:** BWAI-APC
**Purpose:** A lightweight frontend layer on top of Notion databases for managing student organization events, tasks, and meeting notes.
**Core Philosophy:** The simplest useful version possible. Do not over-engineer. Notion is the source of truth.
**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Notion API, Vercel.

## Background
Student organizations often struggle with operations, relying on cluttered raw Notion databases. This app provides a cleaner, focused view of those same databases, making it easier for members to see what's active, what's overdue, and what needs to get done without getting lost in Notion's interface.

## Constraints & Rules
- **No Auth/Database:** Do not add authentication, Supabase, Prisma, etc. The app relies entirely on Notion for data.
- **Server-Side Only:** All Notion API calls must happen server-side via API Routes or Server Components.
- **No AI/Realtime/Complex Features:** Keep it strictly to CRUD operations on Events, Tasks, and Meeting notes.

## Notion Integration
We connect to three Notion databases via the Notion API using an Internal Integration Token:
1. **Events Database**
2. **Tasks Database**
3. **Meeting Notes Database**

The user must configure their `NOTION_TOKEN` and database IDs to use the app.
