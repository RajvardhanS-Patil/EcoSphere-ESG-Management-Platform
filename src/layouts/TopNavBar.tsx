import Link from "next/link";
import { Search, Bell, SunMoon, Menu } from "lucide-react";

export function TopNavBar({ setSidebarOpen }: { setSidebarOpen?: (v: boolean) => void }) {
  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] z-40 bg-surface/80 backdrop-blur-md flex justify-between items-center px-lg py-md h-16 border-b border-outline-variant">
      <div className="flex items-center gap-sm lg:gap-xl flex-1">
        <button 
          className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors"
          onClick={() => setSidebarOpen && setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-primary" />
        </button>
        <div className="relative w-full max-w-xs xl:max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-secondary/20 placeholder:text-outline-variant outline-none"
            placeholder="Search enterprise metrics..."
            type="text"
          />
        </div>
        <nav className="hidden lg:flex items-center gap-lg">
          <Link href="#" className="text-primary border-b-2 border-primary pb-1 font-label-md text-label-md">
            Overview
          </Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
            Metrics
          </Link>
          <Link href="#" className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
            Analytics
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-md">
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
          <SunMoon className="w-5 h-5" />
        </button>
        <div className="h-8 w-px bg-outline-variant mx-2"></div>
        <div className="flex items-center gap-sm cursor-pointer hover:opacity-80 transition-opacity">
          <img
            className="w-9 h-9 rounded-full object-cover border-2 border-primary-container"
            alt="Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCyDTKuA-3KpoVrAt3CAhP_237TdptsjTCIR7bt1Bpz5G7-LY99Rl8-DfXlEAwBAZJpMy_xCDg2cMaaoTLf2sJWrmk3YaKp_YWkWAu8PfUYzPxdy-clkdVFUxe-b8M9LqTLybwXpHaGOz4OxI5EFdY6GsbS1SdJWlCWgkUUea53hyT6H1FihuyipRHnM9o3NrKi9etwkDLBifCiE2zo6Xhvkg1mBF7g_qTQWNOz3lBqqLER1ZTZH59DAw7lOTJPn3bDBv1veXERMuP"
          />
          <span className="font-label-md text-label-md text-on-surface font-semibold hidden md:block">
            Alex Rivera
          </span>
        </div>
      </div>
    </header>
  );
}
