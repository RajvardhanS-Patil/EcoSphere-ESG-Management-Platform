import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex justify-between items-center mb-xl", className)}>
      <div>
        <h3 className="font-headline-md text-headline-md text-on-surface">{title}</h3>
        {subtitle && <p className="text-on-surface-variant font-body-sm text-body-sm">{subtitle}</p>}
      </div>
      {action && <div className="flex gap-sm">{action}</div>}
    </div>
  );
}
