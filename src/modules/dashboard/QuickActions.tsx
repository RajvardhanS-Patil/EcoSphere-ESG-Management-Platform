import React from "react";
import { useRouter } from "next/navigation";
import { LineChart, ClipboardCheck, Award, Users2, Settings, Megaphone } from "lucide-react";

const quickActions = [
  { label: "Log Emission", icon: LineChart, route: "/environmental" },
  { label: "Self Audit", icon: ClipboardCheck, route: "/governance" },
  { label: "Certify Data", icon: Award, route: "/governance" },
  { label: "Stakeholders", icon: Users2, route: "/social" },
  { label: "Benchmarks", icon: Settings, route: "/settings" },
  { label: "Announce", icon: Megaphone, route: "/social" },
];

export function QuickActions() {
  const router = useRouter();
  
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Quick Actions</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-md">
        {quickActions.map((action, i) => (
          <button key={i} onClick={() => router.push(action.route)} className="flex flex-col items-center justify-center p-lg bg-surface-container-low rounded-xl hover:bg-primary-container hover:text-primary-foreground transition-all group active:scale-95">
            <action.icon className="mb-2 text-primary group-hover:text-primary-foreground w-6 h-6 transition-colors" />
            <span className="text-xs font-bold uppercase tracking-tighter group-hover:text-primary-foreground transition-colors">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
