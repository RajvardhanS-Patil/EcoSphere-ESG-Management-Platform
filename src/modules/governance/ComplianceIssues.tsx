import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface Issue {
  issue: string;
  priority: string;
  priorityColor: string;
  dotColor: string;
  riskLevel: number;
  riskColor: string;
  stakeholder: string;
  status: string;
  statusColor: string;
}

export function ComplianceIssues({ issues }: { issues: Issue[] }) {
  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
      <div className="px-lg py-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
        <div className="flex items-center gap-sm">
          <AlertTriangle className="text-primary w-6 h-6" />
          <h3 className="font-headline-md text-headline-md font-semibold text-primary">Compliance Issues</h3>
        </div>
        <button className="text-primary text-label-md font-semibold flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left high-density-table">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-lg py-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Issue Description</th>
              <th className="px-lg py-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Priority</th>
              <th className="px-lg py-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Risk Level</th>
              <th className="px-lg py-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Stakeholder</th>
              <th className="px-lg py-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {issues.map((item, i) => (
              <tr key={i}>
                <td className="px-lg py-md text-body-md font-medium text-on-surface">{item.issue}</td>
                <td className="px-lg py-md">
                  <span className={`px-3 py-1 rounded-full text-label-sm font-bold ${item.priorityColor} inline-flex items-center gap-1`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`}></span> {item.priority}
                  </span>
                </td>
                <td className="px-lg py-md">
                  <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full ${item.riskColor}`} style={{ width: `${item.riskLevel}%` }}></div>
                  </div>
                </td>
                <td className="px-lg py-md text-body-sm text-on-surface-variant">{item.stakeholder}</td>
                <td className="px-lg py-md">
                  <span className={`px-3 py-1 rounded-full text-label-sm font-bold ${item.statusColor}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
