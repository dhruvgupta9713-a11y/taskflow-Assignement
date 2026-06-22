// ============================================================
// TaskFlow — Mock Seed Data
// ============================================================

import {
  User,
  Workspace,
  Board,
  Column,
  Task,
  Activity,
  Priority,
} from "@/types";

// ── Users ──────────────────────────────────────────────────
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Morgan",
    email: "admin@test.com",
    avatar: "AM",
    token: "mock-jwt-token-admin-2024",
  },
  {
    id: "user-2",
    name: "Jordan Lee",
    email: "user@test.com",
    avatar: "JL",
    token: "mock-jwt-token-user-2024",
  },
];

// ── Workspaces ─────────────────────────────────────────────
export const mockWorkspaces: Workspace[] = [
  {
    id: "ws-1",
    name: "Engineering",
    description: "Product engineering team workspace for building and shipping features",
    memberCount: 12,
    color: "#6366f1",
  },
  {
    id: "ws-2",
    name: "Marketing",
    description: "Marketing campaigns, content planning, and brand initiatives",
    memberCount: 8,
    color: "#f43f5e",
  },
  {
    id: "ws-3",
    name: "Design",
    description: "UI/UX design team workspace for prototypes and design systems",
    memberCount: 6,
    color: "#8b5cf6",
  },
];

// ── Boards ─────────────────────────────────────────────────
export const mockBoards: Board[] = [
  // Engineering
  {
    id: "board-1",
    workspaceId: "ws-1",
    name: "Sprint 24 — Core Platform",
    description: "Current sprint tasks for core platform development",
    isPublic: true,
    createdAt: "2024-11-01T09:00:00Z",
  },
  {
    id: "board-2",
    workspaceId: "ws-1",
    name: "API Redesign v2",
    description: "REST to GraphQL migration tasks and planning",
    isPublic: false,
    createdAt: "2024-10-15T09:00:00Z",
  },
  // Marketing
  {
    id: "board-3",
    workspaceId: "ws-2",
    name: "Q4 Campaign Launch",
    description: "Year-end marketing campaign planning and execution",
    isPublic: true,
    createdAt: "2024-10-20T09:00:00Z",
  },
  {
    id: "board-4",
    workspaceId: "ws-2",
    name: "Content Calendar",
    description: "Blog posts, social media, and newsletter scheduling",
    isPublic: false,
    createdAt: "2024-09-01T09:00:00Z",
  },
  // Design
  {
    id: "board-5",
    workspaceId: "ws-3",
    name: "Design System v3",
    description: "Component library updates and design token revisions",
    isPublic: true,
    createdAt: "2024-11-05T09:00:00Z",
  },
  {
    id: "board-6",
    workspaceId: "ws-3",
    name: "Mobile App Redesign",
    description: "iOS and Android app visual refresh project",
    isPublic: false,
    createdAt: "2024-10-10T09:00:00Z",
  },
];

// ── Columns ────────────────────────────────────────────────
export const mockColumns: Column[] = [
  // Board 1: Sprint 24
  { id: "col-1-1", boardId: "board-1", title: "Backlog", order: 0 },
  { id: "col-1-2", boardId: "board-1", title: "In Progress", order: 1 },
  { id: "col-1-3", boardId: "board-1", title: "Review", order: 2 },
  { id: "col-1-4", boardId: "board-1", title: "Done", order: 3 },
  // Board 2: API Redesign
  { id: "col-2-1", boardId: "board-2", title: "Planning", order: 0 },
  { id: "col-2-2", boardId: "board-2", title: "In Progress", order: 1 },
  { id: "col-2-3", boardId: "board-2", title: "Testing", order: 2 },
  { id: "col-2-4", boardId: "board-2", title: "Deployed", order: 3 },
  // Board 3: Q4 Campaign
  { id: "col-3-1", boardId: "board-3", title: "Ideas", order: 0 },
  { id: "col-3-2", boardId: "board-3", title: "In Progress", order: 1 },
  { id: "col-3-3", boardId: "board-3", title: "Review", order: 2 },
  { id: "col-3-4", boardId: "board-3", title: "Published", order: 3 },
  // Board 4: Content Calendar
  { id: "col-4-1", boardId: "board-4", title: "Drafts", order: 0 },
  { id: "col-4-2", boardId: "board-4", title: "Editing", order: 1 },
  { id: "col-4-3", boardId: "board-4", title: "Scheduled", order: 2 },
  // Board 5: Design System
  { id: "col-5-1", boardId: "board-5", title: "Backlog", order: 0 },
  { id: "col-5-2", boardId: "board-5", title: "In Progress", order: 1 },
  { id: "col-5-3", boardId: "board-5", title: "Review", order: 2 },
  { id: "col-5-4", boardId: "board-5", title: "Complete", order: 3 },
  // Board 6: Mobile Redesign
  { id: "col-6-1", boardId: "board-6", title: "Research", order: 0 },
  { id: "col-6-2", boardId: "board-6", title: "Wireframes", order: 1 },
  { id: "col-6-3", boardId: "board-6", title: "High Fidelity", order: 2 },
  { id: "col-6-4", boardId: "board-6", title: "Handoff", order: 3 },
];

