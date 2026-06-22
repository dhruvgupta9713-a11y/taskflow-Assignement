import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskApi, updateTaskApi, deleteTaskApi } from "@/lib/api/client";
import { useBoardStore } from "@/store/boardStore";
import { Task } from "@/types";
import { toast } from "sonner";

export function useCreateTask() {
  const queryClient = useQueryClient();
  const addTask = useBoardStore((s) => s.addTask);

  return useMutation({
    mutationFn: createTaskApi,
    onSuccess: (newTask: Task) => {
      addTask(newTask);
      queryClient.invalidateQueries({ queryKey: ["board"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Task created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create task");
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const updateTaskStore = useBoardStore((s) => s.updateTask);

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: Record<string, unknown> }) =>
      updateTaskApi(taskId, data),
    onSuccess: (updatedTask: Task) => {
      updateTaskStore(updatedTask.id, updatedTask);
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Task updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update task");
    },
  });
}

export function useMoveTask() {
  const queryClient = useQueryClient();
  const moveTask = useBoardStore((s) => s.moveTask);

  return useMutation({
    mutationFn: ({
      taskId,
      columnId,
      order,
    }: {
      taskId: string;
      columnId: string;
      order: number;
    }) => updateTaskApi(taskId, { columnId, order }),
    onMutate: ({ taskId, columnId, order }) => {
      // Optimistic update
      moveTask(taskId, columnId, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity"] });
    },
    onError: (error: Error) => {
      // Revert by refetching
      queryClient.invalidateQueries({ queryKey: ["board"] });
      toast.error(error.message || "Failed to move task");
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const deleteTaskStore = useBoardStore((s) => s.deleteTask);

  return useMutation({
    mutationFn: (taskId: string) => deleteTaskApi(taskId),
    onSuccess: (_, taskId) => {
      deleteTaskStore(taskId);
      queryClient.invalidateQueries({ queryKey: ["board"] });
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      toast.success("Task deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete task");
    },
  });
}
