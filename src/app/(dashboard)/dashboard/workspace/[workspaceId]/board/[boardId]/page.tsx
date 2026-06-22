"use client";

import { useParams } from "next/navigation";
import { useBoard } from "@/hooks/useBoard";
import { BoardView } from "@/components/board/BoardView";
import { ActivityFeed } from "@/components/activity/ActivityFeed";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBoardStore } from "@/store/boardStore";
import { AlertCircle, Globe, Lock, RefreshCw, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function BoardPage() {
  const params = useParams();
  const boardId = params.boardId as string;
  const { isLoading, error, refetch } = useBoard(boardId);
  const board = useBoardStore((s) => s.board);

  const handleShare = () => {
    if (board?.isPublic) {
      const url = `${window.location.origin}/public/board/${board.id}`;
      navigator.clipboard.writeText(url);
      toast.success("Public board URL copied to clipboard!");
    } else {
      toast.info("This board is private. Make it public to share.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <div className="border-b border-zinc-800 px-8 py-5">
          <Skeleton className="h-7 w-64 bg-zinc-800 mb-2" />
          <Skeleton className="h-4 w-96 bg-zinc-800" />
        </div>
        <div className="flex gap-4 p-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[320px] shrink-0">
              <Skeleton className="h-10 w-full bg-zinc-800 rounded-lg mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-24 w-full bg-zinc-800 rounded-lg" />
                <Skeleton className="h-24 w-full bg-zinc-800 rounded-lg" />
                <Skeleton className="h-24 w-full bg-zinc-800 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-zinc-200 mb-2">
            Failed to load board
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            id="retry-board-btn"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Board header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-bold text-white" id="board-title">
                  {board?.name}
                </h1>
                <Badge
                  variant="outline"
                  className={
                    board?.isPublic
                      ? "border-emerald-500/30 text-emerald-400 text-[10px]"
                      : "border-zinc-700 text-zinc-500 text-[10px]"
                  }
                >
                  {board?.isPublic ? (
                    <Globe className="w-3 h-3 mr-1" />
                  ) : (
                    <Lock className="w-3 h-3 mr-1" />
                  )}
                  {board?.isPublic ? "Public" : "Private"}
                </Badge>
              </div>
              <p className="text-sm text-zinc-500">{board?.description}</p>
            </div>

            {board?.isPublic && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                id="share-board-btn"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Board + Activity */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-x-auto">
          <BoardView />
        </div>
        <ActivityFeed boardId={boardId} />
      </div>
    </div>
  );
}
