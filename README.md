# BWAI-APC

## Student Organization Operations Management Platform

A student organization operations platform using **Supabase as the main backend/source of truth** and **Notion as an optional documentation and workspace integration**.

# Development Prompt

ROLE:
You are an expert SaaS architect, full-stack engineer, systems designer, and product strategist specializing in workflow systems, operational dashboards, and productivity platforms.

You are building a modern Student Organization Operations Management Platform with deep Notion integration.

The system is NOT a generic task manager.

It is an operational execution platform specifically designed for student organizations that struggle with project/event execution, task accountability, fragmented communication, approval workflows, and deadline visibility.

CORE ARCHITECTURE DECISION:
Supabase is the source of truth.
Notion is not the source of truth.

Use this architecture:

Frontend:
- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui

Backend / Source of Truth:
- Supabase Auth
- Supabase PostgreSQL
- Supabase Realtime
- Supabase Storage
- Supabase Edge Functions

Integration Layer:
- Notion API
- Discord Webhooks
- Email Notifications

The app must work even if Notion is disconnected, unavailable, or sync fails.

Notion should only be used for:
- documentation
- event pages
- meeting notes
- shareable workspace pages
- optional mirrored task/event databases
- knowledge management
- long-term archives

Supabase should handle:
- user authentication
- organizations
- members
- roles
- permissions
- committees
- tasks
- events
- approvals
- meetings
- notifications
- analytics
- activity logs
- file permissions
- Notion sync metadata

PRODUCT CONTEXT:
Student organizations usually operate using:
- Messenger
- Discord
- spreadsheets
- Google Docs
- Notion
- verbal coordination

This causes:
- unclear task ownership
- missed deadlines
- duplicate work
- poor accountability
- lost files
- delayed approvals
- weak committee coordination
- reactive event management
- leadership burnout

The system being built should solve these operational problems.

The app should become the primary operational platform.

Notion should become the connected documentation and workspace layer.

TARGET USERS:
1. Student Organization Presidents
2. Executive Board Members
3. Committee Heads
4. Members
5. Advisers

PRIMARY USE CASES:
1. Create and manage events/projects
2. Assign and monitor tasks
3. Track committee execution
4. Monitor deadlines and overdue tasks
5. Manage approval workflows
6. Store and sync documentation to Notion
7. Run meetings and convert notes into tasks
8. View operational analytics
9. Send automated reminders and alerts
10. Centralize organizational operations

SYSTEM GOAL:
Build a centralized student organization operations platform that improves:
- accountability
- visibility
- execution speed
- deadline tracking
- operational coordination
- event management efficiency

MVP MODULES:
1. Authentication & Onboarding
2. Organization Management
3. Committee Management
4. Member Management
5. Project/Event Management
6. Task Management
7. Approval Workflow System
8. Meeting Management
9. Notification System
10. Analytics Dashboard
11. File & Resource Management
12. Notion Integration Layer
13. Admin & Settings

USER ROLES:
- President
- Executive Board
- Committee Head
- Member
- Adviser

PERMISSION RULES:

President:
- Full organization access
- Manage all members, committees, events, tasks, approvals, files, settings, and integrations

Executive Board:
- Organization-wide visibility
- Can manage projects/events
- Can manage tasks and approvals
- Can view analytics

Committee Head:
- Can manage assigned committee
- Can create and assign committee tasks
- Can view committee analytics
- Can submit and review selected approvals

Member:
- Can view assigned tasks
- Can update assigned task status
- Can comment on authorized tasks
- Can submit files for approval

Adviser:
- Can view events/projects
- Can comment on selected items
- Can approve documents only if permission is granted

PROJECT/EVENT MANAGEMENT:
Each event/project must include:
- title
- description
- status
- start date
- end date
- event date
- assigned committees
- milestones
- budget estimate
- risk level
- attachments
- activity logs
- linked tasks
- linked Notion page

