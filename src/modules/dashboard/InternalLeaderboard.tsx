import React from "react";
import { AnalyticsCard } from "@/components/shared/AnalyticsCard";

interface LeaderboardUser {
  id: number;
  name: string;
  role: string;
  points: number;
  avatar: string;
}

export function InternalLeaderboard({ leaderboard }: { leaderboard: LeaderboardUser[] }) {
  return (
    <AnalyticsCard className="border border-outline-variant/30">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Internal Leaderboard</h3>
      <div className="space-y-lg">
        {leaderboard.map((user, i) => (
          <div key={user.id} className="flex items-center gap-md">
            <span className="font-label-md text-label-md text-outline w-4">
              {String(i + 1).padStart(2, "0")}
            </span>
            <img className="w-10 h-10 rounded-full object-cover" alt={user.name} src={user.avatar} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-on-surface">{user.name}</p>
              <p className="text-xs text-on-surface-variant">{user.role}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{user.points.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-600">PTS</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-xl py-sm text-primary font-label-md text-label-md border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
        View All Participants
      </button>
    </AnalyticsCard>
  );
}
