import React from "react";
import { SideNavBar } from "./SideNavBar";
import { TopNavBar } from "./TopNavBar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <SideNavBar />
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <TopNavBar />
        <div className="mt-16 p-lg flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
