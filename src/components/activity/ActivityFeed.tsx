"use client";

import { useRef, useEffect, useState } from "react";
import { useActivity } from "@/hooks/useActivity";
import { formatRelativeTime } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRightLeft,
  Plus,
  Pencil,
  Trash2,
  UserPlus,
  PanelRightClose,
  PanelRight,
  Radio,
} from "lucide-react";

interface ActivityFeedProps {
  boardId: string;
}

function getActivityIcon(action: string) {
  switch (action) {
    case "task_created":
      return <Plus className="w-3 h-3" />;
    case "task_moved":
      return <ArrowRightLeft className="w-3 h-3" />;
    case "task_updated":
      return <Pencil className="w-3 h-3" />;
    case "task_deleted":
      return <Trash2 className="w-3 h-3" />;
    case "task_assigned":
      return <UserPlus className="w-3 h-3" />;
    default:
      return <Activity className="w-3 h-3" />;
  }
}

function getActivityColor(action: string) {
  switch (action) {
    case "task_created":
      return "bg-emerald-500/20 text-emerald-400";
    case "task_moved":
      return "bg-blue-500/20 text-blue-400";
    case "task_updated":
      return "bg-amber-500/20 text-amber-400";
    case "task_deleted":
      return "bg-red-500/20 text-red-400";
    case "task_assigned":
      return "bg-purple-500/20 text-purple-400";
    default:
      return "bg-zinc-500/20 text-zinc-400";
  }
}

export function ActivityFeed({ boardId }: ActivityFeedProps) {
  const { data: activities, isLoading } = useActivity(boardId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activities]);

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-20 z-20 text-zinc-500 hover:text-zinc-300 bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm h-9 w-9"
        id="activity-toggle"
      >
        <PanelRight className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div
      className="w-80 border-l border-zinc-800 bg-zinc-900/50 flex flex-col shrink-0 h-full"
      id="activity-feed"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-200">Activity</h3>
          <div className="flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400/70">Live</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-zinc-500 hover:text-zinc-300 h-7 w-7"
        >
          <PanelRightClose className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Activity list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-6 w-6 rounded-full bg-zinc-800 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-full bg-zinc-800" />
                  <Skeleton className="h-3 w-2/3 bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        ) : activities && activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex gap-3 py-2.5 border-b border-zinc-800/40 last:border-0 animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${getActivityColor(
                  activity.action
                )}`}
              >
                {getActivityIcon(activity.action)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <span className="font-medium text-zinc-200">
                    {activity.user}
                  </span>{" "}
                  {activity.details}
                </p>
                <p className="text-[10px] text-zinc-600 mt-1">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Activity className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
            <p className="text-xs text-zinc-500">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}
