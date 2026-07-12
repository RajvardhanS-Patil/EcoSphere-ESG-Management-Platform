"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, Menu, X, Check, CheckCheck } from "lucide-react";
import { useNotificationStore } from "@/stores/notificationStore";
import { usePathname } from "next/navigation";

const routeTitles: Record<string, string> = {
  "/": "Executive Dashboard",
  "/environmental": "Environmental Tracking",
  "/social": "Social & Gamification",
  "/governance": "Governance & Compliance",
  "/reports": "Reports & Analytics",
  "/ai": "EcoSphere ESG Advisor",
  "/settings": "Settings & Configuration",
};

export function TopNavBar({ setSidebarOpen, collapsed, setCollapsed }: { setSidebarOpen?: (v: boolean) => void; collapsed?: boolean; setCollapsed?: (v: boolean) => void }) {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const notifications = useNotificationStore(state => state.notifications);
  const markAsRead = useNotificationStore(state => state.markAsRead);
  const markAllAsRead = useNotificationStore(state => state.markAllAsRead);
  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  // Close notification panel on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className={`fixed top-0 right-0 z-40 bg-surface/80 backdrop-blur-md flex justify-between items-center px-lg py-md h-16 border-b border-outline-variant transition-all duration-300 left-0 ${collapsed ? 'lg:left-0' : 'lg:left-64'}`}>
      <div className="flex items-center gap-sm lg:gap-lg flex-1 min-w-0">
        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors"
          onClick={() => setSidebarOpen && setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-primary" />
        </button>
        
        {/* Desktop Toggle */}
        <button 
          className="hidden lg:block p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors"
          onClick={() => setCollapsed && setCollapsed(!collapsed)}
        >
          <Menu className="w-6 h-6 text-primary" />
        </button>
        
        {/* Page Title / Breadcrumb */}
        <h2 className="font-headline-md text-on-surface font-semibold text-lg hidden md:block truncate">
          {routeTitles[pathname] || "EcoSphere"}
        </h2>

        <div className="relative w-full max-w-xs xl:max-w-sm hidden lg:block ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input
            className="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant/50 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/50 placeholder:text-outline-variant outline-none transition-all"
            placeholder="Search metrics..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-error text-on-error text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Panel */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 max-h-96 bg-surface border border-outline-variant rounded-2xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in duration-200">
              <div className="flex items-center justify-between p-4 border-b border-outline-variant">
                <h3 className="font-semibold text-on-surface text-sm">Notifications</h3>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs text-primary hover:underline flex items-center gap-1">
                      <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                    </button>
                  )}
                  <button onClick={() => setNotifOpen(false)} className="p-1 hover:bg-surface-container-high rounded-full ml-1">
                    <X className="w-4 h-4 text-on-surface-variant" />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto max-h-72">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-on-surface-variant text-sm">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.slice(0, 8).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`w-full text-left px-4 py-3 border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors flex gap-3 ${n.status === 'unread' ? 'bg-primary-container/5' : ''}`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === 'error' ? 'bg-error' : n.type === 'warning' ? 'bg-amber-500' : n.type === 'success' ? 'bg-emerald-500' : 'bg-primary'}`} />
                      <div className="min-w-0">
                        <p className={`text-sm truncate ${n.status === 'unread' ? 'font-semibold text-on-surface' : 'text-on-surface-variant'}`}>{n.title}</p>
                        <p className="text-xs text-on-surface-variant truncate">{n.message}</p>
                      </div>
                      {n.status === 'unread' && <Check className="w-4 h-4 text-primary shrink-0 mt-1" />}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-outline-variant mx-2 hidden md:block" />
        <div className="flex items-center gap-sm cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm shrink-0">
            RP
          </div>
          <span className="font-label-md text-label-md text-on-surface font-semibold hidden md:block whitespace-nowrap">
            Raj Patil
          </span>
        </div>
      </div>
    </header>
  );
}
