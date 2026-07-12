import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info" | "neutral";
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const statusStyles = {
    success: "bg-primary-container/20 text-primary border-primary/30",
    warning: "bg-secondary-container/20 text-secondary border-secondary/30",
    error: "bg-error-container/20 text-error border-error/30",
    info: "bg-tertiary-fixed/30 text-tertiary border-tertiary/30",
    neutral: "bg-surface-container text-on-surface-variant border-outline-variant/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
        statusStyles[status],
        className
      )}
    >
      {label}
    </span>
  );
}
