import React from "react";

export function ActivityPulseHeatmap() {
  // Generate random heatmap cells for demonstration
  const intensityLevels = [
    'bg-surface-container', 
    'bg-secondary/20', 
    'bg-secondary/40', 
    'bg-secondary/60', 
    'bg-secondary/80', 
    'bg-secondary'
  ];
  
  const cells = Array.from({ length: 91 }, (_, i) => ({
    id: i,
    intensity: intensityLevels[Math.floor(Math.random() * intensityLevels.length)]
  }));

  return (
    <section className="bg-surface-container-lowest rounded-3xl p-lg border border-outline-variant">
      <div className="flex items-center justify-between mb-md">
        <h4 className="font-headline-sm text-primary">Activity Pulse</h4>
        <div className="flex items-center gap-xs">
          <div className="w-3 h-3 rounded-sm bg-surface-container"></div>
          <div className="w-3 h-3 rounded-sm bg-secondary/30"></div>
          <div className="w-3 h-3 rounded-sm bg-secondary/60"></div>
          <div className="w-3 h-3 rounded-sm bg-secondary"></div>
        </div>
      </div>
      <div className="space-y-md">
        <div className="flex flex-wrap gap-[4px]">
          {cells.map(cell => (
            <div 
              key={cell.id} 
              className={`w-[14px] h-[14px] rounded-sm cursor-pointer ${cell.intensity}`}
              title={`Activity on Day ${cell.id + 1}`}
            />
          ))}
        </div>
        <div className="flex justify-between font-label-sm text-on-surface-variant">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Sun</span>
        </div>
      </div>
      <div className="mt-lg pt-lg border-t border-outline-variant">
        <p className="font-body-sm text-on-surface-variant">
          Peak activity detected on <span className="text-primary font-bold">Thursdays</span> during lunch sessions.
        </p>
      </div>
    </section>
  );
}