Project statuses:
- Planning
- Active
- At Risk
- Completed
- Cancelled

TASK MANAGEMENT:
Each task must include:
- title
- description
- assignee
- committee
- related event/project
- priority
- due date
- dependencies
- comments
- attachments
- activity history
- status
- Notion sync status

Task statuses:
- Pending
- In Progress
- For Review
- Approved
- Delayed
- Completed

Priority levels:
- Low
- Medium
- High
- Urgent

Task rules:
- Every task must have an owner
- Every task must belong to an event/project
- Every task must have a due date
- Overdue tasks should automatically trigger alerts
- Committee heads should see committee-wide tasks
- Members should only see authorized tasks
- President and Executive Board should see all tasks

APPROVAL WORKFLOW:
The system must support:
- file submissions
- approval requests
- reviewer assignment
- revisions
- approval history
- reviewer comments
- version tracking

Approval states:
- Pending Review
- Approved
- Rejected
- Needs Revision

Use cases:
- publication materials
- sponsorship letters
- budget approvals
- documentation reviews
- social media captions
- event documents
- external partner documents

MEETING MANAGEMENT:
The system must support:
- meeting scheduling
- agenda management
- attendance tracking
- meeting notes
- action items
- task extraction from notes

Meeting notes should optionally sync to Notion.

NOTIFICATION SYSTEM:
Trigger notifications for:
- task assignments
- due date reminders
- overdue tasks
- approval requests
- approval decisions
- meeting reminders
- mentions/comments
- milestone deadlines
- Notion sync failures

Channels:
- in-app notifications
- email
- Discord webhook integration

NOTION INTEGRATION:
The app is not built inside Notion.
The app integrates with Notion.

Notion integration requirements:
1. Connect Notion workspace using OAuth
2. Allow organization admins to select Events, Tasks, Meetings, and Files databases
3. Automatically create Notion pages when new events are created, meetings are created, or documentation is added
4. Sync tasks, meeting notes, event pages, and documentation links
5. Store Notion page IDs, database IDs, sync metadata, and last synced timestamps
6. Add manual sync button, retry failed syncs, and sync status indicators
7. The app must continue functioning if Notion is offline/disconnected
8. Notion must never be the only source of truth

ANALYTICS DASHBOARD:
Show:
- active events
- overdue tasks
- task completion rate
- member productivity
- committee workload
- project progress
- approval bottlenecks
- upcoming deadlines
- Notion sync health

REALTIME FEATURES:
Use Supabase Realtime for:
- live task updates
- live comments
- notification updates
- project status changes
- approval status updates
- meeting action item updates

FILE MANAGEMENT:
Support:
- file uploads
- file versioning
- permission-based access
- event attachments
- task attachments
- approval attachments

Use Supabase Storage.

AI FEATURES PHASE 2:
Design architecture for future AI support such as:
- AI meeting summaries
- AI action item extraction
- AI workload balancing
- AI risk prediction
- AI priority suggestions

Do not overbuild AI in MVP.

DATABASE REQUIREMENTS:
Generate:
- normalized PostgreSQL schema
- Supabase table structure
- indexes
- foreign keys
- relationships
- RLS policies
- audit/activity tables

Core tables should include:
- organizations
- users
- memberships
- committees
- committee_members
- projects
- project_committees
- milestones
- tasks
- task_dependencies
- approvals
- approval_versions
- meetings
- meeting_attendees
- meeting_action_items
- notifications
- files
- comments
- activities
- notion_integrations
- notion_database_mappings
- notion_sync_logs

OUTPUT REQUIREMENTS:
Generate:
1. Executive Summary
2. Product Architecture
3. User Flow Diagrams
4. Page-by-Page UI Breakdown
5. Component Architecture
6. Database Schema
7. Supabase RLS Policies
8. Backend/API Design
9. Realtime System Design
10. Notification Architecture
11. Notion Sync Architecture
12. File Management Architecture
13. Analytics Logic
14. Edge Cases
15. Folder Structure
16. Development Phases
17. Testing Checklist
18. Deployment Checklist
19. Scalability Considerations
20. Final MVP Build Plan

