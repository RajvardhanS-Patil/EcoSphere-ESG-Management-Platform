import React from "react";
import { TrendingUp, Leaf } from "lucide-react";

interface GlobalScoreData {
  score: number;
  trend: string;
  industryAvg: number;
  percentile: string;
}

export function GlobalScoreCard({ data }: { data: GlobalScoreData }) {
  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest/50 backdrop-blur-md rounded-2xl p-lg relative overflow-hidden flex flex-col justify-between border-t-2 border-t-secondary shadow-sm">
      <div className="relative z-10">
        <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-widest">Global ESG Rating</span>
        <div className="flex items-baseline gap-sm mt-md">
          <h3 className="font-display-lg text-display-lg text-primary">{data.score}</h3>
          <span className="text-on-surface-variant font-headline-md">/ 100</span>
        </div>
        <div className="flex items-center gap-xs text-secondary mt-xs">
          <TrendingUp className="w-4 h-4" />
          <span className="font-label-md">{data.trend}</span>
        </div>
      </div>
      <div className="mt-xl relative z-10">
        <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
          <div className="h-full bg-secondary" style={{ width: `${data.score}%` }}></div>
        </div>
        <div className="flex justify-between mt-sm">
          <span className="font-label-sm text-on-surface-variant">Industry Avg: {data.industryAvg}</span>
          <span className="font-label-sm text-secondary font-bold">{data.percentile}</span>
        </div>
      </div>
      {/* Background aesthetic */}
      <div className="absolute -right-16 -top-16 opacity-10">
        <Leaf className="w-48 h-48" />
      </div>
    </div>
  );
}
