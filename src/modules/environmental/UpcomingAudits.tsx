import React from "react";
import { CalendarX2, Plus } from "lucide-react";

export function UpcomingAudits() {
  return (
    <section className="bg-surface-container-lowest/50 backdrop-blur-md rounded-2xl p-2xl flex flex-col items-center text-center space-y-md border-dashed border-2 border-outline-variant">
      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-md relative">
        <CalendarX2 className="w-8 h-8" />
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 pulse-halo"></div>
      </div>
      <h4 className="font-headline-md text-on-surface">No Upcoming Audits</h4>
      <p className="font-body-md text-on-surface-variant max-w-sm mx-auto">There are no external environmental audits scheduled for the current quarter. You're all caught up on regulatory reviews.</p>
      <div className="pt-md">
        <button className="text-primary font-bold hover:underline font-label-md flex items-center gap-sm">
          <Plus className="w-4 h-4" /> Schedule Self-Assessment
        </button>
      </div>
    </section>
  );
}
