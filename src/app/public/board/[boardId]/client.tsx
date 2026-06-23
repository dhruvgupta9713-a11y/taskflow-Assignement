"use client";

import { Board, Column, Task } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPriorityColor, getInitials } from "@/lib/utils";
import {
  Zap,
  Globe,
  LogIn,
  KanbanSquare,
  Flag,
  Inbox,
} from "lucide-react";
import Link from "next/link";

interface PublicBoardClientProps {
  board: Board;
  columns: Column[];
  tasks: Task[];
}

export function PublicBoardClient({ board, columns, tasks }: PublicBoardClientProps) {
  const getColumnTasks = (columnId: string) =>
    tasks.filter((t) => t.columnId === columnId).sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm text-zinc-300">
              You&apos;re viewing a public board on <span className="font-semibold text-white">TaskFlow</span>
            </span>
          </div>
          <Link href="/login">
            <Button
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs h-8"
              id="public-board-signin"
            >
              <LogIn className="w-3.5 h-3.5 mr-1.5" />
              Sign in to edit
            </Button>
          </Link>
        </div>
      </div>

      {/* Board header */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <KanbanSquare className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-bold text-white" id="public-board-title">
              {board.name}
            </h1>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[10px]">
              <Globe className="w-3 h-3 mr-1" />
              Public
            </Badge>
          </div>
          <p className="text-zinc-400 text-sm max-w-2xl">
            {board.description}
          </p>
        </div>
      </div>

      {/* Board columns */}
      <div className="max-w-full overflow-x-auto">
        <div className="flex gap-4 p-6 min-w-max">
          {columns.map((column) => {
            const columnTasks = getColumnTasks(column.id);
            return (
              <div
                key={column.id}
                className="w-[300px] bg-zinc-900/30 rounded-xl border border-zinc-800/60"
              >
                {/* Column header */}
                <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-800/60">
                  <h3 className="text-sm font-semibold text-zinc-200">
                    {column.title}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-400 text-[10px] h-5 px-1.5"
                  >
                    {columnTasks.length}
                  </Badge>
                </div>

                {/* Tasks */}
                <div className="px-2.5 py-2.5 space-y-2 max-h-[60vh] overflow-y-auto">
                  {columnTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-zinc-600">
                      <Inbox className="w-6 h-6 mb-1.5 opacity-50" />
                      <p className="text-xs">No tasks</p>
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-3.5"
                      >
                        <p className="text-sm font-medium text-zinc-200 leading-snug mb-2">
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-xs text-zinc-500 line-clamp-2 mb-3">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={`text-[10px] px-1.5 py-0 h-5 ${getPriorityColor(task.priority)}`}
                          >
                            <Flag className="w-2.5 h-2.5 mr-1" />
                            {task.priority}
                          </Badge>
                          {task.assignee && (
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 flex items-center justify-center border border-zinc-700" title={task.assignee}>
                              <span className="text-[8px] font-bold text-zinc-300">
                                {getInitials(task.assignee)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <p className="text-xs text-zinc-600">
            Powered by <span className="text-zinc-400 font-medium">TaskFlow</span> — Collaborate and manage tasks with your team
          </p>
        </div>
      </div>
    </div>
  );
}
