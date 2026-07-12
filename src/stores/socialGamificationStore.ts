import { create } from 'zustand';
import { useSettingsStore } from './settingsStore';
import { useMasterDataStore } from './masterDataStore';
import { useNotificationStore } from './notificationStore';

export interface Employee {
  id: string;
  name: string;
  departmentId: string;
  xp: number;
  unlockedBadges: string[];
}

export interface CSRActivity {
  id: string;
  title: string;
  categoryId: string;
  xpReward: number;
  status: 'Active' | 'Completed';
}

export interface EmployeeParticipation {
  id: string;
  employeeId: string;
  activityId: string;
  proofUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  pointsEarned: number;
  completionDate?: string;
}

interface SocialGamificationState {
  employees: Employee[];
  csrActivities: CSRActivity[];
  participations: EmployeeParticipation[];
  
  approveParticipation: (participationId: string) => void;
  redeemReward: (employeeId: string, rewardId: string) => void;
}

export const useSocialGamificationStore = create<SocialGamificationState>((set) => ({
  employees: [
    { id: 'e1', name: 'Priya Sharma', departmentId: 'd1', xp: 2450, unlockedBadges: ['b1', 'b2'] },
    { id: 'e2', name: 'Aarav Mehta', departmentId: 'd2', xp: 1800, unlockedBadges: ['b1', 'b2'] },
    { id: 'e3', name: 'Sneha Kulkarni', departmentId: 'd1', xp: 1200, unlockedBadges: ['b1'] },
    { id: 'e4', name: 'Aditya Joshi', departmentId: 'd3', xp: 950, unlockedBadges: [] },
    { id: 'e5', name: 'Neha Deshmukh', departmentId: 'd4', xp: 680, unlockedBadges: [] },
    { id: 'e6', name: 'Rohit Gupta', departmentId: 'd2', xp: 320, unlockedBadges: [] },
    { id: 'e7', name: 'Ananya Iyer', departmentId: 'd5', xp: 1500, unlockedBadges: ['b1', 'b2'] },
    { id: 'e8', name: 'Raj Patil', departmentId: 'd6', xp: 3200, unlockedBadges: ['b1', 'b2', 'b3'] },
  ],
  csrActivities: [
    { id: 'csr1', title: 'Narmada River Cleanup Drive', categoryId: 'c1', xpReward: 300, status: 'Active' },
    { id: 'csr2', title: 'Digital Literacy for Rural Schools', categoryId: 'c1', xpReward: 250, status: 'Active' },
    { id: 'csr3', title: 'Zero Waste Week Challenge', categoryId: 'c2', xpReward: 500, status: 'Active' },
    { id: 'csr4', title: 'Community Health Screening — Pune', categoryId: 'c1', xpReward: 200, status: 'Completed' },
    { id: 'csr5', title: 'Mangrove Plantation — Alibaug', categoryId: 'c1', xpReward: 400, status: 'Active' },
  ],
  participations: [
    { id: 'p1', employeeId: 'e1', activityId: 'csr1', proofUrl: 'https://evidence.example.com/p1.jpg', status: 'Approved', pointsEarned: 300, completionDate: '2024-10-15' },
    { id: 'p2', employeeId: 'e2', activityId: 'csr2', proofUrl: 'https://evidence.example.com/p2.jpg', status: 'Approved', pointsEarned: 250, completionDate: '2024-10-20' },
    { id: 'p3', employeeId: 'e3', activityId: 'csr3', status: 'Pending', pointsEarned: 0 },
    { id: 'p4', employeeId: 'e4', activityId: 'csr1', proofUrl: 'https://evidence.example.com/p4.jpg', status: 'Approved', pointsEarned: 300, completionDate: '2024-10-22' },
    { id: 'p5', employeeId: 'e8', activityId: 'csr5', status: 'Pending', pointsEarned: 0 },
    { id: 'p6', employeeId: 'e5', activityId: 'csr4', proofUrl: 'https://evidence.example.com/p6.jpg', status: 'Approved', pointsEarned: 200, completionDate: '2024-11-01' },
    { id: 'p7', employeeId: 'e7', activityId: 'csr2', proofUrl: 'https://evidence.example.com/p7.jpg', status: 'Approved', pointsEarned: 250, completionDate: '2024-11-05' },
  ],

  approveParticipation: (participationId) => {
    const settings = useSettingsStore.getState();
    const masterData = useMasterDataStore.getState();
    const notify = useNotificationStore.getState().addNotification;
    
    set((state) => {
      const participation = state.participations.find(p => p.id === participationId);
      if (!participation) return state;

      if (settings.evidenceReq && !participation.proofUrl) {
        notify({ title: 'Approval Failed', message: 'Evidence is required for approval.', type: 'error' });
        return state;
      }

      const activity = state.csrActivities.find(a => a.id === participation.activityId);
      const points = activity?.xpReward || 0;

      const updatedParticipations = state.participations.map(p => 
        p.id === participationId 
          ? { ...p, status: 'Approved' as const, pointsEarned: points, completionDate: new Date().toISOString() } 
          : p
      );

      const updatedEmployees = [...state.employees];
      const empIndex = updatedEmployees.findIndex(e => e.id === participation.employeeId);
      
      if (empIndex >= 0) {
        const emp = updatedEmployees[empIndex];
        const newXp = emp.xp + points;
        const newBadges = [...emp.unlockedBadges];

        if (settings.badgeAutoAward) {
          masterData.badges.forEach(badge => {
            if (!newBadges.includes(badge.id)) {
              if (badge.unlockRule.type === 'XP' && newXp >= badge.unlockRule.threshold) {
                newBadges.push(badge.id);
                if (settings.notificationSettings.badgeUnlocks) {
                  notify({ title: 'Badge Unlocked!', message: `${emp.name} unlocked ${badge.name}`, type: 'success' });
                }
              }
            }
          });
        }

        updatedEmployees[empIndex] = { ...emp, xp: newXp, unlockedBadges: newBadges };
        
        if (settings.notificationSettings.csrApproval) {
          notify({ title: 'CSR Approved', message: `${emp.name} earned ${points} XP`, type: 'success' });
        }
      }

      return { ...state, participations: updatedParticipations, employees: updatedEmployees };
    });
  },

  redeemReward: (employeeId, rewardId) => {
    const masterData = useMasterDataStore.getState();
    const notify = useNotificationStore.getState().addNotification;

    set((state) => {
      const empIndex = state.employees.findIndex(e => e.id === employeeId);
      const reward = masterData.rewards.find(r => r.id === rewardId);
      
      if (empIndex >= 0 && reward) {
        const emp = state.employees[empIndex];
        if (emp.xp >= reward.pointsRequired && reward.stock > 0) {
          const updatedEmployees = [...state.employees];
          updatedEmployees[empIndex] = { ...emp, xp: emp.xp - reward.pointsRequired };
          masterData.updateRewardStock(rewardId, reward.stock - 1);
          notify({ title: 'Reward Redeemed', message: `Successfully redeemed ${reward.name}`, type: 'success' });
          return { ...state, employees: updatedEmployees };
        } else {
          notify({ title: 'Redemption Failed', message: 'Not enough XP or out of stock.', type: 'error' });
        }
      }
      return state;
    });
  }
}));
