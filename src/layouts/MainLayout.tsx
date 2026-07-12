"use client";

import React, { useState, useEffect } from "react";
import { SideNavBar } from "./SideNavBar";
import { TopNavBar } from "./TopNavBar";
import { useMasterDataStore } from "@/stores/masterDataStore";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fetchDepartments = useMasterDataStore(state => state.fetchDepartments);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return (
    <div className="flex min-h-screen bg-background relative">
      <SideNavBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col min-w-0 transition-all duration-300">
        <TopNavBar setSidebarOpen={setSidebarOpen} />
        <div className="mt-16 p-lg flex-1 overflow-x-hidden relative">
          {children}
        </div>
      </main>
    </div>
  );
}
