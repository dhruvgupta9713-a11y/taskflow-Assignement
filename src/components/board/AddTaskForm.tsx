"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTask } from "@/hooks/useTasks";
import { Plus, X, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Priority } from "@/types";

interface AddTaskFormProps {
  columnId: string;
  boardId: string;
}

export function AddTaskForm({ columnId, boardId }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const createTask = useCreateTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask.mutate(
      {
        columnId,
        boardId,
        title: title.trim(),
        priority,
      },
      {
        onSuccess: () => {
          setTitle("");
          setPriority("medium");
          setIsOpen(false);
        },
      }
    );
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-start text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 h-9 text-sm"
        onClick={() => setIsOpen(true)}
        id={`add-task-btn-${columnId}`}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add task
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5 animate-fade-in" id={`add-task-form-${columnId}`}>
      <Input
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        className="bg-zinc-800/50 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 text-sm h-9"
        id={`add-task-input-${columnId}`}
      />
      <div className="flex items-center gap-2">
        <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
          <SelectTrigger className="h-8 text-xs bg-zinc-800/50 border-zinc-700 text-zinc-300 w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            <SelectItem value="low" className="text-xs text-zinc-300">Low</SelectItem>
            <SelectItem value="medium" className="text-xs text-zinc-300">Medium</SelectItem>
            <SelectItem value="high" className="text-xs text-zinc-300">High</SelectItem>
            <SelectItem value="urgent" className="text-xs text-zinc-300">Urgent</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsOpen(false);
            setTitle("");
          }}
          className="h-8 w-8 text-zinc-500 hover:text-zinc-300"
        >
          <X className="w-4 h-4" />
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={!title.trim() || createTask.isPending}
          className="h-8 bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3"
          id={`add-task-submit-${columnId}`}
        >
          {createTask.isPending ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            "Add"
          )}
        </Button>
      </div>
    </form>
  );
}
