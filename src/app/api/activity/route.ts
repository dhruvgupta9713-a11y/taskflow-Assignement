import { NextRequest, NextResponse } from "next/server";
import { mockUsers, getActivities } from "@/lib/mock/data";

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
  const boardId = searchParams.get("boardId");

  let activities = getActivities();
  if (boardId) {
    activities = activities.filter((a) => a.boardId === boardId);
  }

  // Return last 20 activities, most recent first
  return NextResponse.json(activities.slice(0, 20));
}
