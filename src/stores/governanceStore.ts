import { create } from 'zustand';
import { useNotificationStore } from './notificationStore';

export interface Audit {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'Planned' | 'In Progress' | 'Completed';
}

export interface ComplianceIssue {
  id: string;
  auditId: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  ownerId: string; // Department or Employee ID
  dueDate: string;
  status: 'Open' | 'Investigating' | 'Resolved';
}

export interface PolicyAcknowledgement {
  id: string;
  policyId: string;
  employeeId: string;
  status: 'Pending' | 'Acknowledged';
  acknowledgedAt?: string;
}

interface GovernanceState {
  audits: Audit[];
  complianceIssues: ComplianceIssue[];
  policyAcknowledgements: PolicyAcknowledgement[];
  
  addComplianceIssue: (issue: Omit<ComplianceIssue, 'id'>) => void;
  updateComplianceIssueStatus: (id: string, status: ComplianceIssue['status']) => void;
  checkOverdueIssues: () => void;
  acknowledgePolicy: (id: string) => void;
}

export const useGovernanceStore = create<GovernanceState>((set, get) => ({
  audits: [
    { id: 'a1', title: 'Annual Social Governance Audit', description: 'External review by Deloitte covering European clusters and APAC region compliance.', date: '2024-11-10', status: 'In Progress' },
    { id: 'a2', title: 'Tier 1 Supplier Compliance Check', description: 'Completed with 96% adherence. Minor discrepancies in logistics sub-contracting.', date: '2024-10-14', status: 'Completed' },
    { id: 'a3', title: 'GRI Disclosure Validation', description: 'Data point verification for the 2023 Sustainability Report.', date: '2024-08-22', status: 'Completed' },
  ],
  complianceIssues: [
    { id: 'ci1', auditId: 'a1', severity: 'High', description: 'Data Privacy Gap — Sector 7 employee records not encrypted at rest', ownerId: 'd1', dueDate: '2024-11-15', status: 'Investigating' },
    { id: 'ci2', auditId: 'a2', severity: 'Medium', description: 'Supplier ESG audit overdue — 3 Tier 2 suppliers missing updated certifications', ownerId: 'd2', dueDate: '2024-11-30', status: 'Open' },
    { id: 'ci3', auditId: 'a1', severity: 'Low', description: 'GHG Emission Delta Offset — Minor discrepancy in Scope 2 accounting methodology', ownerId: 'd1', dueDate: '2024-12-15', status: 'Resolved' },
    { id: 'ci4', auditId: 'a1', severity: 'High', description: 'Water recycling metrics anomaly detected — Site-B sensor calibration drift', ownerId: 'd3', dueDate: '2024-11-14', status: 'Open' },
  ],
  policyAcknowledgements: [
    { id: 'pa1', policyId: 'p1', employeeId: 'e1', status: 'Acknowledged', acknowledgedAt: '2024-10-05' },
    { id: 'pa2', policyId: 'p1', employeeId: 'e2', status: 'Acknowledged', acknowledgedAt: '2024-10-06' },
    { id: 'pa3', policyId: 'p1', employeeId: 'e3', status: 'Pending' },
    { id: 'pa4', policyId: 'p2', employeeId: 'e1', status: 'Acknowledged', acknowledgedAt: '2024-10-01' },
    { id: 'pa5', policyId: 'p2', employeeId: 'e4', status: 'Pending' },
    { id: 'pa6', policyId: 'p2', employeeId: 'e5', status: 'Pending' },
  ],
  
  addComplianceIssue: (issue) => {
    const notify = useNotificationStore.getState().addNotification;
    
    if (!issue.ownerId || !issue.dueDate) {
      notify({ title: 'Validation Failed', message: 'Owner and Due Date are mandatory for Compliance Issues.', type: 'error' });
      return;
    }
    
    set((state) => ({
      complianceIssues: [...state.complianceIssues, { ...issue, id: 'ci' + Date.now().toString(36) }]
    }));
    
    notify({ title: 'New Compliance Issue', message: issue.description, type: 'warning' });
  },

  updateComplianceIssueStatus: (id, status) => set((state) => ({
    complianceIssues: state.complianceIssues.map(ci => ci.id === id ? { ...ci, status } : ci)
  })),

  checkOverdueIssues: () => {
    const state = get();
    const notify = useNotificationStore.getState().addNotification;
    const now = new Date();

    state.complianceIssues.forEach(issue => {
      if (issue.status !== 'Resolved') {
        const dueDate = new Date(issue.dueDate);
        if (dueDate < now) {
          notify({ title: 'Overdue Compliance Issue', message: `Issue "${issue.description}" is past its due date.`, type: 'error' });
        }
      }
    });
  },

  acknowledgePolicy: (id: string) => {
    set((state) => ({
      policyAcknowledgements: state.policyAcknowledgements.map(pa => 
        pa.id === id ? { ...pa, status: 'Acknowledged', acknowledgedAt: new Date().toISOString() } : pa
      )
    }));
    useNotificationStore.getState().addNotification({ title: 'Policy Acknowledged', message: 'Thank you for acknowledging the ESG policy.', type: 'success' });
  }
}));
