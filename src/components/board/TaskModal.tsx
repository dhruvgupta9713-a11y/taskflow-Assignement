"use client";

import { useState, useEffect } from "react";
import { Task, Priority } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { getPriorityColor, formatRelativeTime } from "@/lib/utils";
import { Trash2, Loader2, CalendarDays, User, Flag } from "lucide-react";

interface TaskModalProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

export function TaskModal({ task, open, onClose }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  if (!task) return null;

  const hasChanges =
    title !== task.title ||
    description !== task.description ||
    priority !== task.priority;

  const handleSave = () => {
    if (!hasChanges) return;
    updateTask.mutate(
      {
        taskId: task.id,
        data: { title, description, priority },
      },
      { onSuccess: onClose }
    );
  };

  const handleDelete = () => {
    deleteTask.mutate(task.id, { onSuccess: onClose });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-xl" id="task-modal">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant="outline"
              className={`text-[10px] h-5 ${getPriorityColor(task.priority)}`}
            >
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>
            <span className="text-[10px] text-zinc-600 font-mono">
              {task.id}
            </span>
          </div>
          <DialogTitle className="sr-only">Edit Task</DialogTitle>
          <DialogDescription className="sr-only">
            Edit task details including title, description, and priority.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs uppercase tracking-wider">
              Title
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-zinc-800/50 border-zinc-700 text-white text-base font-medium h-11"
              id="task-modal-title"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs uppercase tracking-wider">
              Description
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              className="bg-zinc-800/50 border-zinc-700 text-zinc-200 placeholder:text-zinc-600 min-h-[100px] resize-none"
              id="task-modal-description"
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs uppercase tracking-wider">
              Priority
            </Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
              <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-zinc-200 h-10" id="task-modal-priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="low" className="text-zinc-300">🟢 Low</SelectItem>
                <SelectItem value="medium" className="text-zinc-300">🟡 Medium</SelectItem>
                <SelectItem value="high" className="text-zinc-300">🟠 High</SelectItem>
                <SelectItem value="urgent" className="text-zinc-300">🔴 Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
            {task.assignee && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <User className="w-3.5 h-3.5" />
                <span>{task.assignee}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Updated {formatRelativeTime(task.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                id="task-delete-trigger"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-900 border-zinc-800">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-zinc-100">
                  Delete task?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-400">
                  This action cannot be undone. The task &ldquo;{task.title}&rdquo; will be
                  permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white"
                  id="task-delete-confirm"
                >
                  {deleteTask.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges || updateTask.isPending}
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
              id="task-save-btn"
            >
              {updateTask.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
