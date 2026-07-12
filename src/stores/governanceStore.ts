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

interface GovernanceState {
  audits: Audit[];
  complianceIssues: ComplianceIssue[];
  
  addComplianceIssue: (issue: Omit<ComplianceIssue, 'id'>) => void;
  updateComplianceIssueStatus: (id: string, status: ComplianceIssue['status']) => void;
  checkOverdueIssues: () => void;
}

export const useGovernanceStore = create<GovernanceState>((set, get) => ({
  audits: [
    { id: 'a1', title: 'Annual Social Governance Audit', description: 'External review', date: '2024-10-10', status: 'In Progress' }
  ],
  complianceIssues: [
    { id: 'ci1', auditId: 'a1', severity: 'High', description: 'Data Privacy Gap', ownerId: 'd1', dueDate: '2024-10-12', status: 'Open' }
  ],
  
  addComplianceIssue: (issue) => {
    const notify = useNotificationStore.getState().addNotification;
    
    // Compliance Issue Ownership Rule: Must have owner and due date
    if (!issue.ownerId || !issue.dueDate) {
      notify({ title: 'Validation Failed', message: 'Owner and Due Date are mandatory for Compliance Issues.', type: 'error' });
      return;
    }
    
    set((state) => ({
      complianceIssues: [...state.complianceIssues, { ...issue, id: Math.random().toString(36).substring(7) }]
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
  }
}));
