import React from "react";
import { Users, GraduationCap, BarChart } from "lucide-react";

export function DiversityMetrics() {
  return (
    <div className="col-span-12 lg:col-span-12 bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm mt-lg">
      <div className="flex justify-between items-center mb-lg">
        <div className="flex items-center gap-sm">
          <Users className="text-secondary w-6 h-6" />
          <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Workforce Metrics</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {/* Metric 1 */}
        <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant">
          <div className="flex items-center justify-between mb-sm">
            <span className="font-title-md font-semibold text-on-surface">Gender Diversity</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-display-sm font-bold text-primary">48%</span>
            <span className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Female Leadership</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '48%' }}></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant">
          <div className="flex items-center justify-between mb-sm">
            <span className="font-title-md font-semibold text-on-surface">Training Completion</span>
            <GraduationCap className="w-4 h-4 text-secondary" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-display-sm font-bold text-secondary">92%</span>
            <span className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">ESG Compliance</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant">
          <div className="flex items-center justify-between mb-sm">
            <span className="font-title-md font-semibold text-on-surface">Employee Retention</span>
            <BarChart className="w-4 h-4 text-tertiary" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-display-sm font-bold text-tertiary">85%</span>
            <span className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Year over Year</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-tertiary h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
