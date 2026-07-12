import React from "react";
import { AnalyticsCard } from "@/components/shared/AnalyticsCard";

interface Activity {
  title: string;
  description: string;
  time: string;
  colorClass: string;
}

export function RecentActivities({ activities }: { activities: Activity[] }) {
  return (
    <AnalyticsCard>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Recent Activities</h3>
      <div className="space-y-lg relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">
        {activities.map((activity, i) => (
          <div key={i} className="relative flex items-start gap-lg pl-8">
            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${activity.colorClass} border-4 border-surface-container-lowest flex items-center justify-center`}></div>
            <div>
              <p className="text-sm text-on-surface font-medium">{activity.title}</p>
              <p className="text-xs text-on-surface-variant">{activity.description}</p>
              <p className="text-[10px] text-outline mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
