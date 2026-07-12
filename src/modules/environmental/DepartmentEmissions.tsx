import React from "react";
import { Filter, Download, MoreHorizontal, ChevronDown, ChevronLeft, ChevronRight, Factory, Truck, Building2 } from "lucide-react";

interface DeptEmission {
  name: string;
  icon: string;
  scope1: string;
  scope2: string;
  status: string;
  statusColor: string;
  targetVar: string;
  targetColor: string;
}

const iconMap: Record<string, React.ReactNode> = {
  factory: <Factory className="w-5 h-5" />,
  local_shipping: <Truck className="w-5 h-5" />,
  corporate_fare: <Building2 className="w-5 h-5" />,
};

export function DepartmentEmissions({ emissions }: { emissions: DeptEmission[] }) {
  return (
    <section className="bg-surface-container-lowest/50 backdrop-blur-md rounded-2xl overflow-hidden border border-outline-variant shadow-sm">
      <div className="p-xl flex flex-col md:flex-row justify-between md:items-center gap-md border-b border-outline-variant">
        <div>
          <h4 className="font-headline-md text-on-surface">Department Emissions Breakdown</h4>
          <p className="font-body-sm text-on-surface-variant">Granular tracking across operational units</p>
        </div>
        <div className="flex gap-md">
          <button className="px-md py-sm border border-outline-variant rounded-lg font-label-md flex items-center gap-sm hover:bg-surface-container-low transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-md py-sm border border-outline-variant rounded-lg font-label-md flex items-center gap-sm hover:bg-surface-container-low transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low font-label-sm text-on-surface-variant uppercase tracking-wider">
            <tr>
              <th className="px-xl py-md">Department</th>
              <th className="px-xl py-md cursor-pointer hover:text-primary flex items-center gap-1">Scope 1 Emissions <ChevronDown className="w-4 h-4" /></th>
              <th className="px-xl py-md">Scope 2 Emissions</th>
              <th className="px-xl py-md">Compliance Status</th>
              <th className="px-xl py-md">Target Var.</th>
              <th className="px-xl py-md">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-body-md text-on-surface">
            {emissions.map((dept, i) => (
              <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-xl py-lg flex items-center gap-md">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                    {iconMap[dept.icon]}
                  </div>
                  {dept.name}
                </td>
                <td className="px-xl py-lg font-label-md">{dept.scope1}</td>
                <td className="px-xl py-lg font-label-md">{dept.scope2}</td>
                <td className="px-xl py-lg">
                  <span className={`px-md py-xs rounded-full font-label-sm border ${dept.statusColor}`}>
                    {dept.status}
                  </span>
                </td>
                <td className={`px-xl py-lg font-label-md ${dept.targetColor}`}>{dept.targetVar}</td>
                <td className="px-xl py-lg">
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-xl bg-surface-container-low flex items-center justify-between">
        <span className="font-body-sm text-on-surface-variant">Showing 1 to {emissions.length} of 12 departments</span>
        <div className="flex gap-sm">
          <button className="p-sm rounded-lg border border-outline-variant hover:bg-surface-container-high transition-all opacity-50 cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-md py-sm rounded-lg bg-primary text-on-primary font-label-md">1</button>
          <button className="px-md py-sm rounded-lg hover:bg-surface-container-high font-label-md transition-all">2</button>
          <button className="px-md py-sm rounded-lg hover:bg-surface-container-high font-label-md transition-all">3</button>
          <button className="p-sm rounded-lg border border-outline-variant hover:bg-surface-container-high transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
