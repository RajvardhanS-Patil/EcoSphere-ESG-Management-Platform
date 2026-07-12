import React from "react";
import { ArrowUp } from "lucide-react";

interface HeroStat {
  label: string;
  value: string;
  trend: string;
  trendIcon: string;
  colorClass: string;
  textClass: string;
}

export function HeroStatsRow({ stats }: { stats: HeroStat[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
      {stats.map((stat, i) => (
        <div key={i} className={`bg-surface-container-lowest/50 backdrop-blur-md p-lg rounded-2xl border-t-2 ${stat.colorClass} shadow-sm`}>
          <p className="font-label-sm text-on-surface-variant uppercase tracking-widest mb-sm">{stat.label}</p>
          <div className="flex items-end gap-md">
            <h3 className="font-headline-lg text-display-lg text-primary">{stat.value}</h3>
            <span className={`${stat.textClass} font-label-md mb-xs flex items-center`}>
              {stat.trendIcon === "arrow_upward" && <ArrowUp className="w-4 h-4 mr-1" />}
              {stat.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
