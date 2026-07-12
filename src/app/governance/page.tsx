import { governanceMockData } from "@/lib/mock/governance";
import { ComplianceIssues } from "@/modules/governance/ComplianceIssues";
import { ApprovalQueue } from "@/modules/governance/ApprovalQueue";
import { PolicyLibrary } from "@/modules/governance/PolicyLibrary";
import { AuditHistory } from "@/modules/governance/AuditHistory";
import { IssueResolutionPath } from "@/modules/governance/IssueResolutionPath";
import { ClipboardCheck } from "lucide-react";

export default function GovernanceCompliancePage() {
  const { complianceIssues, approvalQueue, policyLibrary, auditHistory, issueResolution } = governanceMockData;

  return (
    <div className="space-y-lg pb-24">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Compliance Issues Table (Large span) */}
        <ComplianceIssues issues={complianceIssues} />

        {/* Approval Dashboard (Small span) */}
        <ApprovalQueue items={approvalQueue} />

        {/* Policy Library (Bento Mid) */}
        <PolicyLibrary policies={policyLibrary} />

        {/* Audit History Timeline */}
        <AuditHistory history={auditHistory} />

        {/* Issue Timeline (Wide Bottom) */}
        <IssueResolutionPath steps={issueResolution} />
      </div>

      {/* Floating Action Button for Audit */}
      <button className="fixed bottom-xl right-xl w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group z-50">
        <ClipboardCheck className="w-7 h-7" />
        <span className="absolute right-16 bg-surface-container-highest text-on-surface-variant text-label-md px-md py-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
          New Audit Ticket
        </span>
      </button>
    </div>
  );
}
