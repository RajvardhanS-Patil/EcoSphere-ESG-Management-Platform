"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Leaf,
  Users,
  Scale,
  FileText,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Environmental", href: "/environmental", icon: Leaf },
  { name: "Social", href: "/social", icon: Users },
  { name: "Governance", href: "/governance", icon: Scale },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "ESG Advisor", href: "/ai", icon: Bot },
];

interface SideNavBarProps {
  isOpen?: boolean;
  setIsOpen?: (v: boolean) => void;
  collapsed?: boolean;
  setCollapsed?: (v: boolean) => void;
}

export function SideNavBar({ isOpen = false, setIsOpen = () => {}, collapsed = false, setCollapsed = () => {} }: SideNavBarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={cn(
        "flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-outline-variant bg-surface-container-low transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Section */}
        <div className={cn("py-xl flex items-center", collapsed ? "px-4 justify-center" : "px-lg")}>
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-md shadow-primary/20 shrink-0">
              <Leaf className="text-on-primary w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h1 className="font-headline-md text-headline-md font-bold text-primary whitespace-nowrap">EcoSphere</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-medium whitespace-nowrap">Enterprise ESG Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className={cn("flex-1 space-y-1 overflow-y-auto", collapsed ? "px-2" : "px-md")}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                title={collapsed ? item.name : undefined}
                className={cn(
                  "flex items-center rounded-xl transition-all duration-200 group relative",
                  collapsed ? "justify-center w-12 h-12 mx-auto" : "gap-md px-md py-2.5",
                  isActive
                    ? "bg-primary-container/30 text-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                )}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                )}
                <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
                {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
                {/* Collapsed tooltip */}
                {collapsed && (
                  <span className="absolute left-full ml-3 px-3 py-1.5 bg-surface-container-highest text-on-surface text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className={cn("mt-auto border-t border-outline-variant", collapsed ? "p-2" : "p-md")}>
          {!collapsed && (
            <Link
              href="/reports"
              className="block w-full py-2.5 bg-primary text-on-primary rounded-xl font-medium shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] transition-all text-center text-sm mb-3"
            >
              Generate ESG Report
            </Link>
          )}
          
          <Link
            href="/settings"
            onClick={() => setIsOpen(false)}
            title={collapsed ? "Settings" : undefined}
            className={cn(
              "flex items-center rounded-xl transition-all duration-200 group relative",
              collapsed ? "justify-center w-12 h-12 mx-auto" : "gap-md px-md py-2.5",
              pathname === "/settings"
                ? "bg-primary-container/30 text-primary font-semibold"
                : "text-on-surface-variant hover:bg-surface-container-high"
            )}
          >
            {pathname === "/settings" && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
            )}
            <Settings className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
            {collapsed && (
              <span className="absolute left-full ml-3 px-3 py-1.5 bg-surface-container-highest text-on-surface text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Settings
              </span>
            )}
          </Link>

          {/* Desktop Collapse Toggle is now handled by TopNavBar hamburger menu */}
        </div>
      </aside>
    </>
  );
}
