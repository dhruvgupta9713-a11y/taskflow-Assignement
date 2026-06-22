"use client";

import { useState, useCallback } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useBoardStore } from "@/store/boardStore";
import { useMoveTask } from "@/hooks/useTasks";
import { Column } from "./Column";
import { TaskModal } from "./TaskModal";
import { Task } from "@/types";

export function BoardView() {
  const board = useBoardStore((s) => s.board);
  const columns = useBoardStore((s) => s.columns);
  const tasks = useBoardStore((s) => s.tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const moveTaskMutation = useMoveTask();

  const getColumnTasks = useCallback(
    (columnId: string) => {
      return tasks
        .filter((t) => t.columnId === columnId)
        .sort((a, b) => a.order - b.order);
    },
    [tasks]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) return;

      // No change
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      // Calculate new order value
      const destTasks = getColumnTasks(destination.droppableId);
      let newOrder: number;

      if (destination.index === 0) {
        newOrder = destTasks.length > 0 ? destTasks[0].order - 1 : 0;
      } else if (destination.index >= destTasks.length) {
        newOrder = destTasks[destTasks.length - 1].order + 1;
      } else {
        const prevTask = destTasks[destination.index - 1];
        const nextTask = destTasks[destination.index];
        newOrder = (prevTask.order + nextTask.order) / 2;
      }

      moveTaskMutation.mutate({
        taskId: draggableId,
        columnId: destination.droppableId,
        order: newOrder,
      });
    },
    [getColumnTasks, moveTaskMutation]
  );

  const handleTaskClick = useCallback((task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedTask(null);
  }, []);

  if (!board) return null;

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 p-6 board-scroll h-full" id="board-view">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={getColumnTasks(column.id)}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        task={selectedTask}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
