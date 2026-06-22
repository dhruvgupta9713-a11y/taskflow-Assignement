import { useQuery } from "@tanstack/react-query";
import { fetchBoard } from "@/lib/api/client";
import { BoardWithData } from "@/types";
import { useBoardStore } from "@/store/boardStore";
import { useEffect } from "react";

export function useBoard(boardId: string | null) {
  const setBoard = useBoardStore((s) => s.setBoard);

  const query = useQuery<BoardWithData>({
    queryKey: ["board", boardId],
    queryFn: () => fetchBoard(boardId!),
    enabled: !!boardId,
    staleTime: 30 * 1000, // 30 seconds
  });

  useEffect(() => {
    if (query.data) {
      setBoard(
        {
          id: query.data.id,
          workspaceId: query.data.workspaceId,
          name: query.data.name,
          description: query.data.description,
          isPublic: query.data.isPublic,
          createdAt: query.data.createdAt,
        },
        query.data.columns,
        query.data.tasks
      );
    }
  }, [query.data, setBoard]);

  return query;
}