CONTEXT ENGINEERING INSTRUCTIONS:
Reason deeply from the operational reality of student organizations.

Assume:
- members forget deadlines
- leaders manually follow up often
- communication is fragmented
- committees work independently
- documentation is inconsistent
- leadership changes yearly
- students primarily use mobile devices
- onboarding must be simple

Prioritize:
- clarity
- accountability
- deadline visibility
- execution tracking
- operational transparency

Avoid:
- unnecessary enterprise complexity
- bloated features
- overly technical workflows
- complicated onboarding

The system should feel operationally lightweight but structurally powerful.

FINAL TASK:
Generate a complete implementation-ready MVP development specification for this Student Organization Operations Management Platform with Supabase backend and Notion integration.

# Documentation / PRD Prompt

You are an expert product manager, SaaS architect, full-stack engineer, UX designer, and technical documentation specialist.

Create a complete Product Requirements Document, technical architecture documentation, and MVP implementation plan for a web application called:

Student Organization Operations Management Platform

This app helps student organizations manage projects, events, committees, tasks, approvals, meetings, files, documentation, notifications, and analytics.

The application will be built as a custom web app using Supabase as the main backend and Notion as an optional documentation and workspace integration.

This is not a generic project management app.

It is specifically designed for student organization operations.

CORE ARCHITECTURE DECISION:
Use this architecture:

Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend / Source of Truth:
- Supabase Auth
- Supabase PostgreSQL
- Supabase Realtime
- Supabase Storage
- Supabase Edge Functions

Integration Layer:
- Notion API
- Discord Webhooks
- Email Notifications

Important system rule:
Supabase is the source of truth.
Notion is not the source of truth.

The app must work even if Notion is disconnected, unavailable, or sync fails.

Notion should only be used for:
- documentation
- event pages
- meeting notes
- shareable workspace pages
- optional mirrored task/event databases
- knowledge management
- long-term archives

Supabase should handle:
- user authentication
- organizations
- members
- roles
- permissions
- committees
- tasks
- events
- approvals
- meetings
- notifications
- analytics
- activity logs
- file permissions
- Notion sync metadata

PRODUCT OVERVIEW:
Create a PRD for a student organization operations platform that centralizes:
- event planning
- project execution
- committee coordination
- task tracking
- approval workflows
- meeting documentation
- file/resource management
- deadline monitoring
- operational analytics
- Notion documentation syncing

The platform should help student leaders reduce operational chaos, missed deadlines, poor accountability, scattered communication, and manual follow-ups.

The product should be lightweight enough for students but structured enough to support real organization operations.

PROBLEM STATEMENT:
Student organizations usually manage operations through:
- Messenger
- Discord
- Google Docs
- Google Drive
- spreadsheets
- Notion
- verbal instructions
- manual reminders

This creates major operational problems:
- unclear task ownership
- missed deadlines
- duplicated work
- forgotten responsibilities
- weak accountability
- delayed approvals
- lost files
- scattered meeting notes
- unclear committee progress
- poor event visibility
- no centralized source of truth
- leadership burnout
- weak documentation handoff between officer terms

The PRD must explain these problems clearly and connect each problem to a product feature.

PRODUCT POSITIONING:
Position the platform as:

A centralized operations management system for student organizations with Supabase-powered backend operations and Notion-powered documentation syncing.

The custom app is responsible for:
- login and user identity
- role-based access control
- organization and committee structure
- event/project tracking
- task ownership and deadlines
- approval workflows
- notifications
- analytics
- activity logs
- realtime updates
- file permissions

Notion is responsible for:
- documentation
- synced event pages
- meeting notes
- knowledge base
- shareable documents
- optional mirrored task/event databases

