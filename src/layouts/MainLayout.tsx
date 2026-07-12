"use client";

import React, { useState, useEffect } from "react";
import { SideNavBar } from "./SideNavBar";
import { TopNavBar } from "./TopNavBar";
import { useMasterDataStore } from "@/stores/masterDataStore";
import { Toaster } from "sonner";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const fetchDepartments = useMasterDataStore(state => state.fetchDepartments);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return (
    <div className="flex min-h-screen bg-background relative">
      <SideNavBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`flex-1 min-h-screen flex flex-col min-w-0 transition-all duration-300 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}>
        <TopNavBar setSidebarOpen={setSidebarOpen} collapsed={collapsed} />
        <div className="mt-16 p-lg flex-1 overflow-x-hidden relative">
          {children}
        </div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
