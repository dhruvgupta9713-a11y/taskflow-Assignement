import { NextRequest, NextResponse } from "next/server";
import { mockBoards, mockColumns, getTasks, mockUsers } from "@/lib/mock/data";

function validateToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  return mockUsers.some((u) => u.token === token);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!validateToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const board = mockBoards.find((b) => b.id === params.id);
  if (!board) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }

  const columns = mockColumns
    .filter((c) => c.boardId === board.id)
    .sort((a, b) => a.order - b.order);

  const tasks = getTasks()
    .filter((t) => t.boardId === board.id)
    .sort((a, b) => a.order - b.order);

  return NextResponse.json({
    ...board,
    columns,
    tasks,
  });
}