The app must not become only a Notion wrapper.

TARGET USERS:
Define the needs, goals, pain points, and permissions of:
1. President
2. Executive Board Member
3. Committee Head
4. Member
5. Adviser

For each role, include:
- primary goal
- common pain points
- dashboard needs
- actions they perform
- permissions
- limitations

USER PERSONAS:
Create detailed personas for:

1. President
Needs full visibility over all events, committees, overdue tasks, and risks.

2. Executive Board Member
Needs to monitor projects, approvals, and committee progress.

3. Committee Head
Needs to assign tasks, follow up with members, and report progress.

4. Member
Needs to clearly see assigned tasks, due dates, comments, and required submissions.

5. Adviser
Needs visibility and optional approval/comment access.

Each persona should include:
- background
- goals
- frustrations
- success scenario
- key screens used

MVP GOALS:
The MVP should achieve:
- centralize organization operations
- make task ownership clear
- track deadlines and overdue work
- improve event/project visibility
- support committee-level coordination
- support approval workflows
- connect documentation to Notion
- provide simple analytics
- reduce manual follow-ups
- improve officer transition documentation

MVP MODULES:
The MVP must include:
1. Authentication and onboarding
2. Organization management
3. Committee management
4. Member management
5. Event/project management
6. Task management
7. Approval workflow
8. Meeting management
9. Notification system
10. File/document management
11. Notion integration
12. Analytics dashboard
13. Admin/settings panel

ROLE-BASED ACCESS CONTROL:
Create a full role-permission matrix for:

President:
- full organization access
- manage members, committees, events, tasks, approvals, files, settings, and integrations

Executive Board:
- organization-wide visibility
- manage events/projects
- manage tasks and approvals
- view analytics

Committee Head:
- manage assigned committee
- create and assign committee tasks
- view committee analytics
- submit and review selected approvals

Member:
- view assigned tasks
- update assigned task status
- comment on authorized tasks
- submit files for approval

Adviser:
- view events/projects
- comment on selected items
- approve documents only if permission is granted

The PRD must include table format.

FEATURE REQUIREMENTS:
For every feature, use this format:
- Feature Name
- Description
- User Story
- Acceptance Criteria
- Priority
- Edge Cases

Required features:
A. Authentication and Onboarding
B. Organization Dashboard
C. Event/Project Management
D. Task Management
E. Approval Workflow
F. Meeting Management
G. Notifications
H. File and Document Management
I. Notion Integration
J. Analytics Dashboard

NOTION INTEGRATION SPECIFICATION:
Create a detailed Notion integration specification.

The app integrates with Notion but does not depend on it.

Include:
1. Notion OAuth flow
2. Workspace connection
3. Database selection/creation
4. Database mapping
5. Event sync behavior
6. Task sync behavior
7. Meeting notes sync behavior
8. File/document link sync behavior
9. Sync conflict handling
10. Retry system
11. Error handling
12. Manual sync button
13. Last synced timestamp
14. Disconnect behavior
15. Sync logs
16. Rate limit handling

Important sync rules:
- Supabase is source of truth
- Notion is a mirror/documentation layer
- If Notion sync fails, the app continues working
- Failed syncs are logged in Supabase
- Users can manually retry sync
- Admins can reconnect Notion
- Notion page IDs and database IDs are stored in Supabase
- Sync must avoid duplicate Notion pages
- Deleted Notion pages should not delete Supabase records automatically

USER FLOWS:
Create detailed user flows for:
1. New user onboarding
2. Create organization
3. Join organization through invite
4. Create committee
5. Add members
6. Create event/project
7. Create task
8. Update task status
9. Submit file for approval
10. Review approval request
11. Create meeting
12. Convert meeting action item into task
13. Connect Notion workspace
14. Map Notion databases
15. Sync event to Notion
16. Sync meeting notes to Notion
17. View analytics dashboard
18. Handle failed Notion sync
19. Invite adviser

