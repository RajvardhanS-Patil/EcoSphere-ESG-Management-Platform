import React from "react";
import { FileText, Star } from "lucide-react";

interface Notification {
  title: string;
  description: string;
  time: string;
  type: string;
  colorClass: string;
}

export function RecentNotifications({ notifications }: { notifications: Notification[] }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-lg">
        <h3 className="font-headline-md text-headline-md text-on-surface">Recent Notifications</h3>
        <span className="text-primary text-xs font-bold bg-primary-container/10 px-3 py-1 rounded-full">
          {notifications.length} New
        </span>
      </div>
      <div className="grid grid-cols-1 gap-sm">
        {notifications.map((note, i) => (
          <div key={i} className="flex items-center gap-md p-md hover:bg-surface-container transition-colors rounded-xl cursor-pointer group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${note.colorClass}`}>
              {note.type === "report" ? <FileText className="w-5 h-5" /> : <Star className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-on-surface">{note.title}</p>
              <p className="text-xs text-on-surface-variant">{note.description}</p>
            </div>
            <span className="text-[10px] text-outline">{note.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
