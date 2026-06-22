import { useQuery } from "@tanstack/react-query";
import { fetchActivity } from "@/lib/api/client";
import { Activity } from "@/types";

export function useActivity(boardId: string | null) {
  return useQuery<Activity[]>({
    queryKey: ["activity", boardId],
    queryFn: () => fetchActivity(boardId!),
    enabled: !!boardId,
    refetchInterval: 5000, // Poll every 5 seconds
    staleTime: 3000,
  });
}