// ── Helper ─────────────────────────────────────────────────
function makeTask(
  id: string,
  columnId: string,
  boardId: string,
  title: string,
  description: string,
  priority: Priority,
  assignee: string | null,
  order: number
): Task {
  return {
    id,
    columnId,
    boardId,
    title,
    description,
    status: "backlog",
    priority,
    assignee,
    order,
    createdAt: "2024-11-10T09:00:00Z",
    updatedAt: "2024-11-10T09:00:00Z",
  };
}

// ── Tasks ──────────────────────────────────────────────────
export const mockTasks: Task[] = [
  // Board 1 — Sprint 24
  // Backlog (col-1-1)
  makeTask("task-1", "col-1-1", "board-1", "Set up CI/CD pipeline for staging", "Configure GitHub Actions with automated deployment to staging environment", "high", "Alex Morgan", 0),
  makeTask("task-2", "col-1-1", "board-1", "Add rate limiting to API gateway", "Implement token bucket rate limiter on all public endpoints", "medium", "Jordan Lee", 1),
  makeTask("task-3", "col-1-1", "board-1", "Write unit tests for auth module", "Cover login, signup, password reset, and token refresh flows", "low", null, 2),
  makeTask("task-4", "col-1-1", "board-1", "Database index optimization", "Analyze slow queries and add missing composite indexes", "urgent", "Alex Morgan", 3),
  // In Progress (col-1-2)
  makeTask("task-5", "col-1-2", "board-1", "Implement WebSocket notifications", "Real-time push notifications for task updates and mentions", "high", "Alex Morgan", 0),
  makeTask("task-6", "col-1-2", "board-1", "Refactor user settings page", "Migrate from class components to hooks, add form validation", "medium", "Jordan Lee", 1),
  makeTask("task-7", "col-1-2", "board-1", "Add dark mode support", "Implement system-aware and manual dark mode toggle across all pages", "low", "Alex Morgan", 2),
  // Review (col-1-3)
  makeTask("task-8", "col-1-3", "board-1", "Fix pagination bug in task list", "Tasks duplicated when switching pages rapidly — debounce needed", "high", "Jordan Lee", 0),
  makeTask("task-9", "col-1-3", "board-1", "Update onboarding flow", "Add workspace creation step and invite team members prompt", "medium", "Alex Morgan", 1),
  // Done (col-1-4)
  makeTask("task-10", "col-1-4", "board-1", "Migrate to Next.js 14", "Successfully upgraded from Next.js 13 with App Router", "high", "Alex Morgan", 0),
  makeTask("task-11", "col-1-4", "board-1", "Set up error tracking with Sentry", "Configured Sentry for both client and server-side error capture", "medium", "Jordan Lee", 1),
  makeTask("task-12", "col-1-4", "board-1", "Design system color token update", "Updated all color tokens to match new brand guidelines", "low", "Alex Morgan", 2),

  // Board 2 — API Redesign
  // Planning (col-2-1)
  makeTask("task-13", "col-2-1", "board-2", "Define GraphQL schema for users", "Schema definition with queries, mutations, and subscriptions", "high", "Alex Morgan", 0),
  makeTask("task-14", "col-2-1", "board-2", "Audit current REST endpoints", "Document all endpoints, parameters, and response shapes", "medium", "Jordan Lee", 1),
  makeTask("task-15", "col-2-1", "board-2", "Plan deprecation timeline", "6-month rollout plan with versioned API support", "low", null, 2),
  // In Progress (col-2-2)
  makeTask("task-16", "col-2-2", "board-2", "Build user resolver", "Implement GraphQL resolvers for user CRUD operations", "high", "Alex Morgan", 0),
  makeTask("task-17", "col-2-2", "board-2", "Set up Apollo Server", "Configure Apollo Server v4 with Next.js API routes", "medium", "Jordan Lee", 1),
  // Testing (col-2-3)
  makeTask("task-18", "col-2-3", "board-2", "Integration tests for auth queries", "Test login, register, and token refresh GraphQL operations", "high", "Alex Morgan", 0),
  // Deployed (col-2-4)
  makeTask("task-19", "col-2-4", "board-2", "GraphQL playground setup", "Apollo Studio sandbox available at /api/graphql", "low", "Jordan Lee", 0),

  // Board 3 — Q4 Campaign
  // Ideas (col-3-1)
  makeTask("task-20", "col-3-1", "board-3", "Holiday email blast concept", "Design festive email template with year-in-review stats", "medium", "Jordan Lee", 0),
  makeTask("task-21", "col-3-1", "board-3", "TikTok campaign brainstorm", "Short-form video ideas showcasing product features", "low", null, 1),
  makeTask("task-22", "col-3-1", "board-3", "Partner co-marketing proposal", "Draft partnership proposal with complementary SaaS tools", "high", "Alex Morgan", 2),
  // In Progress (col-3-2)
  makeTask("task-23", "col-3-2", "board-3", "Landing page A/B test", "Two variants: feature-focused vs testimonial-focused hero", "high", "Alex Morgan", 0),
  makeTask("task-24", "col-3-2", "board-3", "Write blog post: 2024 Retrospective", "3000-word article covering product milestones and roadmap", "medium", "Jordan Lee", 1),
  // Review (col-3-3)
  makeTask("task-25", "col-3-3", "board-3", "Social media asset pack", "Instagram stories, Twitter cards, LinkedIn banners for launch", "medium", "Alex Morgan", 0),
  // Published (col-3-4)
  makeTask("task-26", "col-3-4", "board-3", "Press release draft", "Official announcement for Q4 product update", "high", "Jordan Lee", 0),
  makeTask("task-27", "col-3-4", "board-3", "Customer testimonial video", "3 customer interviews edited into 90-second highlight reel", "medium", "Alex Morgan", 1),

  // Board 4 — Content Calendar
  // Drafts (col-4-1)
  makeTask("task-28", "col-4-1", "board-4", "SEO guide: Task Management", "Long-form guide targeting 'best task management practices'", "high", "Jordan Lee", 0),
  makeTask("task-29", "col-4-1", "board-4", "Weekly newsletter #47", "Curate top industry links and product update highlight", "medium", null, 1),
  makeTask("task-30", "col-4-1", "board-4", "Case study: Enterprise client", "Interview and write-up of Acme Corp's workflow transformation", "high", "Alex Morgan", 2),
  // Editing (col-4-2)
  makeTask("task-31", "col-4-2", "board-4", "Product comparison article", "TaskFlow vs competitors — honest feature comparison", "medium", "Jordan Lee", 0),
  makeTask("task-32", "col-4-2", "board-4", "Tutorial: Getting started", "Step-by-step onboarding guide with screenshots", "low", "Alex Morgan", 1),
  // Scheduled (col-4-3)
  makeTask("task-33", "col-4-3", "board-4", "Year-end roundup newsletter", "Scheduled for Dec 28 — top features and community highlights", "medium", "Jordan Lee", 0),

  // Board 5 — Design System
  // Backlog (col-5-1)
  makeTask("task-34", "col-5-1", "board-5", "Update button component variants", "Add ghost, link, and destructive-outline variants", "medium", "Alex Morgan", 0),
  makeTask("task-35", "col-5-1", "board-5", "Create date picker component", "Accessible date picker with range selection support", "high", "Jordan Lee", 1),
  makeTask("task-36", "col-5-1", "board-5", "Audit color contrast ratios", "Ensure all text/background combos meet WCAG AA standard", "urgent", "Alex Morgan", 2),
  // In Progress (col-5-2)
  makeTask("task-37", "col-5-2", "board-5", "Redesign modal component", "Add slide-over variant and improved focus trap", "high", "Alex Morgan", 0),
  makeTask("task-38", "col-5-2", "board-5", "Build toast notification system", "Stackable toasts with auto-dismiss and action buttons", "medium", "Jordan Lee", 1),
  // Review (col-5-3)
  makeTask("task-39", "col-5-3", "board-5", "Table component with sorting", "Sortable, filterable data table with pagination", "high", "Alex Morgan", 0),
  makeTask("task-40", "col-5-3", "board-5", "Icon library migration", "Switch from Heroicons to Lucide for consistency", "low", "Jordan Lee", 1),
  // Complete (col-5-4)
  makeTask("task-41", "col-5-4", "board-5", "Typography scale documentation", "Documented all type scales, weights, and line heights", "medium", "Alex Morgan", 0),

  // Board 6 — Mobile Redesign
  // Research (col-6-1)
  makeTask("task-42", "col-6-1", "board-6", "Competitor app audit", "Screenshot and analyze top 5 competitor mobile experiences", "high", "Jordan Lee", 0),
  makeTask("task-43", "col-6-1", "board-6", "User interview synthesis", "Consolidate findings from 12 user interviews into themes", "high", "Alex Morgan", 1),
  makeTask("task-44", "col-6-1", "board-6", "Analytics review: mobile usage", "Identify top flows, drop-off points, and device distribution", "medium", null, 2),
  // Wireframes (col-6-2)
  makeTask("task-45", "col-6-2", "board-6", "Home screen wireframes", "3 layout variants for the main dashboard view", "high", "Alex Morgan", 0),
  makeTask("task-46", "col-6-2", "board-6", "Task detail sheet wireframe", "Bottom sheet vs full-page detail view exploration", "medium", "Jordan Lee", 1),
  // High Fidelity (col-6-3)
  makeTask("task-47", "col-6-3", "board-6", "Home screen high-fidelity mockup", "Final visual design with motion specs and spacing tokens", "high", "Alex Morgan", 0),
  // Handoff (col-6-4)
  makeTask("task-48", "col-6-4", "board-6", "Navigation component specs", "Detailed specs for bottom tab bar with badges and animations", "medium", "Jordan Lee", 0),
  makeTask("task-49", "col-6-4", "board-6", "Onboarding flow handoff", "Figma prototype + Zeplin links for 5-step onboarding", "low", "Alex Morgan", 1),
];

