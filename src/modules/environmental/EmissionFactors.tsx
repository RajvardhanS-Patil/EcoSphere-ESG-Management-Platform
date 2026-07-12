import React from "react";
import { AnalyticsCard } from "@/components/shared/AnalyticsCard";

interface Factor {
  source: string;
  unit: string;
  factor: number;
}

export function EmissionFactors({ factors }: { factors: Factor[] }) {
  return (
    <div className="bg-surface-container-lowest/50 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col shadow-sm">
      <div className="p-xl border-b border-outline-variant bg-surface-container-lowest">
        <h4 className="font-headline-md text-on-surface">Emission Factors</h4>
        <p className="font-body-sm text-on-surface-variant">Global standard coefficients</p>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low sticky top-0 font-label-sm text-on-surface-variant">
            <tr>
              <th className="px-md py-sm">Source</th>
              <th className="px-md py-sm">Unit</th>
              <th className="px-md py-sm">Factor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-body-sm">
            {factors.map((f, i) => (
              <tr key={i} className="hover:bg-surface-container-low transition-colors">
                <td className="px-md py-md font-medium">{f.source}</td>
                <td className="px-md py-md">{f.unit}</td>
                <td className="px-md py-md">{f.factor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-md bg-surface-container-low border-t border-outline-variant">
        <button className="w-full text-center text-primary font-label-md py-xs hover:underline transition-all">Update Library</button>
      </div>
    </div>
  );
}
