import React from "react";
import { AnalyticsCard } from "@/components/shared/AnalyticsCard";

export function CarbonTrends() {
  return (
    <AnalyticsCard className="xl:col-span-2 flex flex-col gap-lg">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-headline-md text-on-surface">Carbon Trends</h4>
          <p className="font-body-sm text-on-surface-variant">Year-over-year comparative analysis</p>
        </div>
        <select className="bg-surface-container-low border-none rounded-lg font-label-md px-md py-sm focus:ring-0">
          <option>Last 12 Months</option>
          <option>Year-to-Date</option>
        </select>
      </div>
      <div className="h-64 w-full relative flex items-end justify-between px-md pt-md">
        {/* Simulated Chart Lines using SVG */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 px-md py-md">
          <div className="border-t border-on-surface"></div>
          <div className="border-t border-on-surface"></div>
          <div className="border-t border-on-surface"></div>
          <div className="border-t border-on-surface"></div>
        </div>
        <div className="w-full h-full flex items-end">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,80 Q10,75 20,60 T40,65 T60,40 T80,30 T100,20" fill="none" stroke="#006a61" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
            <path d="M0,90 Q15,85 30,75 T50,70 T70,55 T90,50 T100,45" fill="none" stroke="#003527" strokeDasharray="4 2" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
          </svg>
        </div>
      </div>
      <div className="flex gap-xl font-label-sm text-on-surface-variant">
        <div className="flex items-center gap-sm">
          <div className="w-3 h-3 rounded-full bg-secondary"></div> 2024 (Actual)
        </div>
        <div className="flex items-center gap-sm">
          <div className="w-3 h-3 rounded-full bg-primary opacity-50"></div> 2023 (Baseline)
        </div>
      </div>
    </AnalyticsCard>
  );
}
