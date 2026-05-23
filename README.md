# BWAI-APC

## Student Organization Operations MVP

A lightweight MVP app for student organizations to track events, tasks, deadlines, meeting notes, and operational updates using Notion as the database.

This MVP focuses only on the core workflow and avoids unnecessary complexity.

# Development Prompt

ROLE:
You are an expert frontend developer, product engineer, and UX-focused SaaS builder.

Build a lightweight MVP for a Student Organization Operations app.

The app helps student organizations manage:
- events/projects
- tasks
- deadlines
- meeting notes
- operational tracking

This is NOT:
- an enterprise project management platform
- a complex SaaS system
- a full collaboration suite
- a Notion replacement

The goal is to build the simplest useful version possible.

==================================================
CORE PRODUCT IDEA
==================================================

The app is a frontend/dashboard layer built on top of Notion databases.

Notion is the database.

The app should provide:
- cleaner UI
- easier tracking
- operational dashboard
- better event visibility
- simpler task tracking

while using Notion in the background.

==================================================
TECH STACK
==================================================

Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

Database:
- Notion API
- Notion Databases

Deployment:
- Vercel

==================================================
DO NOT INCLUDE IN MVP
==================================================

Do not use:
- Supabase
- authentication/login
- user accounts
- roles and permissions
- organizations/workspaces
- realtime systems
- file uploads
- comments system
- notifications
- email systems
- Discord integrations
- AI features
- analytics dashboards
- advanced reporting
- approvals
- activity logs
- complex permissions
- multi-user collaboration
- two-way sync
- offline mode

==================================================
CORE PRODUCT RULE
==================================================

Notion is the source of truth.

The app is a frontend layer on top of Notion databases.

The app should:
- read data from Notion
- create/update data in Notion
- visualize data better than raw Notion databases

==================================================
MVP FEATURES
==================================================

Build only these features:

1. Dashboard
2. Events/Projects
3. Tasks
4. Meeting Notes
5. Notion Settings

==================================================
NOTION DATABASES
==================================================

Use these Notion databases:

1. Events Database
2. Tasks Database
3. Meeting Notes Database

==================================================
DASHBOARD
==================================================

Dashboard should show:
- total events
- active events
- upcoming events
- overdue tasks
- tasks due today
- tasks due this week
- recent meeting notes

Keep dashboard simple.

==================================================
EVENTS / PROJECTS
==================================================

Events database fields:
- Title
- Description
- Status
- Event Date
- Start Date
- End Date
- Lead Name
- Lead Email

Statuses:
- Planning
- Active
- Completed
- Cancelled

Views:
- event list
- event detail page
- related tasks
- related meeting notes

==================================================
TASKS
==================================================

Tasks database fields:
- Task Name
- Related Event
- Owner Name
- Owner Email
- Status
- Priority
- Due Date

Statuses:
- To Do
- In Progress
- Done
- Blocked

Priorities:
- Low
- Medium
- High

Requirements:
- overdue tasks should be visually highlighted
- tasks due today should be highlighted
- tasks due this week should be visible
- task updates should be fast and simple

Views:
- all tasks
- overdue tasks
- due today
- due this week
- tasks by event

==================================================
MEETING NOTES
==================================================

Meeting Notes database fields:
- Title
- Related Event
- Notes
- Action Items
- Author Name
- Date

Requirements:
- create meeting note
- link note to event/project
- add action items
- show recent notes

==================================================
NOTION INTEGRATION
==================================================

The app should:
- connect to Notion API
- read Notion databases
- create/update pages in Notion
- use Notion as the backend database

Requirements:
1. connect Notion integration token
2. set database IDs
3. fetch events
4. fetch tasks
5. fetch meeting notes
6. create events
7. create tasks
8. create meeting notes
9. update tasks
10. update events

Do not build:
- two-way sync complexity
- conflict resolution systems
- advanced sync queues

==================================================
PAGES
==================================================

Build these pages:

1. Dashboard
2. Events Page
3. Event Detail Page
4. Tasks Page
5. Task Detail Drawer/Page
6. Meeting Notes Page
7. Meeting Note Detail Page
8. Notion Settings Page

==================================================
UI / UX DIRECTION
==================================================

Design style:
- clean
- minimal
- modern
- student-friendly
- fast
- mobile responsive
- Notion-inspired
- Linear-inspired

Prioritize:
- simplicity
- fast task updates
- quick event creation
- obvious overdue tasks
- clean navigation

Avoid:
- enterprise dashboards
- too many charts
- complicated onboarding
- cluttered task boards

==================================================
EDGE CASES
==================================================

Handle:
- no events yet
- no tasks yet
- task without owner
- task without due date
- overdue task
- missing Notion token
- invalid database IDs
- empty Notion databases
- failed Notion API request

