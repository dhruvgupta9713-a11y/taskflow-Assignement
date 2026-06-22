import { NextRequest, NextResponse } from "next/server";
import {
  mockUsers,
  updateTask,
  deleteTask,
  getTaskById,
  addActivity,
  mockColumns,
} from "@/lib/mock/data";

function validateToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const user = mockUsers.find((u) => u.token === token);
  return user ? user.name : null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userName = validateToken(request);
  if (!userName) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const existingTask = getTaskById(params.id);
    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const updatedTask = updateTask(params.id, body);
    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Generate activity based on what changed
    if (body.columnId && body.columnId !== existingTask.columnId) {
      const newColumn = mockColumns.find((c) => c.id === body.columnId);
      addActivity({
        taskId: params.id,
        boardId: existingTask.boardId,
        action: "task_moved",
        user: userName,
        timestamp: new Date().toISOString(),
        details: `Moved "${existingTask.title}" to ${newColumn?.title || "another column"}`,
      });
    } else {
      const changedFields = Object.keys(body).filter(
        (k) => k !== "order" && k !== "updatedAt"
      );
      if (changedFields.length > 0) {
        addActivity({
          taskId: params.id,
          boardId: existingTask.boardId,
          action: "task_updated",
          user: userName,
          timestamp: new Date().toISOString(),
          details: `Updated ${changedFields.join(", ")} of "${existingTask.title}"`,
        });
      }
    }

    return NextResponse.json(updatedTask);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userName = validateToken(request);
  if (!userName) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const task = getTaskById(params.id);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  addActivity({
    taskId: params.id,
    boardId: task.boardId,
    action: "task_deleted",
    user: userName,
    timestamp: new Date().toISOString(),
    details: `Deleted task "${task.title}"`,
  });

  deleteTask(params.id);

  return NextResponse.json({ message: "Task deleted" });
}
