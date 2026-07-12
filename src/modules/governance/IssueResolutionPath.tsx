import React from "react";
import { Route, ChevronRight } from "lucide-react";

interface Step {
  step: number;
  name: string;
  title: string;
  desc: string;
  date: string;
  state: string; // past, current, future
}

export function IssueResolutionPath({ steps }: { steps: Step[] }) {
  return (
    <div className="col-span-12 bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm">
      <div className="flex items-center gap-sm mb-lg">
        <Route className="text-primary w-6 h-6" />
        <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Recent Issue Resolution Path</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-md relative">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className={`p-md bg-surface-container-low rounded-lg relative ${s.state === 'current' ? 'border-2 border-primary' : s.state === 'future' ? 'opacity-50' : ''}`}>
              <div className={`text-[10px] font-label-md font-bold uppercase mb-base ${s.state === 'future' ? 'text-on-surface-variant' : 'text-primary'}`}>
                Step {s.step}: {s.name}
              </div>
              <h5 className="text-body-md font-bold mb-xs">{s.title}</h5>
              <p className="text-body-sm text-on-surface-variant">{s.desc}</p>
              <div className={`mt-md text-[11px] ${s.state === 'current' ? 'text-primary font-bold' : 'text-on-surface-variant italic'}`}>
                {s.date}
              </div>
            </div>
            {/* Connecting Arrow (Desktop) */}
            {i < steps.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: `${(i + 1) * 25}%` }}>
                <ChevronRight className="text-outline-variant w-6 h-6" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
