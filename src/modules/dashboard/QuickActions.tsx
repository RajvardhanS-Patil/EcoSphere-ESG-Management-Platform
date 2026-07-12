import React from "react";
import { LineChart, ClipboardCheck, Award, Users2, Settings, Megaphone } from "lucide-react";

const quickActions = [
  { label: "Log Emission", icon: LineChart },
  { label: "Self Audit", icon: ClipboardCheck },
  { label: "Certify Data", icon: Award },
  { label: "Stakeholders", icon: Users2 },
  { label: "Benchmarks", icon: Settings },
  { label: "Announce", icon: Megaphone },
];

export function QuickActions() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Quick Actions</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-md">
        {quickActions.map((action, i) => (
          <button key={i} className="flex flex-col items-center justify-center p-lg bg-surface-container-low rounded-xl hover:bg-primary-container hover:text-primary-foreground transition-all group">
            <action.icon className="mb-2 text-primary group-hover:text-primary-foreground w-6 h-6 transition-colors" />
            <span className="text-xs font-bold uppercase tracking-tighter group-hover:text-primary-foreground transition-colors">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
