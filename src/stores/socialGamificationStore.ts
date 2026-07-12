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

export const useSocialGamificationStore = create<SocialGamificationState>((set, get) => ({
  employees: [
    { id: 'e1', name: 'Alice Smith', departmentId: 'd1', xp: 500, unlockedBadges: [] },
    { id: 'e2', name: 'Bob Jones', departmentId: 'd2', xp: 1200, unlockedBadges: ['b1'] },
  ],
  csrActivities: [
    { id: 'csr1', title: 'Beach Cleanup', categoryId: 'c1', xpReward: 200, status: 'Active' },
    { id: 'csr2', title: 'Zero Waste Week', categoryId: 'c2', xpReward: 500, status: 'Active' },
  ],
  participations: [
    { id: 'p1', employeeId: 'e1', activityId: 'csr1', status: 'Pending', pointsEarned: 0 },
  ],

  approveParticipation: (participationId) => {
    const settings = useSettingsStore.getState();
    const masterData = useMasterDataStore.getState();
    const notify = useNotificationStore.getState().addNotification;
    
    set((state) => {
      const participation = state.participations.find(p => p.id === participationId);
      if (!participation) return state;

      // Evidence Requirement Rule
      if (settings.evidenceReq && !participation.proofUrl) {
        notify({ title: 'Approval Failed', message: 'Evidence is required for approval.', type: 'error' });
        return state;
      }

      const activity = state.csrActivities.find(a => a.id === participation.activityId);
      const points = activity?.xpReward || 0;

      // Update Participation
      const updatedParticipations = state.participations.map(p => 
        p.id === participationId 
          ? { ...p, status: 'Approved' as const, pointsEarned: points, completionDate: new Date().toISOString() } 
          : p
      );

      // Update Employee XP
      let updatedEmployees = [...state.employees];
      const empIndex = updatedEmployees.findIndex(e => e.id === participation.employeeId);
      
      if (empIndex >= 0) {
        const emp = updatedEmployees[empIndex];
        const newXp = emp.xp + points;
        let newBadges = [...emp.unlockedBadges];

        // Badge Auto-Award Rule
        if (settings.badgeAutoAward) {
          masterData.badges.forEach(badge => {
            if (!newBadges.includes(badge.id)) {
              if (badge.unlockRule.type === 'XP' && newXp >= badge.unlockRule.threshold) {
                newBadges.push(badge.id);
                if (settings.notificationSettings.badgeUnlocks) {
                  notify({ title: 'Badge Unlocked!', message: `${emp.name} unlocked ${badge.name}`, type: 'success' });
                }
              }
              // Add logic for CHALLENGE_COUNT if needed
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
          // Deduct XP
          const updatedEmployees = [...state.employees];
          updatedEmployees[empIndex] = { ...emp, xp: emp.xp - reward.pointsRequired };
          
          // Deduct Stock
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