==================================================
OUTPUT REQUIREMENTS
==================================================

Generate:
1. MVP Summary
2. App Architecture
3. User Flows
4. Page Structure
5. Notion Database Structure
6. Notion API Integration Plan
7. Component Structure
8. Folder Structure
9. Development Tasks
10. Testing Checklist
11. Deployment Checklist

==================================================
FINAL TASK
==================================================

Build the smallest useful MVP possible.

Focus only on:
- dashboard
- events
- tasks
- deadlines
- meeting notes
- Notion database integration

# Documentation / PRD Prompt

ROLE:
You are an expert product manager, UX designer, frontend architect, and technical documentation specialist.

Create a lightweight MVP Product Requirements Document for a Student Organization Operations app.

The app helps student organizations manage:
- events/projects
- tasks
- deadlines
- meeting notes

The app uses Notion as the backend database.

This is a lightweight MVP.

Do not design an enterprise system.

==================================================
TECH STACK
==================================================

Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend Database:
- Notion API
- Notion Databases

Deployment:
- Vercel

==================================================
DO NOT INCLUDE IN MVP
==================================================

Do not include:
- Supabase
- login/auth
- user profiles
- roles and permissions
- organizations/workspaces
- file uploads
- comments
- activity logs
- approvals
- AI features
- analytics dashboards
- notifications
- email systems
- Discord integrations
- realtime collaboration
- advanced permissions
- two-way sync

==================================================
PRODUCT OVERVIEW
==================================================

The app should help student organizations answer:

1. What events are active?
2. What tasks need to be done?
3. Who owns each task?
4. What tasks are overdue?
5. What meeting notes exist?

The app should provide a cleaner operational dashboard on top of Notion databases.

==================================================
MVP FEATURES
==================================================

Build only:

1. Dashboard
2. Events/Projects
3. Tasks
4. Meeting Notes
5. Notion Settings

==================================================
NOTION DATABASES
==================================================

Use these databases:

1. Events Database
2. Tasks Database
3. Meeting Notes Database

==================================================
DASHBOARD
==================================================

Dashboard should show:
- total events
- active events
- upcoming events
- overdue tasks
- tasks due today
- tasks due this week
- recent meeting notes

==================================================
EVENTS / PROJECTS
==================================================

Fields:
- Title
- Description
- Status
- Event Date
- Start Date
- End Date
- Lead Name
- Lead Email

Statuses:
- Planning
- Active
- Completed
- Cancelled

==================================================
TASKS
==================================================

Fields:
- Task Name
- Related Event
- Owner Name
- Owner Email
- Status
- Priority
- Due Date

Statuses:
- To Do
- In Progress
- Done
- Blocked

Priorities:
- Low
- Medium
- High

==================================================
MEETING NOTES
==================================================

Fields:
- Title
- Related Event
- Notes
- Action Items
- Author Name
- Date

==================================================
NOTION INTEGRATION
==================================================

The app uses Notion as the database.

Requirements:
- connect Notion integration token
- set database IDs
- fetch events
- fetch tasks
- fetch meeting notes
- create events
- create tasks
- create meeting notes
- update events
- update tasks

Do not build:
- complex sync systems
- advanced caching
- conflict resolution
- background job queues

==================================================
PAGES
==================================================

Create documentation for:
1. Dashboard
2. Events Page
3. Event Detail Page
4. Tasks Page
5. Task Detail Page/Drawer
6. Meeting Notes Page
7. Meeting Note Detail Page
8. Notion Settings Page

==================================================
USER FLOWS
==================================================

Document these flows:
1. Connect Notion
2. Load dashboard
3. Create event
4. Create task
5. Update task status
6. View overdue tasks
7. Create meeting note

==================================================
UI / UX
==================================================

Design direction:
- clean
- minimal
- modern
- student-friendly
- mobile responsive
- Notion-inspired
- Linear-inspired

Prioritize:
- simplicity
- fast task updates
- quick event creation
- obvious overdue tasks
- clean navigation

==================================================
EDGE CASES
==================================================

Handle:
- no events yet
- no tasks yet
- task without owner
- task without due date
- overdue task
- missing Notion token
- invalid database IDs
- failed Notion API request
- empty databases

==================================================
OUTPUT FORMAT
==================================================

Generate:

# MVP Product Requirements Document

## 1. Executive Summary
## 2. Product Vision
## 3. MVP Scope
## 4. Feature Requirements
## 5. User Flows
## 6. UI / UX Requirements
## 7. Notion Database Structure
## 8. Notion API Integration
## 9. Edge Cases
## 10. Development Roadmap
## 11. Testing Checklist
## 12. Deployment Checklist
## 13. Future Features
## 14. Final MVP Build Summary

Keep the PRD lightweight and implementation-ready.

Avoid unnecessary complexity.
