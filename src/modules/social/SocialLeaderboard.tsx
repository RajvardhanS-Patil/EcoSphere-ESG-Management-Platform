import React from "react";
import { Medal } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: string;
  progress: number;
  progressClass: string;
  avatar: string;
}

export function SocialLeaderboard({ leaderboard }: { leaderboard: LeaderboardEntry[] }) {
  return (
    <section className="bg-surface-container-low rounded-3xl p-lg border border-outline-variant">
      <div className="flex items-center justify-between mb-lg">
        <h4 className="font-headline-sm text-primary">Top Contributors</h4>
        <Medal className="w-5 h-5 text-on-surface-variant" />
      </div>
      <div className="space-y-sm">
        {leaderboard.map((user) => (
          <div key={user.rank} className={`flex items-center gap-md p-sm rounded-xl ${user.rank === 1 ? 'bg-surface-container-highest/50 border border-secondary/20' : 'hover:bg-surface-container-high transition-colors'}`}>
            <span className={`font-label-md w-4 ${user.rank === 1 ? 'text-secondary' : 'text-on-surface-variant'}`}>
              {user.rank}
            </span>
            <div className={`w-10 h-10 rounded-full overflow-hidden ${user.rank === 1 ? 'border-2 border-secondary p-[2px]' : ''}`}>
              <img className="w-full h-full rounded-full object-cover" alt={user.name} src={user.avatar} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-body-sm truncate ${user.rank === 1 ? 'font-bold' : 'font-medium'}`}>{user.name}</p>
              <div className="w-full h-1 bg-surface-container rounded-full mt-1">
                <div className={`h-full ${user.progressClass} rounded-full`} style={{ width: `${user.progress}%` }}></div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-label-sm text-primary">{user.xp}</p>
              <p className="text-[9px] uppercase tracking-tighter text-on-surface-variant">XP</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-lg py-sm border border-outline text-on-surface-variant font-label-md rounded-lg hover:bg-surface-container-high transition-colors">
        View Full Leaderboard
      </button>
    </section>
  );
}
