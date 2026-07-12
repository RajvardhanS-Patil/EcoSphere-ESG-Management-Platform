import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'success' | 'error';
  status: 'unread' | 'read' | 'archived';
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'status'>) => void;
  markAsRead: (id: string) => void;
  archiveNotification: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notif) =>
    set((state) => ({
      notifications: [
        {
          ...notif,
          id: Math.random().toString(36).substring(7),
          date: new Date().toISOString(),
          status: 'unread',
        },
        ...state.notifications,
      ],
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, status: 'read' } : n
      ),
    })),
  archiveNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, status: 'archived' } : n
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, status: 'read' })),
    })),
}));
