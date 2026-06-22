"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useWorkspaces } from "@/hooks/useWorkspaces";
import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "@/lib/api/client";
import { logoutApi } from "@/lib/api/client";
import { WorkspaceSwitcher } from "@/components/workspace/WorkspaceSwitcher";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Board } from "@/types";
import {
  LayoutDashboard,
  KanbanSquare,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Globe,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
  const clearWorkspace = useWorkspaceStore((s) => s.clearWorkspace);

  // Fetch workspaces
  useWorkspaces();

  // Fetch boards for active workspace
  const { data: boards, isLoading: boardsLoading } = useQuery<Board[]>({
    queryKey: ["boards", activeWorkspace?.id],
    queryFn: () => fetchBoards(activeWorkspace!.id),
    enabled: !!activeWorkspace,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // ignore
    }
    logout();
    clearWorkspace();
    router.push("/login");
  };

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800" />
          <div className="w-24 h-4 rounded bg-zinc-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-800 transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-16"
        )}
        id="sidebar"
      >
        {/* Logo & toggle */}
        <div className="flex items-center justify-between h-16 px-3 border-b border-zinc-800">
          {sidebarOpen ? (
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                TaskFlow
              </span>
            </Link>
          ) : (
            <Link href="/dashboard" className="mx-auto">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 h-8 w-8 shrink-0"
            id="sidebar-toggle"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Workspace Switcher */}
        {sidebarOpen && (
          <div className="px-2 py-3 border-b border-zinc-800">
            <WorkspaceSwitcher />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {sidebarOpen && (
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider px-3 mb-2">
              Navigation
            </p>
          )}
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-1",
              pathname === "/dashboard"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            )}
            id="nav-dashboard"
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          {/* Boards list */}
          {sidebarOpen && activeWorkspace && (
            <div className="mt-5">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider px-3 mb-2">
                Boards
              </p>
              {boardsLoading ? (
                <div className="space-y-2 px-3">
                  <Skeleton className="h-8 w-full bg-zinc-800" />
                  <Skeleton className="h-8 w-full bg-zinc-800" />
                  <Skeleton className="h-8 w-3/4 bg-zinc-800" />
                </div>
              ) : (
                boards?.map((board) => (
                  <Link
                    key={board.id}
                    href={`/dashboard/workspace/${activeWorkspace.id}/board/${board.id}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mb-0.5",
                      pathname.includes(board.id)
                        ? "bg-indigo-500/10 text-indigo-400"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                    )}
                    id={`nav-board-${board.id}`}
                  >
                    <KanbanSquare className="w-4 h-4 shrink-0" />
                    <span className="truncate flex-1">{board.name}</span>
                    {board.isPublic && (
                      <Globe className="w-3 h-3 text-zinc-600 shrink-0" />
                    )}
                  </Link>
                ))
              )}
            </div>
          )}
        </nav>

        {/* User section */}
        <div className="border-t border-zinc-800 p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.avatar || user?.name?.charAt(0) || "U"}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-zinc-500 hover:text-red-400 hover:bg-zinc-800 h-8 w-8 shrink-0"
              id="logout-button"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        {children}
      </main>
    </div>
  );
}
