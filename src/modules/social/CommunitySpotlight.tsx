import React from "react";
import { Filter, ArrowUpDown } from "lucide-react";

interface Employee {
  name: string;
  role: string;
  projects: number;
  impact: string;
  impactClass: string;
  avatar: string;
}

export function CommunitySpotlight({ employees }: { employees: Employee[] }) {
  return (
    <div className="col-span-12">
      <div className="flex justify-between items-center mb-lg">
        <h4 className="font-headline-md text-primary">Community Spotlight</h4>
        <div className="flex gap-sm">
          <button className="p-sm bg-surface-container rounded-lg"><Filter className="w-4 h-4" /></button>
          <button className="p-sm bg-surface-container rounded-lg"><ArrowUpDown className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
        {employees.map((emp, i) => (
          <div key={i} className="bg-surface-container-low p-md rounded-2xl border border-outline-variant hover:border-secondary transition-all group">
            <div className="flex items-start gap-md">
              <img className="w-12 h-12 rounded-full object-cover" alt={emp.name} src={emp.avatar} />
              <div className="flex-1">
                <p className="font-body-md font-bold text-primary group-hover:text-secondary transition-colors">{emp.name}</p>
                <p className="text-xs text-on-surface-variant mb-md">{emp.role}</p>
                <div className="flex gap-sm">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-label-sm text-outline">Projects</span>
                    <span className="font-label-md">{emp.projects}</span>
                  </div>
                  <div className="w-[1px] h-6 bg-outline-variant self-end mb-xs"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-label-sm text-outline">Impact</span>
                    <span className={`font-label-md ${emp.impactClass}`}>{emp.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
