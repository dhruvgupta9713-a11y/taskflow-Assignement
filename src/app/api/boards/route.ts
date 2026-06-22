import { NextRequest, NextResponse } from "next/server";
import { mockBoards, mockUsers, getTasks } from "@/lib/mock/data";

function validateToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  return mockUsers.some((u) => u.token === token);
}

export async function GET(request: NextRequest) {
  if (!validateToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const workspaceId = searchParams.get("workspaceId");

  let boards = mockBoards;
  if (workspaceId) {
    boards = boards.filter((b) => b.workspaceId === workspaceId);
  }

  // Add task count
  const tasks = getTasks();
  const boardsWithCount = boards.map((board) => ({
    ...board,
    taskCount: tasks.filter((t) => t.boardId === board.id).length,
  }));

  return NextResponse.json(boardsWithCount);
}
