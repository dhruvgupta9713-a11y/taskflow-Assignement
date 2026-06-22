import { create } from "zustand";
import { Board, Column, Task } from "@/types";

interface BoardState {
  board: Board | null;
  columns: Column[];
  tasks: Task[];

  setBoard: (board: Board, columns: Column[], tasks: Task[]) => void;
  clearBoard: () => void;

  moveTask: (taskId: string, newColumnId: string, newOrder: number) => void;
  reorderTask: (taskId: string, newOrder: number) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

export const useBoardStore = create<BoardState>()((set) => ({
  board: null,
  columns: [],
  tasks: [],

  setBoard: (board, columns, tasks) =>
    set({ board, columns, tasks }),

  clearBoard: () =>
    set({ board: null, columns: [], tasks: [] }),

  moveTask: (taskId, newColumnId, newOrder) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? { ...t, columnId: newColumnId, order: newOrder, updatedAt: new Date().toISOString() }
          : t
      ),
    })),

  reorderTask: (taskId, newOrder) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? { ...t, order: newOrder, updatedAt: new Date().toISOString() }
          : t
      ),
    })),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? { ...t, ...updates, updatedAt: new Date().toISOString() }
          : t
      ),
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    })),
}));
