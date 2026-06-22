"use client";

import { Column as ColumnType, Task } from "@/types";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { AddTaskForm } from "./AddTaskForm";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Inbox } from "lucide-react";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function Column({ column, tasks, onTaskClick }: ColumnProps) {
  return (
    <div className="flex flex-col bg-zinc-900/30 rounded-xl border border-zinc-800/60 w-[320px] min-w-[320px] max-h-[calc(100vh-180px)]">
      {/* Column header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-2.5">
          <h3 className="text-sm font-semibold text-zinc-200" id={`column-title-${column.id}`}>
            {column.title}
          </h3>
          <Badge
            variant="secondary"
            className="bg-zinc-800 text-zinc-400 text-[10px] h-5 px-1.5 min-w-[20px] justify-center"
          >
            {tasks.length}
          </Badge>
        </div>
        <button className="text-zinc-600 hover:text-zinc-400 transition-colors p-1 rounded">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Task list */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto px-2.5 py-2.5 space-y-2 min-h-[80px] transition-colors duration-200 ${
              snapshot.isDraggingOver
                ? "bg-indigo-500/5 border-indigo-500/10"
                : ""
            }`}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver ? (
              <div className="flex flex-col items-center justify-center py-8 text-zinc-600">
                <Inbox className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs">No tasks yet</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onClick={onTaskClick}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add task */}
      <div className="px-2.5 py-2 border-t border-zinc-800/40">
        <AddTaskForm columnId={column.id} boardId={column.boardId} />
      </div>
    </div>
  );
}
