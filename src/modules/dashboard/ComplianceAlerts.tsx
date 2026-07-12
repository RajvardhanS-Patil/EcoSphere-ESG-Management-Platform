import React from "react";
import { AlertTriangle } from "lucide-react";

interface Alert {
  type: string;
  description: string;
  colorClass: string;
}

export function ComplianceAlerts({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="bg-primary text-on-primary rounded-2xl p-lg shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-md mb-md">
          <AlertTriangle className="text-secondary-fixed w-6 h-6" />
          <h3 className="font-headline-md text-headline-md">Compliance Alerts</h3>
        </div>
        <div className="space-y-md">
          {alerts.map((alert, i) => (
            <div key={i} className="p-md bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
              <p className={`font-label-md text-label-md mb-1 ${alert.colorClass}`}>{alert.type}</p>
              <p className="font-body-sm text-body-sm">{alert.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
    </div>
  );
}
