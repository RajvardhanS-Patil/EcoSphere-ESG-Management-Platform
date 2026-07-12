import React from "react";
import { AnalyticsCard } from "@/components/shared/AnalyticsCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function CarbonEmissionOverview() {
  return (
    <AnalyticsCard>
      <SectionHeader
        title="Carbon Emission Trends"
        subtitle="Historical data vs. Net Zero targets"
        action={
          <>
            <button className="px-md py-1 rounded-full text-xs font-bold bg-primary text-on-primary">12 Months</button>
            <button className="px-md py-1 rounded-full text-xs font-medium text-on-surface-variant hover:bg-surface-container-high">Quarterly</button>
          </>
        }
      />
      <div className="h-64 chart-container flex items-end justify-between gap-2 px-md">
        {/* Simple custom visual representation of an area chart */}
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[60%] rounded-t-sm relative group transition-all hover:brightness-110">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-on-primary text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">12.4k</div>
        </div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[65%] rounded-t-sm transition-all hover:brightness-110"></div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[58%] rounded-t-sm transition-all hover:brightness-110"></div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[50%] rounded-t-sm transition-all hover:brightness-110"></div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[45%] rounded-t-sm transition-all hover:brightness-110"></div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[40%] rounded-t-sm transition-all hover:brightness-110"></div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[35%] rounded-t-sm transition-all hover:brightness-110"></div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[30%] rounded-t-sm transition-all hover:brightness-110"></div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[28%] rounded-t-sm transition-all hover:brightness-110"></div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[25%] rounded-t-sm transition-all hover:brightness-110"></div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[20%] rounded-t-sm border-t-2 border-secondary transition-all hover:brightness-110"></div>
        <div className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 h-[18%] rounded-t-sm border-t-2 border-secondary transition-all hover:brightness-110"></div>
      </div>
      <div className="flex justify-between px-md mt-sm text-[10px] font-label-sm text-outline uppercase">
        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
      </div>
    </AnalyticsCard>
  );
}
