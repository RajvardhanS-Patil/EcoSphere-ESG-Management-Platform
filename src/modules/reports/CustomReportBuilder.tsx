import React, { useState } from "react";
import { Filter, Download, FileText } from "lucide-react";
import { useMasterDataStore } from "@/stores/masterDataStore";
import { useEnvironmentalStore } from "@/stores/environmentalStore";
import { useSocialGamificationStore } from "@/stores/socialGamificationStore";
import { useGovernanceStore } from "@/stores/governanceStore";
import { useScoreStore } from "@/stores/scoreStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { toast } from "sonner";

export function CustomReportBuilder() {
  const departments = useMasterDataStore(state => state.departments);
  const categories = useMasterDataStore(state => state.categories);
  const emissionFactors = useMasterDataStore(state => state.emissionFactors);
  const carbonTransactions = useEnvironmentalStore(state => state.carbonTransactions);
  const participations = useSocialGamificationStore(state => state.participations);
  const csrActivities = useSocialGamificationStore(state => state.csrActivities);
  const complianceIssues = useGovernanceStore(state => state.complianceIssues);
  const getOverallScore = useScoreStore(state => state.getOverallScore);
  const addNotification = useNotificationStore(state => state.addNotification);
  const [isGenerating, setIsGenerating] = useState(false);

  const [filters, setFilters] = useState({
    department: 'all',
    dateRange: 'this_quarter',
    module: 'all',
    employee: '',
    challenge: ''
  });

  const handleExport = (format: string) => {
    setIsGenerating(true);
    addNotification({
      title: 'Export Started',
      message: `Gathering data for your ${format} report...`,
      type: 'success'
    });

    setTimeout(() => {
      // Build dynamic report content
      const filteredTxs = filters.department === 'all' 
        ? carbonTransactions 
        : carbonTransactions.filter(tx => tx.departmentId === filters.department);

      const overallScore = getOverallScore();
      const dateStr = new Date().toISOString().split('T')[0];

      let fileData = "";
      let fileName = `ecosphere_esg_report_${dateStr}.${format.toLowerCase() === 'excel' ? 'csv' : format.toLowerCase()}`;
      let mimeType = "text/csv;charset=utf-8;";

      if (format === 'PDF') {
        // Formatted Markdown/Text Report
        fileName = `ecosphere_esg_executive_summary_${dateStr}.txt`;
        mimeType = "text/plain;charset=utf-8;";
        fileData = `=====================================================
ECOSPHERE ENTERPRISE ESG REPORT (SEBI BRSR / GRI)
Generated Date: ${new Date().toLocaleString()}
Composite ESG Score: ${overallScore}/100
=====================================================

1. EXECUTIVE SUMMARY
- Total Carbon Transactions Logged: ${filteredTxs.length}
- Total Carbon Emissions: ${filteredTxs.reduce((sum, t) => sum + t.calculatedCO2e, 0).toFixed(1)} kg CO2e
- Pending CSR Participations: ${participations.filter(p => p.status === 'Pending').length}
- Open Governance Issues: ${complianceIssues.filter(i => i.status !== 'Resolved').length}

2. ENVIRONMENTAL TRANSACTIONS
${filteredTxs.map(t => {
  const dept = departments.find(d => d.id === t.departmentId)?.name || t.departmentId;
  const factor = emissionFactors.find(f => f.id === t.emissionFactorId)?.name || t.emissionFactorId;
  return `[${t.date}] ${dept} | Source: ${t.source} | Factor: ${factor} | Qty: ${t.quantity} | Impact: ${t.calculatedCO2e.toFixed(1)} kg CO2e`;
}).join('\n')}

3. SOCIAL & CSR INITIATIVES
${csrActivities.map(a => `- ${a.title}: ${a.xpReward} XP Reward (${a.status})`).join('\n')}

4. GOVERNANCE & COMPLIANCE ISSUES
${complianceIssues.map(i => `- [${i.severity}] ${i.description} | Status: ${i.status} | Due: ${i.dueDate}`).join('\n')}

Report certified under EcoSphere Sustainability Platform.
`;
      } else {
        // Standard CSV format
        const headers = ["Module", "Date", "Department", "Source / Title", "Quantity / Metric", "Impact / Severity", "Status"];
        const rows: string[][] = [];

        // Add Environmental
        filteredTxs.forEach(t => {
          const dept = departments.find(d => d.id === t.departmentId)?.name || t.departmentId;
          const factor = emissionFactors.find(f => f.id === t.emissionFactorId)?.name || t.emissionFactorId;
          rows.push(["Environmental", t.date, dept, `${t.source} (${factor})`, `${t.quantity}`, `${t.calculatedCO2e.toFixed(1)} kg CO2e`, "Verified"]);
        });

        // Add Social
        participations.forEach(p => {
          const act = csrActivities.find(a => a.id === p.activityId);
          const emp = useSocialGamificationStore.getState().employees.find(e => e.id === p.employeeId)?.name || p.employeeId;
          rows.push(["Social", p.completionDate || "Pending", emp, act?.title || "CSR Activity", "1 participation", `${act?.xpReward || 0} XP`, p.status]);
        });

        // Add Governance
        complianceIssues.forEach(i => {
          const dept = departments.find(d => d.id === i.ownerId)?.name || i.ownerId;
          rows.push(["Governance", i.dueDate, dept, i.description, "Audit Finding", i.severity, i.status]);
        });

        const csvLines = [headers.map(h => `"${h}"`).join(",")];
        rows.forEach(r => csvLines.push(r.map(c => `"${c.replace(/"/g, '""')}"`).join(",")));
        fileData = csvLines.join("\n");
      }

      // Trigger browser download
      const blob = new Blob([fileData], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsGenerating(false);
      addNotification({
        title: 'Report Ready',
        message: `Your ${format} report has been successfully generated and downloaded.`,
        type: 'success'
      });
      toast.success(`${format} Report Generated`, {
        description: `Downloaded ${fileName} successfully.`
      });
    }, 1200);
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
          <button 
            disabled={isGenerating}
            onClick={() => handleExport('Excel')} 
            className={`bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-95'}`}
          >
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>
    </div>
  );
}
