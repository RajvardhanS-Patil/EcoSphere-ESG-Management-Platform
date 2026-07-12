import React from "react";
import { BookOpen, FileText, Shield, Leaf } from "lucide-react";

interface Policy {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  statusLabel: string;
  statusColor: string;
  statusSub: string;
}

const iconMap: Record<string, React.ReactNode> = {
  description: <FileText className="text-primary w-5 h-5" />,
  shield: <Shield className="text-primary w-5 h-5" />,
  energy_savings_leaf: <Leaf className="text-primary w-5 h-5" />,
};

export function PolicyLibrary({ policies, onAcknowledge }: { policies: Policy[], onAcknowledge: (id: string) => void }) {
  const acknowledgedCount = policies.filter(p => p.statusLabel === 'Acknowledged').length;
  const percentage = Math.round((acknowledgedCount / (policies.length || 1)) * 100);

  return (
    <div className="col-span-12 lg:col-span-6 bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm">
      <div className="flex justify-between items-center mb-lg">
        <div className="flex items-center gap-sm">
          <BookOpen className="text-primary w-6 h-6" />
          <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Policy Library</h3>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-primary-container text-on-primary rounded-full text-[11px] font-bold">
            {percentage}% Acknowledged
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-sm">
        {policies.map((policy) => (
          <div key={policy.id} className="p-md bg-surface-container-low rounded-lg border border-transparent hover:border-primary/20 transition-all flex items-center gap-md">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center shadow-sm">
              {iconMap[policy.icon]}
            </div>
            <div className="flex-1">
              <h4 className="font-body-md font-semibold text-on-surface leading-tight">{policy.title}</h4>
              <span className="text-label-sm text-on-surface-variant">{policy.subtitle}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              {policy.statusLabel === 'Pending Review' ? (
                <button 
                  onClick={() => onAcknowledge(policy.id)}
                  className="px-3 py-1 text-xs font-bold rounded bg-primary text-on-primary hover:opacity-90 active:scale-95 transition-all">
                  Acknowledge
                </button>
              ) : (
                <span className={`text-[11px] font-label-md font-bold uppercase ${policy.statusColor}`}>
                  {policy.statusLabel}
                </span>
              )}
              <span className="text-[10px] text-on-surface-variant">{policy.statusSub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
