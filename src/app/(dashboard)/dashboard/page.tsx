"use client";

import { useWorkspaceStore } from "@/store/workspaceStore";
import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "@/lib/api/client";
import { Board } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  KanbanSquare,
  Globe,
  Lock,
  ArrowRight,
  Plus,
  CalendarDays,
  ListTodo,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);

  const { data: boards, isLoading, error, refetch } = useQuery<Board[]>({
    queryKey: ["boards", activeWorkspace?.id],
    queryFn: () => fetchBoards(activeWorkspace!.id),
    enabled: !!activeWorkspace,
    staleTime: 60 * 1000,
  });

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white" id="dashboard-title">
                {activeWorkspace?.name || "Dashboard"}
              </h1>
              <p className="text-zinc-400 mt-1 text-sm">
                {activeWorkspace?.description || "Select a workspace to get started"}
              </p>
            </div>
            <Button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20"
              id="create-board-btn"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Board
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {!activeWorkspace ? (
          <div className="text-center py-20">
            <KanbanSquare className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-zinc-300 mb-2">
              No workspace selected
            </h2>
            <p className="text-zinc-500">
              Select a workspace from the sidebar to view your boards.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <Skeleton className="h-6 w-3/4 bg-zinc-800 mb-3" />
                <Skeleton className="h-4 w-full bg-zinc-800 mb-2" />
                <Skeleton className="h-4 w-2/3 bg-zinc-800 mb-6" />
                <Skeleton className="h-9 w-28 bg-zinc-800" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-400 mb-4">Failed to load boards</div>
            <Button variant="outline" onClick={() => refetch()} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Try again
            </Button>
          </div>
        ) : boards && boards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {boards.map((board, index) => (
              <Link
                key={board.id}
                href={`/dashboard/workspace/${activeWorkspace.id}/board/${board.id}`}
                className="group"
                id={`board-card-${board.id}`}
              >
                <div
                  className="relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-200 h-full"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-6 right-6 h-0.5 rounded-b opacity-60"
                    style={{ backgroundColor: activeWorkspace.color }}
                  />

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <KanbanSquare className="w-5 h-5 text-zinc-500" />
                      <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
                        {board.name}
                      </h3>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        board.isPublic
                          ? "border-emerald-500/30 text-emerald-400 text-[10px]"
                          : "border-zinc-700 text-zinc-500 text-[10px]"
                      }
                    >
                      {board.isPublic ? (
                        <Globe className="w-3 h-3 mr-1" />
                      ) : (
                        <Lock className="w-3 h-3 mr-1" />
                      )}
                      {board.isPublic ? "Public" : "Private"}
                    </Badge>
                  </div>

                  <p className="text-sm text-zinc-400 line-clamp-2 mb-5 min-h-[40px]">
                    {board.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <ListTodo className="w-3.5 h-3.5" />
                        {board.taskCount || 0} tasks
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(board.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <KanbanSquare className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-zinc-300 mb-2">
              No boards yet
            </h2>
            <p className="text-zinc-500 mb-6">
              Create your first board to start organizing tasks.
            </p>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Board
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
