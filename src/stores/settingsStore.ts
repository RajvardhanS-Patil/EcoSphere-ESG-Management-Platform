import { create } from 'zustand';

interface SettingsState {
  autoEmissionCalc: boolean;
  evidenceReq: boolean;
  badgeAutoAward: boolean;
  notificationSettings: {
    complianceIssues: boolean;
    csrApproval: boolean;
    policyReminders: boolean;
    badgeUnlocks: boolean;
  };
  setSetting: (key: keyof Omit<SettingsState, 'notificationSettings' | 'setSetting' | 'updateNotificationSetting'>, value: boolean) => void;
  updateNotificationSetting: (key: keyof SettingsState['notificationSettings'], value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  autoEmissionCalc: true,
  evidenceReq: true,
  badgeAutoAward: true,
  notificationSettings: {
    complianceIssues: true,
    csrApproval: true,
    policyReminders: true,
    badgeUnlocks: true,
  },
  setSetting: (key, value) => set((state) => ({ ...state, [key]: value })),
  updateNotificationSetting: (key, value) =>
    set((state) => ({
      notificationSettings: {
        ...state.notificationSettings,
        [key]: value,
      },
    })),
}));
