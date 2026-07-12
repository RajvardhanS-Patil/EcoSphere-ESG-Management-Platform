import React from "react";
import { Calendar, MoreVertical, TrendingUp, TrendingDown, Minus, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface RawMetric {
  id: string;
  name: string;
  entity: string;
  value: string;
  trend: string;
  trendColor: string;
  status: string;
  statusColor: string;
}

export function RawMetricsTable({ metrics }: { metrics: RawMetric[] }) {
  const getTrendIcon = (trend: string, color: string) => {
    switch (trend) {
      case "trending_up": return <TrendingUp className={`w-5 h-5 ${color} mx-auto`} />;
      case "trending_down": return <TrendingDown className={`w-5 h-5 ${color} mx-auto`} />;
      default: return <Minus className={`w-5 h-5 ${color} mx-auto`} />;
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden mt-xl">
      <div className="px-lg py-md border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50">
        <div className="flex items-center gap-lg">
          <h4 className="font-headline-md text-headline-md text-primary">Raw ESG Metrics</h4>
          <div className="flex items-center gap-sm bg-surface-container rounded-lg px-3 py-1">
            <span className="font-label-sm text-on-surface-variant">5 Selected</span>
            <div className="w-[1px] h-3 bg-outline-variant"></div>
            <button className="font-label-sm text-primary font-bold hover:underline">Bulk Edit</button>
            <button className="font-label-sm text-error font-bold hover:underline">Delete</button>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs px-2 py-1 bg-surface rounded border border-outline-variant/50">
            <Calendar className="w-4 h-4" />
            <span className="font-label-sm">FY 2023</span>
          </div>
          <MoreVertical className="w-5 h-5 text-on-surface-variant cursor-pointer" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-outline-variant/30">
            <tr>
              <th className="py-md px-lg w-10">
                <input className="rounded text-primary focus:ring-primary" type="checkbox" />
              </th>
              <th className="py-md px-md font-label-sm text-on-surface-variant uppercase tracking-wider">Indicator ID</th>
              <th className="py-md px-md font-label-sm text-on-surface-variant uppercase tracking-wider">Metric Name</th>
              <th className="py-md px-md font-label-sm text-on-surface-variant uppercase tracking-wider">Entity</th>
              <th className="py-md px-md font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Value</th>
              <th className="py-md px-md font-label-sm text-on-surface-variant uppercase tracking-wider text-center">Trend</th>
              <th className="py-md px-md font-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="py-md px-lg w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {metrics.map((m, i) => (
              <tr key={i} className="hover:bg-surface-container-low/30 transition-colors">
                <td className="py-md px-lg">
                  <input defaultChecked={i < 3} className="rounded text-primary focus:ring-primary" type="checkbox" />
                </td>
                <td className="py-md px-md font-label-md">{m.id}</td>
                <td className="py-md px-md font-body-md font-medium">{m.name}</td>
                <td className="py-md px-md font-body-sm text-on-surface-variant">{m.entity}</td>
                <td className="py-md px-md font-body-md text-right tabular-nums">{m.value}</td>
                <td className="py-md px-md text-center">
                  {getTrendIcon(m.trend, m.trendColor)}
                </td>
                <td className="py-md px-md">
                  <span className={`px-3 py-1 rounded-full font-label-sm border ${m.statusColor}`}>
                    {m.status}
                  </span>
                </td>
                <td className="py-md px-lg text-right">
                  <ExternalLink className="w-5 h-5 text-outline cursor-pointer ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* PAGINATION */}
      <div className="px-lg py-md border-t border-outline-variant/30 flex justify-between items-center text-on-surface-variant">
        <span className="font-body-sm">Showing 1 to {metrics.length} of 128 results</span>
        <div className="flex items-center gap-xs">
          <button className="p-1 hover:bg-surface-container rounded transition-colors disabled:opacity-30" disabled>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="px-3 py-1 bg-primary text-on-primary rounded font-label-md">1</button>
          <button className="px-3 py-1 hover:bg-surface-container rounded font-label-md">2</button>
          <button className="px-3 py-1 hover:bg-surface-container rounded font-label-md">3</button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 hover:bg-surface-container rounded font-label-md">32</button>
          <button className="p-1 hover:bg-surface-container rounded transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