// ── Activity Log ───────────────────────────────────────────
export const mockActivities: Activity[] = [
  {
    id: "act-1",
    taskId: "task-5",
    boardId: "board-1",
    action: "task_moved",
    user: "Alex Morgan",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    details: 'Moved "Implement WebSocket notifications" from Backlog to In Progress',
  },
  {
    id: "act-2",
    taskId: "task-8",
    boardId: "board-1",
    action: "task_updated",
    user: "Jordan Lee",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    details: 'Updated priority of "Fix pagination bug" to High',
  },
  {
    id: "act-3",
    taskId: "task-10",
    boardId: "board-1",
    action: "task_moved",
    user: "Alex Morgan",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    details: 'Moved "Migrate to Next.js 14" from Review to Done',
  },
  {
    id: "act-4",
    taskId: "task-7",
    boardId: "board-1",
    action: "task_assigned",
    user: "Alex Morgan",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    details: 'Assigned "Add dark mode support" to Alex Morgan',
  },
  {
    id: "act-5",
    taskId: "task-12",
    boardId: "board-1",
    action: "task_created",
    user: "Jordan Lee",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    details: 'Created task "Design system color token update"',
  },
  {
    id: "act-6",
    taskId: "task-23",
    boardId: "board-3",
    action: "task_moved",
    user: "Alex Morgan",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    details: 'Moved "Landing page A/B test" from Ideas to In Progress',
  },
  {
    id: "act-7",
    taskId: "task-37",
    boardId: "board-5",
    action: "task_updated",
    user: "Alex Morgan",
    timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    details: 'Updated description of "Redesign modal component"',
  },
  {
    id: "act-8",
    taskId: "task-26",
    boardId: "board-3",
    action: "task_moved",
    user: "Jordan Lee",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    details: 'Moved "Press release draft" to Published',
  },
];

// ── Mutable data store (used by API routes) ────────────────
// These are cloned so API mutations don't modify the originals
let _tasks = [...mockTasks];
let _activities = [...mockActivities];
let _activityCounter = mockActivities.length;

export function getTasks(): Task[] {
  return _tasks;
}

export function setTasks(tasks: Task[]): void {
  _tasks = tasks;
}

export function getActivities(): Activity[] {
  return _activities;
}

export function addActivity(activity: Omit<Activity, "id">): Activity {
  _activityCounter++;
  const newActivity: Activity = {
    ...activity,
    id: `act-${_activityCounter}`,
  };
  _activities = [newActivity, ..._activities];
  return newActivity;
}

export function getTaskById(id: string): Task | undefined {
  return _tasks.find((t) => t.id === id);
}

export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const index = _tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  _tasks[index] = { ..._tasks[index], ...updates, updatedAt: new Date().toISOString() };
  return _tasks[index];
}

export function deleteTask(id: string): boolean {
  const before = _tasks.length;
  _tasks = _tasks.filter((t) => t.id !== id);
  return _tasks.length < before;
}

export function createTask(task: Task): Task {
  _tasks.push(task);
  return task;
}