Each user flow should include:
- actor
- starting point
- steps
- expected outcome
- possible errors

UI / UX REQUIREMENTS:
Create page-by-page UI documentation.

Required pages:
1. Login Page
2. Onboarding Page
3. Organization Setup Page
4. Main Dashboard
5. Events/Projects Page
6. Event Detail Page
7. Tasks Page
8. Task Detail Page
9. Committees Page
10. Committee Detail Page
11. Members Page
12. Approvals Page
13. Approval Detail Page
14. Meetings Page
15. Meeting Detail Page
16. Files/Resources Page
17. Analytics Page
18. Notifications Page
19. Settings Page
20. Notion Integration Settings Page

For each page, include:
- page purpose
- primary users
- key components
- actions available
- empty states
- error states
- loading states
- mobile behavior

Design style:
- clean
- modern
- dashboard-based
- student-friendly
- mobile-responsive
- inspired by Notion, Linear, ClickUp, and Trello

TECHNICAL ARCHITECTURE:
Document the technical architecture using:

Frontend:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod validation

Backend:
- Supabase Auth
- Supabase PostgreSQL
- Supabase Realtime
- Supabase Storage
- Supabase Edge Functions

Integrations:
- Notion API
- Discord Webhooks
- Email provider

Include:
- architecture overview
- data flow
- auth flow
- permission flow
- sync flow
- notification flow
- file upload flow

DATABASE DESIGN:
Create a normalized PostgreSQL/Supabase database schema.

Required tables:
- organizations
- users
- memberships
- committees
- committee_members
- projects
- project_committees
- milestones
- tasks
- task_dependencies
- approvals
- approval_versions
- meetings
- meeting_attendees
- meeting_action_items
- comments
- files
- notifications
- activities
- notion_integrations
- notion_database_mappings
- notion_sync_logs

For each table, include:
- table purpose
- columns
- data types
- primary keys
- foreign keys
- indexes
- constraints
- relationships

SUPABASE RLS REQUIREMENTS:
Create Row Level Security policies for:
- organization-level isolation
- role-based access
- member task visibility
- committee-level visibility
- adviser limited access
- file access control
- approval access control
- Notion integration admin-only access
- analytics read access

Include:
- policy names
- SQL examples
- explanation of each policy

Do not skip RLS.

RLS is required because the app supports multiple organizations.

API AND BACKEND LOGIC:
Document backend logic for:
- onboarding
- organization creation
- invitation flow
- role assignment
- committee creation
- event creation
- task creation
- task status updates
- approval submission
- approval decision
- meeting action item conversion
- notification generation
- file upload authorization
- Notion OAuth
- Notion sync
- Discord webhook sending
- analytics calculations

For each backend function, include:
- purpose
- input
- output
- validation
- permission checks
- error handling

REALTIME REQUIREMENTS:
Use Supabase Realtime for:
- task updates
- comments
- approval status changes
- notification updates
- project status changes
- meeting action item updates

Document:
- realtime channels
- subscribed tables
- event types
- permission considerations
- client update behavior

ANALYTICS REQUIREMENTS:
Define analytics calculations for:
- task completion rate
- overdue task count
- event progress percentage
- committee workload
- member productivity
- approval bottlenecks
- upcoming deadlines
- delayed projects
- tasks completed by week

Keep analytics simple and actionable.

NOTIFICATION RULES:
Define notification rules for:
1. Task assigned
2. Task due in 24 hours
3. Task overdue
4. Approval requested
5. Approval approved/rejected
6. Revision requested
7. Meeting scheduled
8. User mentioned in comment
9. Project marked at risk
10. Notion sync failed
11. Member added to organization
12. Committee head changed

For each notification, include:
- trigger condition
- recipient
- channel
- message format
- frequency
- anti-spam handling

