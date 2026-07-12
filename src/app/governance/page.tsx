"use client";

import { ComplianceIssues } from "@/modules/governance/ComplianceIssues";
import { ApprovalQueue } from "@/modules/governance/ApprovalQueue";
import { PolicyLibrary } from "@/modules/governance/PolicyLibrary";
import { AuditHistory } from "@/modules/governance/AuditHistory";
import { IssueResolutionPath } from "@/modules/governance/IssueResolutionPath";
import { useGovernanceStore } from "@/stores/governanceStore";
import { useMasterDataStore } from "@/stores/masterDataStore";
import { useSocialGamificationStore } from "@/stores/socialGamificationStore";
import { ClipboardCheck } from "lucide-react";

export default function GovernanceCompliancePage() {
  const issues = useGovernanceStore(state => state.complianceIssues);
  const addComplianceIssue = useGovernanceStore(state => state.addComplianceIssue);
  const policies = useMasterDataStore(state => state.policies);
  const audits = useGovernanceStore(state => state.audits);
  const participations = useSocialGamificationStore(state => state.participations);

  const mappedIssues = issues.map(i => ({
    issue: i.description,
    priority: i.severity,
    priorityColor: i.severity === 'High' ? 'bg-error/10 text-error' : i.severity === 'Medium' ? 'bg-amber-500/10 text-amber-700' : 'bg-tertiary-container/10 text-tertiary-container',
    dotColor: i.severity === 'High' ? 'bg-error' : i.severity === 'Medium' ? 'bg-amber-500' : 'bg-tertiary-container',
    riskLevel: i.severity === 'High' ? 85 : i.severity === 'Medium' ? 45 : 20,
    riskColor: i.severity === 'High' ? 'bg-error' : i.severity === 'Medium' ? 'bg-amber-500' : 'bg-tertiary-container',
    stakeholder: i.ownerId,
    status: i.status === 'Open' ? 'Investigating' : i.status === 'Investigating' ? 'Pending' : 'Resolved',
    statusColor: i.status === 'Open' ? 'bg-secondary-container text-on-secondary-container' : i.status === 'Investigating' ? 'bg-surface-container-high text-on-surface-variant' : 'bg-primary-container text-on-primary shadow-sm'
  }));

  const approvalQueue = participations.filter(p => p.status === 'Pending').map(p => ({
    title: `CSR Participation: ${p.id}`,
    id: `#${p.id.substring(0, 4)}`
  }));

  const mappedPolicies = policies.map(p => ({
    title: p.title,
    subtitle: `Version ${p.version}`,
    icon: "description",
    statusLabel: "Active",
    statusColor: "text-secondary",
    statusSub: "Action Required"
  }));

  const mappedAudits = audits.map(a => ({
    date: a.date,
    dateColor: a.status === 'Completed' ? "text-on-surface-variant" : "text-secondary",
    title: a.title,
    desc: a.description,
    tags: [],
    icon: a.status === 'Completed' ? "check" : "pulse",
    iconBg: a.status === 'Completed' ? "bg-primary" : "bg-secondary"
  }));

  const issueResolution = [
    { step: 1, name: "Detection", title: "Flag Identified", desc: "Flagged by system.", date: "Oct 1, 2024", state: "past" },
    { step: 2, name: "Analysis", title: "Under Investigation", desc: "Reviewing root cause.", date: "Oct 5, 2024", state: "current" },
    { step: 3, name: "Intervention", title: "Resolution Plan", desc: "Awaiting approval.", date: "Pending", state: "future" },
    { step: 4, name: "Resolution", title: "Final Verification", desc: "Closed.", date: "Pending", state: "future" }
  ];

  const handleAddIssue = () => {
    addComplianceIssue({
      auditId: audits[0]?.id || 'a1',
      severity: 'Medium',
      description: 'Test Compliance Violation',
      ownerId: 'd1', // Valid owner
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // +2 days
      status: 'Open'
    });
  };

  return (
    <div className="space-y-lg pb-24 relative">
      <div className="grid grid-cols-12 gap-lg">
        <ComplianceIssues issues={mappedIssues} />
        <ApprovalQueue items={approvalQueue} />
        <PolicyLibrary policies={mappedPolicies} />
        <AuditHistory history={mappedAudits} />
        <IssueResolutionPath steps={issueResolution} />
      </div>

      <button 
        onClick={handleAddIssue}
        className="fixed bottom-xl right-xl w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group z-50">
        <ClipboardCheck className="w-7 h-7" />
        <span className="absolute right-16 bg-surface-container-highest text-on-surface-variant text-label-md px-md py-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
          Simulate New Issue
        </span>
      </button>
    </div>
  );
}
