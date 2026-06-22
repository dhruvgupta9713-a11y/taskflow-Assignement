// ============================================================
// TaskFlow — TypeScript Interfaces
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  token: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  color: string;
}

export interface Board {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  taskCount?: number;
}

export interface Column {
  id: string;
  boardId: string;
  title: string;
  order: number;
}

export type Priority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "backlog" | "in-progress" | "review" | "done";

export interface Task {
  id: string;
  columnId: string;
  boardId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignee: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type ActivityAction =
  | "task_created"
  | "task_updated"
  | "task_moved"
  | "task_deleted"
  | "task_assigned";

export interface Activity {
  id: string;
  taskId: string;
  boardId: string;
  action: ActivityAction;
  user: string;
  timestamp: string;
  details: string;
}

// API response types
export interface LoginResponse {
  user: Omit<User, "token">;
  token: string;
}

export interface BoardWithData extends Board {
  columns: Column[];
  tasks: Task[];
}

export interface ApiError {
  error: string;
  status: number;
}
