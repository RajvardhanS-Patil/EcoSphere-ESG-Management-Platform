import React from "react";
import { PlusSquare } from "lucide-react";

interface HistoryItem {
  title: string;
  time: string;
  active: boolean;
}

export function AICopilotHistory({ history }: { history: HistoryItem[] }) {
  return (
    <aside className="w-72 border-r border-outline-variant bg-surface-container-lowest flex flex-col p-md shrink-0 h-full">
      <div className="flex items-center justify-between mb-lg px-sm">
        <h3 className="font-label-md text-on-surface font-semibold">History</h3>
        <button className="p-xs hover:bg-surface-container-high rounded-lg transition-colors">
          <PlusSquare className="w-5 h-5 text-outline" />
        </button>
      </div>
      <div className="flex-grow flex flex-col gap-sm overflow-y-auto custom-scrollbar">
        {history.map((item, i) => (
          <div key={i} className={`p-md rounded-xl cursor-pointer transition-all ${item.active ? 'bg-primary-container/10 border border-primary/10 hover:bg-primary-container/20' : 'hover:bg-surface-container-high border border-transparent'}`}>
            <p className={`font-body-sm truncate ${item.active ? 'text-primary font-semibold mb-xs' : 'text-on-surface'}`}>{item.title}</p>
            <p className="text-[10px] font-label-sm text-outline uppercase tracking-tighter">{item.time}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto p-md bg-surface-container rounded-2xl flex items-center gap-md">
        <div className="relative">
          <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-25"></div>
        </div>
        <div>
          <p className="font-label-sm text-on-surface font-semibold uppercase">Copilot Online</p>
          <p className="text-[11px] text-on-surface-variant">EcoSphere AI (Gemini Pro)</p>
        </div>
      </div>
    </aside>
  );
}
