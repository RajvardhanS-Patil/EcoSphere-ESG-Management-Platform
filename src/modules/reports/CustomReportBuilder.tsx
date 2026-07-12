import React, { useState } from "react";
import { Filter, Download, FileText } from "lucide-react";
import { useMasterDataStore } from "@/stores/masterDataStore";
import { useNotificationStore } from "@/stores/notificationStore";

export function CustomReportBuilder() {
  const departments = useMasterDataStore(state => state.departments);
  const categories = useMasterDataStore(state => state.categories);
  const addNotification = useNotificationStore(state => state.addNotification);

  const [filters, setFilters] = useState({
    department: 'all',
    dateRange: 'this_quarter',
    module: 'all',
    employee: '',
    challenge: ''
  });

  const handleExport = (format: string) => {
    addNotification({
      title: 'Export Started',
      message: `Your custom report is being generated in ${format} format.`,
      type: 'success'
    });
  };

  return (
    <div className="bg-surface rounded-2xl border border-outline-variant shadow-sm overflow-hidden mb-xl mt-lg">
      <div className="p-lg bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center">
        <div className="flex items-center gap-sm">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-title-lg font-semibold text-on-surface">Custom Report Builder</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport('PDF')} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-outline hover:bg-surface-container transition-all">
            <Download className="w-4 h-4" /> PDF
          </button>
          <button onClick={() => handleExport('CSV')} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-outline hover:bg-surface-container transition-all">
            <FileText className="w-4 h-4" /> CSV
          </button>
        </div>
      </div>

      <div className="p-lg grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-md">
        {/* Department Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-label-sm font-bold text-on-surface-variant uppercase">Department</label>
          <select 
            value={filters.department} 
            onChange={(e) => setFilters({...filters, department: e.target.value})}
            className="p-2 rounded-lg bg-surface-container-low border border-transparent focus:border-primary/50 text-body-md text-on-surface outline-none cursor-pointer appearance-none"
          >
            <option value="all">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-label-sm font-bold text-on-surface-variant uppercase">Date Range</label>
          <select 
            value={filters.dateRange} 
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            className="p-2 rounded-lg bg-surface-container-low border border-transparent focus:border-primary/50 text-body-md text-on-surface outline-none cursor-pointer appearance-none"
          >
            <option value="this_month">This Month</option>
            <option value="this_quarter">This Quarter</option>
            <option value="this_year">This Year</option>
            <option value="all_time">All Time</option>
          </select>
        </div>

        {/* Module / Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-label-sm font-bold text-on-surface-variant uppercase">ESG Category</label>
          <select 
            value={filters.module} 
            onChange={(e) => setFilters({...filters, module: e.target.value})}
            className="p-2 rounded-lg bg-surface-container-low border border-transparent focus:border-primary/50 text-body-md text-on-surface outline-none cursor-pointer appearance-none"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Employee Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-label-sm font-bold text-on-surface-variant uppercase">Employee ID</label>
          <input 
            type="text" 
            placeholder="Search by Employee..." 
            value={filters.employee}
            onChange={(e) => setFilters({...filters, employee: e.target.value})}
            className="p-2 rounded-lg bg-surface-container-low border border-transparent focus:border-primary/50 text-body-md text-on-surface outline-none placeholder:text-on-surface-variant/50"
          />
        </div>

        {/* Challenge Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-label-sm font-bold text-on-surface-variant uppercase">Challenge ID</label>
          <input 
            type="text" 
            placeholder="Search by Challenge..." 
            value={filters.challenge}
            onChange={(e) => setFilters({...filters, challenge: e.target.value})}
            className="p-2 rounded-lg bg-surface-container-low border border-transparent focus:border-primary/50 text-body-md text-on-surface outline-none placeholder:text-on-surface-variant/50"
          />
        </div>
      </div>
      
      <div className="px-lg pb-lg">
        <div className="p-md bg-secondary-container/20 border border-secondary/20 rounded-lg flex items-center justify-between">
          <span className="text-body-sm text-on-surface-variant">
            <strong>Preview:</strong> 12,450 records match your current filter criteria.
          </span>
          <button onClick={() => handleExport('Excel')} className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-all active:scale-95">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
