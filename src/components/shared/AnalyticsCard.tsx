import React from "react";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AnalyticsCard({ children, className }: AnalyticsCardProps) {
  return (
    <div className={cn("bg-surface-container-lowest rounded-2xl p-lg shadow-sm", className)}>
      {children}
    </div>
  );
}
