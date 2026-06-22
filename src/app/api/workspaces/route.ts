import { NextRequest, NextResponse } from "next/server";
import { mockWorkspaces, mockUsers } from "@/lib/mock/data";

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
  return NextResponse.json(mockWorkspaces);
}
