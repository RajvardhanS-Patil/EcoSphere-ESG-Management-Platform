import React from "react";
import { AnalyticsCard } from "@/components/shared/AnalyticsCard";

interface Goal {
  label: string;
  progress: number;
  color: string;
  offset: number;
}

export function ActiveGoals({ goals }: { goals: Goal[] }) {
  return (
    <div className="bg-surface-container-lowest/50 backdrop-blur-md rounded-2xl p-xl flex flex-col justify-between border-l-4 border-l-secondary shadow-sm">
      <div>
        <h4 className="font-headline-md text-on-surface font-semibold">Active Goals</h4>
        <p className="font-body-sm text-on-surface-variant">Sustainability progress tracking</p>
      </div>
      <div className="flex items-center justify-around py-lg">
        {goals.map((goal, i) => (
          <div key={i} className="relative flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle className="text-surface-container-highest" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
              <circle 
                className={goal.color} 
                cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" 
                strokeDasharray="251.2" strokeDashoffset={goal.offset} strokeWidth="8">
              </circle>
            </svg>
            <span className="absolute font-label-md text-on-surface">{goal.progress}%</span>
            <div className="absolute -bottom-8 whitespace-nowrap font-label-sm text-on-surface-variant">{goal.label}</div>
          </div>
        ))}
      </div>
      <button className="w-full py-sm text-primary font-label-md hover:bg-primary/5 transition-colors rounded-lg mt-md">
        View All Goals
      </button>
    </div>
  );
}
