import { useAuthStore } from "@/store/authStore";

const API_BASE = "/api";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    useAuthStore.getState().logout();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(data.error || "Request failed");
  }

  return response.json();
}

// Auth API
export async function loginApi(email: string, password: string) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({ error: "Login failed" }));
    throw new Error(data.error || "Login failed");
  }

  return response.json();
}

export async function logoutApi() {
  await fetch(`${API_BASE}/logout`, { method: "POST" });
}

// Workspaces API
export async function fetchWorkspaces() {
  return fetchWithAuth("/workspaces");
}

// Boards API
export async function fetchBoards(workspaceId: string) {
  return fetchWithAuth(`/boards?workspaceId=${workspaceId}`);
}

// Board detail API
export async function fetchBoard(boardId: string) {
  return fetchWithAuth(`/board/${boardId}`);
}

// Task APIs
export async function createTaskApi(data: {
  columnId: string;
  boardId: string;
  title: string;
  description?: string;
  priority?: string;
}) {
  return fetchWithAuth("/task", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTaskApi(
  taskId: string,
  data: Record<string, unknown>
) {
  return fetchWithAuth(`/task/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteTaskApi(taskId: string) {
  return fetchWithAuth(`/task/${taskId}`, {
    method: "DELETE",
  });
}

// Activity API
export async function fetchActivity(boardId: string) {
  return fetchWithAuth(`/activity?boardId=${boardId}`);
}

// Public API (no auth)
export async function fetchPublicBoard(boardId: string) {
  const response = await fetch(`${API_BASE}/public/board/${boardId}`);
  if (!response.ok) {
    const data = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(data.error || "Board not found");
  }
  return response.json();
}
