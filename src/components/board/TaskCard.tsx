"use client";

import { Task } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";
import { getPriorityColor, getInitials } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface TaskCardProps {
  task: Task;
  index: number;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, index, onClick }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <div
          ref={provided.innerRef}
          {...(provided.draggableProps as any)}
          {...(provided.dragHandleProps as any)}
          className={`group bg-zinc-900/80 border border-zinc-800 rounded-lg p-3.5 cursor-pointer hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-150 ${
            snapshot.isDragging
              ? "shadow-xl shadow-black/40 border-indigo-500/30 rotate-[2deg] scale-105"
              : ""
          }`}
          onClick={() => onClick(task)}
          id={`task-card-${task.id}`}
        >
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 leading-snug mb-2 line-clamp-2">
                {task.title}
              </p>

              {task.description && (
                <p className="text-xs text-zinc-500 line-clamp-1 mb-3">
                  {task.description}
                </p>
              )}

              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0 h-5 ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </Badge>

                <div className="flex items-center gap-2">
                  {task.description && (
                    <MessageSquare className="w-3 h-3 text-zinc-600" />
                  )}
                  {task.assignee && (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 flex items-center justify-center border border-zinc-700" title={task.assignee}>
                      <span className="text-[8px] font-bold text-zinc-300">
                        {getInitials(task.assignee)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
