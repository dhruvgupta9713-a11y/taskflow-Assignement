"use client";

import { useWorkspaceStore } from "@/store/workspaceStore";
import { Workspace } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Building2, Check } from "lucide-react";

export function WorkspaceSwitcher() {
  const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const setActiveWorkspace = useWorkspaceStore((s) => s.setActiveWorkspace);

  const handleSelect = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between px-3 py-6 hover:bg-zinc-800/50 text-left"
          id="workspace-switcher"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: activeWorkspace?.color || "#6366f1" }}
            >
              {activeWorkspace?.name?.charAt(0) || "W"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-100 truncate">
                {activeWorkspace?.name || "Select workspace"}
              </p>
              <p className="text-xs text-zinc-500 truncate">
                {activeWorkspace?.memberCount || 0} members
              </p>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-zinc-500 shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-zinc-900 border-zinc-800"
        align="start"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-zinc-400 text-xs font-normal px-3 py-2">
          Workspaces
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        {workspaces.map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            onClick={() => handleSelect(ws)}
            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer focus:bg-zinc-800 text-zinc-200"
            id={`workspace-option-${ws.id}`}
          >
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: ws.color }}
            >
              {ws.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{ws.name}</p>
              <p className="text-xs text-zinc-500">{ws.memberCount} members</p>
            </div>
            {activeWorkspace?.id === ws.id && (
              <Check className="w-4 h-4 text-indigo-400 shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer focus:bg-zinc-800 text-zinc-400">
          <Building2 className="w-4 h-4" />
          <span className="text-sm">Create workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
