import { NextRequest, NextResponse } from "next/server";
import { mockUsers, createTask, addActivity } from "@/lib/mock/data";
import { Task } from "@/types";
import { generateId } from "@/lib/utils";

function validateToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const user = mockUsers.find((u) => u.token === token);
  return user ? user.name : null;
}

export async function POST(request: NextRequest) {
  const userName = validateToken(request);
  if (!userName) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { columnId, boardId, title, description, priority } = body;

    if (!columnId || !boardId || !title) {
      return NextResponse.json(
        { error: "columnId, boardId, and title are required" },
        { status: 400 }
      );
    }

    const newTask: Task = {
      id: generateId("task"),
      columnId,
      boardId,
      title,
      description: description || "",
      status: "backlog",
      priority: priority || "medium",
      assignee: userName,
      order: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    createTask(newTask);

    addActivity({
      taskId: newTask.id,
      boardId,
      action: "task_created",
      user: userName,
      timestamp: new Date().toISOString(),
      details: `Created task "${title}"`,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
