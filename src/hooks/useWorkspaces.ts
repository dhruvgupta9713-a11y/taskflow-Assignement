import { useQuery } from "@tanstack/react-query";
import { fetchWorkspaces } from "@/lib/api/client";
import { Workspace } from "@/types";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useEffect } from "react";

export function useWorkspaces() {
  const setWorkspaces = useWorkspaceStore((s) => s.setWorkspaces);
  const setActiveWorkspace = useWorkspaceStore((s) => s.setActiveWorkspace);
  const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);

  const query = useQuery<Workspace[]>({
    queryKey: ["workspaces"],
    queryFn: fetchWorkspaces,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (query.data) {
      setWorkspaces(query.data);
      // Auto-select first workspace if none selected
      if (!activeWorkspace && query.data.length > 0) {
        setActiveWorkspace(query.data[0]);
      }
    }
  }, [query.data, activeWorkspace, setWorkspaces, setActiveWorkspace]);

  return query;
}
