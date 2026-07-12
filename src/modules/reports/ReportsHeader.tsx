import React from "react";
import { FileText, BarChart3, Filter, Share } from "lucide-react";

export function ReportsHeader({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-primary">Reports & Analytics</h2>
        <p className="text-on-surface-variant mt-xs">Comprehensive ESG performance tracking and audit-ready reporting.</p>
      </div>
      <div className="flex items-center gap-sm">
        <div className="bg-surface-container-high rounded-lg p-1 flex">
          <button 
            onClick={() => onTabChange('Reports')}
            className={`px-md py-1.5 rounded-md font-label-md flex items-center gap-xs transition-colors ${activeTab === 'Reports' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}>
            <FileText className="w-4 h-4" /> Reports
          </button>
          <button 
            onClick={() => onTabChange('Analytics')}
            className={`px-md py-1.5 rounded-md font-label-md flex items-center gap-xs transition-colors ${activeTab === 'Analytics' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}>
            <BarChart3 className="w-4 h-4" /> Analytics
          </button>
        </div>
        <div className="h-8 w-[1px] bg-outline-variant mx-xs"></div>
        <button className="flex items-center gap-xs px-md py-2 border border-outline-variant rounded-lg font-label-md text-on-surface hover:bg-surface-container-low transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
        <button className="flex items-center gap-xs px-md py-2 bg-primary text-on-primary rounded-lg font-label-md hover:brightness-110 transition-all">
          <Share className="w-4 h-4" /> Export
        </button>
      </div>
    </div>
  );
}
