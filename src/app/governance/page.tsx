"use client";

import { ComplianceIssues } from "@/modules/governance/ComplianceIssues";
import { ApprovalQueue } from "@/modules/governance/ApprovalQueue";
import { PolicyLibrary } from "@/modules/governance/PolicyLibrary";
import { AuditHistory } from "@/modules/governance/AuditHistory";
import { IssueResolutionPath } from "@/modules/governance/IssueResolutionPath";
import { useGovernanceStore } from "@/stores/governanceStore";
import { useMasterDataStore } from "@/stores/masterDataStore";
import { useSocialGamificationStore } from "@/stores/socialGamificationStore";
import { ClipboardCheck, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function GovernanceCompliancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIssue, setNewIssue] = useState({ description: "", severity: "High", ownerId: "d1" });
  
  const issues = useGovernanceStore(state => state.complianceIssues);
  const addComplianceIssue = useGovernanceStore(state => state.addComplianceIssue);
  const policies = useMasterDataStore(state => state.policies);
  const audits = useGovernanceStore(state => state.audits);
  const policyAcknowledgements = useGovernanceStore(state => state.policyAcknowledgements);
  const acknowledgePolicy = useGovernanceStore(state => state.acknowledgePolicy);
  const participations = useSocialGamificationStore(state => state.participations);
  const approveParticipation = useSocialGamificationStore(state => state.approveParticipation);
  const csrActivities = useSocialGamificationStore(state => state.csrActivities);
  const departments = useMasterDataStore(state => state.departments);

  const mappedIssues = issues.map(i => ({
    issue: i.description,
    priority: i.severity,
    priorityColor: i.severity === 'High' ? 'bg-error/10 text-error' : i.severity === 'Medium' ? 'bg-amber-500/10 text-amber-700' : 'bg-tertiary-container/10 text-tertiary-container',
    dotColor: i.severity === 'High' ? 'bg-error' : i.severity === 'Medium' ? 'bg-amber-500' : 'bg-tertiary-container',
    riskLevel: i.severity === 'High' ? 85 : i.severity === 'Medium' ? 45 : 20,
    riskColor: i.severity === 'High' ? 'bg-error' : i.severity === 'Medium' ? 'bg-amber-500' : 'bg-tertiary-container',
    stakeholder: departments.find(d => d.id === i.ownerId)?.name || i.ownerId,
    status: i.status === 'Open' ? 'Investigating' : i.status === 'Investigating' ? 'Pending' : 'Resolved',
    statusColor: i.status === 'Open' ? 'bg-secondary-container text-on-secondary-container' : i.status === 'Investigating' ? 'bg-surface-container-high text-on-surface-variant' : 'bg-primary-container text-on-primary shadow-sm'
  }));

  const approvalQueue = participations.filter(p => p.status === 'Pending').map(p => {
    const activity = csrActivities.find(a => a.id === p.activityId);
    return {
      title: activity ? activity.title : `CSR Participation: ${p.id}`,
      id: `#${p.id.substring(0, 4)}`,
      rawId: p.id
    };
  });

  const mappedPolicies = policies.map(p => {
    // Check if the current employee has acknowledged this policy. Assume 'e1' is current employee for mock.
    const ack = policyAcknowledgements.find(a => a.policyId === p.id && a.employeeId === 'e1');
    const isAck = ack?.status === 'Acknowledged';

    return {
      id: p.id,
      title: p.title,
      subtitle: `Version ${p.version}`,
      icon: "description",
      statusLabel: isAck ? "Acknowledged" : "Pending Review",
      statusColor: isAck ? "text-secondary" : "text-error",
      statusSub: isAck ? "Action Complete" : "Action Required"
    };
  });

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

  const handleAddIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIssue.description) return;
    
    addComplianceIssue({
      auditId: audits[0]?.id || 'a1',
      severity: newIssue.severity as any,
      description: newIssue.description,
      ownerId: newIssue.ownerId,
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      status: 'Open'
    });
    
    setIsModalOpen(false);
    setNewIssue({ description: "", severity: "High", ownerId: "d1" });
    toast.error('Compliance Score Dropped', {
      description: 'A new compliance issue was logged, decreasing the Governance Score.',
    });
  };

  return (
    <div className="space-y-lg pb-24 relative">
      <div className="grid grid-cols-12 gap-lg">
        <ComplianceIssues issues={mappedIssues} />
        <ApprovalQueue items={approvalQueue} onBatchApprove={() => {
          approvalQueue.forEach(item => approveParticipation(item.rawId));
          toast.success("Batch Approval Complete", { description: `${approvalQueue.length} items approved.`});
        }} />
        <PolicyLibrary policies={mappedPolicies} onAcknowledge={(id) => {
          const ack = policyAcknowledgements.find(a => a.policyId === id && a.employeeId === 'e1');
          if (ack) acknowledgePolicy(ack.id);
        }} />
        <AuditHistory history={mappedAudits} />
        <IssueResolutionPath steps={issueResolution} />
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-xl right-xl w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group z-50">
        <ClipboardCheck className="w-7 h-7" />
        <span className="absolute right-16 bg-surface-container-highest text-on-surface-variant text-label-md px-md py-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
          Report Issue
        </span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden text-on-surface">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-md font-bold text-primary flex items-center gap-2">
                Create Compliance Issue
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddIssue} className="p-lg space-y-md">
              <div className="space-y-sm">
                <label className="text-label-md font-medium text-on-surface-variant">Issue Description</label>
                <input value={newIssue.description} onChange={e => setNewIssue({...newIssue, description: e.target.value})} type="text" placeholder="E.g. Data Privacy Gap" required className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>
              <div className="space-y-sm">
                <label className="text-label-md font-medium text-on-surface-variant">Severity</label>
                <select value={newIssue.severity} onChange={e => setNewIssue({...newIssue, severity: e.target.value})} className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none">
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="space-y-sm">
                <label className="text-label-md font-medium text-on-surface-variant">Owner Department</label>
                <select value={newIssue.ownerId} onChange={e => setNewIssue({...newIssue, ownerId: e.target.value})} className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none">
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-sm flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-primary font-medium hover:bg-surface-container-high transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold shadow-md hover:opacity-90 active:scale-95 transition-all">Submit Issue</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
