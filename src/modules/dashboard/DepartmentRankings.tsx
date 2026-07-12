import React from "react";
import { AnalyticsCard } from "@/components/shared/AnalyticsCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ExternalLink } from "lucide-react";

interface DepartmentScore {
  name: string;
  score: number;
  color: string;
}

export function DepartmentRankings({ departments }: { departments: DepartmentScore[] }) {
  return (
    <AnalyticsCard>
      <SectionHeader
        title="Department ESG Performance"
        action={
          <button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline">
            View Full Report <ExternalLink className="w-4 h-4" />
          </button>
        }
      />
      <div className="space-y-md">
        {departments.map((dept, index) => (
          <div key={index} className="space-y-sm">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-on-surface">{dept.name}</span>
              <span className="text-primary">{dept.score}%</span>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
              <div className={`h-full ${dept.color} rounded-full`} style={{ width: `${dept.score}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
