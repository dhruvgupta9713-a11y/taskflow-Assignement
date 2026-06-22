import { NextRequest, NextResponse } from "next/server";
import { mockBoards, mockColumns, getTasks } from "@/lib/mock/data";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const board = mockBoards.find((b) => b.id === params.id);

  if (!board) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }

  if (!board.isPublic) {
    return NextResponse.json(
      { error: "This board is not publicly shared" },
      { status: 403 }
    );
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