EDGE CASES:
Include edge cases for:
- user belongs to multiple organizations
- Notion disconnected
- Notion API failure
- duplicate Notion task sync
- deleted Notion page
- changed Notion database schema
- overdue task without active assignee
- member removed from organization
- committee head changes
- event cancelled
- task dependency blocked
- file upload failure
- approval reviewer unavailable
- school email restriction mismatch
- duplicate invite
- unauthorized access attempt
- organization deleted
- role changed while user is active
- task deleted after sync
- meeting action item assigned to removed member

SUCCESS METRICS:
Define success metrics:

Operational metrics:
- reduced overdue tasks
- improved task completion rate
- fewer manual follow-ups
- faster approval turnaround
- clearer event progress visibility
- improved committee accountability
- better officer transition documentation

Product metrics:
- weekly active users
- tasks created per organization
- task completion ratio
- events created
- approvals completed
- Notion sync usage
- notification engagement
- approval completion time
- meeting action items converted to tasks

DEVELOPMENT ROADMAP:
Create a phased roadmap.

Phase 1: Core MVP
- auth
- organizations
- committees
- members
- events/projects
- tasks
- dashboard

Phase 2: Workflow Systems
- approvals
- meetings
- files
- notifications

Phase 3: Notion Integration
- OAuth
- database mapping
- event sync
- task sync
- meeting notes sync
- sync logs

Phase 4: Analytics
- dashboards
- task metrics
- committee metrics
- event progress

Phase 5: AI Enhancements
- AI meeting summaries
- AI action item extraction
- AI risk prediction
- AI workload suggestions

TESTING CHECKLIST:
Create testing checklist for:
- authentication
- organization creation
- invite flow
- role permissions
- organization isolation
- task visibility
- event creation
- approval workflow
- meeting action item conversion
- file uploads
- Notion OAuth
- Notion sync
- failed sync retry
- notification triggers
- realtime updates
- analytics accuracy
- mobile responsiveness
- empty states
- error states

DEPLOYMENT CHECKLIST:
Create deployment checklist for:
- environment variables
- Supabase project setup
- database migrations
- RLS policies
- storage buckets
- OAuth credentials
- Notion integration credentials
- email provider
- Discord webhook setup
- production domain
- monitoring
- backup strategy
- rate limit monitoring
- error logging

OPEN QUESTIONS:
Include open questions such as:
- Should organizations require verified school email domains?
- Should advisers have approval power by default?
- Should Notion sync be one-way or two-way in MVP?
- Should tasks created in Notion sync back to the app?
- Should Discord integration be organization-wide or committee-specific?
- Should file storage stay only in Supabase or also link to Google Drive?
- Should analytics be visible to all members or only leaders?

FINAL OUTPUT FORMAT:
Generate the PRD using this structure:

# Product Requirements Document

## 1. Executive Summary
## 2. Product Vision
## 3. Problem Statement
## 4. Product Positioning
## 5. Target Users
## 6. User Personas
## 7. MVP Goals
## 8. MVP Modules
## 9. Role-Based Access Control
## 10. Feature Requirements
## 11. Notion Integration Specification
## 12. User Flows
## 13. UI/UX Requirements
## 14. Technical Architecture
## 15. Database Schema
## 16. Supabase RLS Policies
## 17. API and Backend Logic
## 18. Realtime Requirements
## 19. Notification System
## 20. Analytics Requirements
## 21. Edge Cases
## 22. Success Metrics
## 23. Development Roadmap
## 24. Testing Checklist
## 25. Deployment Checklist
## 26. Open Questions
## 27. Final MVP Build Summary

Make the PRD detailed enough that a developer, AI coding agent, or product team can immediately start building the app.

Use clear sections, tables where useful, and implementation-ready language.

Do not make it generic.
Do not remove the student organization context.
Do not make Notion the main source of truth.
Do not skip Supabase.
Do not skip database design.
Do not skip RLS.
Do not skip role permissions.
Do not skip Notion sync architecture.
Do not overbuild AI in the MVP.
