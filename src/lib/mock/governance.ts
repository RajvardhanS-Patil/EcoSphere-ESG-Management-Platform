export const governanceMockData = {
  complianceIssues: [
    { issue: "Data Privacy Gap - Sector 7", priority: "High", priorityColor: "bg-error/10 text-error", dotColor: "bg-error", riskLevel: 85, riskColor: "bg-error", stakeholder: "Legal Dept.", status: "Investigating", statusColor: "bg-secondary-container text-on-secondary-container" },
    { issue: "Supplier ESG Audit Overdue", priority: "Medium", priorityColor: "bg-amber-500/10 text-amber-700", dotColor: "bg-amber-500", riskLevel: 45, riskColor: "bg-amber-500", stakeholder: "Logistics", status: "Pending", statusColor: "bg-surface-container-high text-on-surface-variant" },
    { issue: "GHG Emission Delta Offset", priority: "Low", priorityColor: "bg-tertiary-container/10 text-tertiary-container", dotColor: "bg-tertiary-container", riskLevel: 20, riskColor: "bg-tertiary-container", stakeholder: "Operations", status: "Resolved", statusColor: "bg-primary-container text-on-primary shadow-sm" }
  ],
  approvalQueue: [
    { title: "Q3 Carbon Audit Report", id: "#9902" },
    { title: "Employee Equity Policy v2", id: "#9884" },
    { title: "Supply Chain Code of Conduct", id: "#9812" }
  ],
  policyLibrary: [
    { title: "Anti-Corruption Framework 2024", subtitle: "Version 4.2 • Updated Oct 12", icon: "description", statusLabel: "Acknowledged", statusColor: "text-secondary", statusSub: "by 452 Employees" },
    { title: "Sustainable Sourcing Protocol", subtitle: "Version 1.0 • Updated Nov 05", icon: "shield", statusLabel: "Pending Review", statusColor: "text-error", statusSub: "Action Required" },
    { title: "Net-Zero Commitment Charter", subtitle: "Version 2.3 • Updated Sep 28", icon: "energy_savings_leaf", statusLabel: "Acknowledged", statusColor: "text-secondary", statusSub: "Compliance 100%" }
  ],
  auditHistory: [
    { date: "Today", dateColor: "text-secondary", title: "Annual Social Governance Audit", desc: "External review currently in progress. Site visits scheduled for European clusters.", tags: ["Audit ID: EX-2024-001", "Lead: Deloitte"], icon: "pulse", iconBg: "bg-secondary" },
    { date: "Oct 14, 2024", dateColor: "text-on-surface-variant", title: "Tier 1 Supplier Compliance Check", desc: "Completed with 96% adherence score. Minor discrepancies identified in logistics sub-contracting.", tags: [], icon: "check", iconBg: "bg-primary" },
    { date: "Aug 22, 2024", dateColor: "text-on-surface-variant", title: "GRI Disclosure Validation", desc: "Successful data point verification for the 2023 Sustainability Report.", tags: [], icon: "check", iconBg: "bg-primary" }
  ],
  issueResolution: [
    { step: 1, name: "Detection", title: "Flag Identified", desc: "Anomaly detected in water recycling metrics for Site-B via AI Copilot.", date: "Nov 12, 08:32 AM", state: "past" },
    { step: 2, name: "Analysis", title: "Root Cause Found", desc: "Sensor calibration drift in the treatment facility overflow valves.", date: "Nov 12, 10:15 AM", state: "past" },
    { step: 3, name: "Intervention", title: "Action Taken", desc: "Operations team dispatched for immediate recalibration and part replacement.", date: "In Progress...", state: "current" },
    { step: 4, name: "Resolution", title: "Final Verification", desc: "Data re-validation and independent sign-off by Compliance Officer.", date: "Estimated: Nov 14", state: "future" }
  ]
};
