import React from "react";
import { ChevronRight } from "lucide-react";

interface Activity {
  title: string;
  description: string;
  progress: number;
  category: string;
  categoryClass: string;
  progressClass: string;
  image: string;
}

export function CSRActivities({ activities }: { activities: Activity[] }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-lg">
        <h4 className="font-headline-md text-primary">CSR Activities</h4>
        <button className="text-secondary font-label-md flex items-center gap-xs hover:underline">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        {activities.map((activity, i) => (
          <div key={i} className="group relative bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden hover:shadow-lg transition-all">
            <div className="h-48 overflow-hidden relative">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={activity.title} src={activity.image} />
              <div className="absolute top-md left-md">
                <span className={`px-md py-xs ${activity.categoryClass} text-label-sm rounded-full`}>{activity.category}</span>
              </div>
            </div>
            <div className="p-lg">
              <h5 className="font-headline-sm text-primary mb-xs">{activity.title}</h5>
              <p className="text-body-sm text-on-surface-variant mb-md">{activity.description}</p>
              <div className="space-y-xs">
                <div className="flex justify-between font-label-sm">
                  <span>Progress</span>
                  <span>{activity.progress}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className={`h-full ${activity.progressClass} rounded-full`} style={{ width: `${activity.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
