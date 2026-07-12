"use client";

import React, { useState, useEffect } from "react";
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

function AnimatedNumber({ value }: { value: string }) {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isNaN(numericValue)) {
      return;
    }
    const duration = 1200;
    const steps = 40;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(numericValue, increment * step);
      // Ease-out effect
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(numericValue * eased * 10) / 10);

      if (step >= steps) {
        setDisplay(numericValue);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue]);

  if (isNaN(numericValue)) {
    return <>{value}</>;
  }

  const displayValue = Number.isInteger(numericValue) ? Math.round(display) : display.toFixed(1);
  return <>{displayValue}{suffix}</>;
}

export function KPICard({ title, icon, value, unit, trend, trendUp, colorClass }: KPICardProps) {
  const borderColors = {
    primary: "border-l-primary",
    secondary: "border-l-secondary-stitch",
    tertiary: "border-l-tertiary",
    error: "border-l-error",
  };

  const bgIconColors = {
    primary: "bg-primary-container/20 text-primary",
    secondary: "bg-secondary-container/20 text-secondary-stitch",
    tertiary: "bg-tertiary-fixed/30 text-tertiary",
    error: "bg-error-container/20 text-error",
  };

  const textColors = {
    primary: "text-primary",
    secondary: "text-secondary-stitch",
    tertiary: "text-tertiary",
    error: "text-error",
  };

  return (
    <div className={cn(
      "bg-surface-container-lowest p-lg rounded-2xl border-l-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group",
      borderColors[colorClass]
    )}>
      <div className="flex justify-between items-start mb-md">
        <span className="text-on-surface-variant font-label-md text-[11px] uppercase tracking-widest">{title}</span>
        <div className={cn("p-2 rounded-xl group-hover:scale-110 transition-transform", bgIconColors[colorClass])}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-sm">
        <span className={cn("font-headline-lg text-3xl font-bold tabular-nums", textColors[colorClass])}>
          <AnimatedNumber value={value} />
        </span>
        {unit && <span className="text-on-surface-variant text-xs">{unit}</span>}
      </div>
      <div className={cn(
        "mt-md flex items-center gap-xs text-xs font-medium",
        trendUp ? "text-emerald-600" : "text-amber-600"
      )}>
        {trend}
      </div>
    </div>
  );
}
