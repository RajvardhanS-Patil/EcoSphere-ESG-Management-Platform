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
  PlusCircle,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Environmental", href: "/environmental", icon: Leaf },
  { name: "Social", href: "/social", icon: Users },
  { name: "Governance", href: "/governance", icon: Scale },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "AI Copilot", href: "/ai", icon: Bot },
];

export function SideNavBar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen w-64 fixed left-0 top-0 z-50 border-r border-outline-variant bg-surface-container-low dark:bg-surface-container-lowest">
      <div className="px-lg py-xl">
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-sm">
            <Leaf className="text-on-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">EcoSphere</h1>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">Enterprise ESG</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-md space-y-base overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-md px-md py-sm rounded-lg transition-colors font-body-md text-body-md",
                isActive
                  ? "text-primary font-bold border-r-4 border-primary bg-surface-container-high"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-md mt-auto">
        <button className="w-full py-md bg-primary text-on-primary rounded-xl font-medium shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Generate ESG Report
        </button>
        <div className="mt-xl space-y-base">
          <Link
            href="/settings"
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <Link
            href="/support"
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
