import React from "react";
import { History, Activity, Check } from "lucide-react";

interface AuditEvent {
  date: string;
  dateColor: string;
  title: string;
  desc: string;
  tags: string[];
  icon: string;
  iconBg: string;
}

const iconMap: Record<string, React.ReactNode> = {
  pulse: <Activity className="w-3 h-3 text-white" />,
  check: <Check className="w-3 h-3 text-white" />,
};

export function AuditHistory({ history }: { history: AuditEvent[] }) {
  return (
    <div className="col-span-12 lg:col-span-6 bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm flex flex-col">
      <div className="flex items-center gap-sm mb-lg">
        <History className="text-primary w-6 h-6" />
        <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Audit History</h3>
      </div>
      <div className="relative border-l-2 border-outline-variant ml-4 pl-8 space-y-lg">
        {history.map((event, i) => (
          <div key={i} className="relative">
            <div className={`absolute -left-[45px] top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${event.iconBg}`}>
              {event.icon === "pulse" ? (
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              ) : (
                iconMap[event.icon]
              )}
            </div>
            <div>
              <span className={`font-label-sm font-bold uppercase ${event.dateColor}`}>{event.date}</span>
              <h4 className="font-body-md font-bold text-on-surface mt-1">{event.title}</h4>
              <p className="text-body-sm text-on-surface-variant">{event.desc}</p>
              {event.tags.length > 0 && (
                <div className="mt-md flex gap-2">
                  {event.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-0.5 bg-surface-container-high rounded text-[10px] font-label-md">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
