import React from "react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  unit?: string;
  trend: React.ReactNode;
  trendUp?: boolean;
  colorClass: "primary" | "secondary" | "tertiary" | "error";
}

export function KPICard({ title, icon, value, unit, trend, trendUp, colorClass }: KPICardProps) {
  const borderColors = {
    primary: "border-primary",
    secondary: "border-secondary",
    tertiary: "border-tertiary",
    error: "border-error",
  };

  const bgIconColors = {
    primary: "bg-primary-container/10 text-primary",
    secondary: "bg-secondary-container/10 text-secondary",
    tertiary: "bg-tertiary-fixed/30 text-tertiary",
    error: "bg-error-container/20 text-error",
  };

  const textColors = {
    primary: "text-primary",
    secondary: "text-on-surface",
    tertiary: "text-on-surface",
    error: "text-on-surface",
  };

  return (
    <div className={cn("bg-surface-container-lowest p-lg rounded-2xl border-t-2 shadow-sm hover:shadow-md transition-shadow", borderColors[colorClass])}>
      <div className="flex justify-between items-start mb-md">
        <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wide">{title}</span>
        <div className={cn("p-2 rounded-lg", bgIconColors[colorClass])}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-sm">
        <span className={cn("font-headline-lg text-display-lg", textColors[colorClass])}>{value}</span>
        {unit && <span className="text-on-surface-variant font-body-md text-body-md">{unit}</span>}
      </div>
      <div className={cn("mt-md flex items-center gap-xs font-medium text-sm", trendUp ? "text-emerald-600" : "text-emerald-600")}>
        {trend}
      </div>
    </div>
  );
}
