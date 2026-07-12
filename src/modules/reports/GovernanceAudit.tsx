import React from "react";
import { Gavel, ShieldCheck } from "lucide-react";

interface GovData {
  boardIndep: string;
  ethicsAudit: string;
  lastAudit: string;
}

export function GovernanceAudit({ data }: { data: GovData }) {
  return (
    <div className="col-span-12 lg:col-span-6 bg-surface-container-lowest/50 backdrop-blur-md rounded-2xl p-lg border-t-2 border-t-primary shadow-sm">
      <div className="flex justify-between items-center mb-md">
        <h4 className="font-headline-md text-headline-md text-primary">Governance Audit</h4>
        <Gavel className="text-outline w-6 h-6" />
      </div>
      <div className="grid grid-cols-2 gap-md">
        <div className="flex flex-col items-center justify-center p-md border border-outline-variant/30 rounded-xl">
          <span className="font-label-sm text-on-surface-variant uppercase">Board Indep.</span>
          <span className="font-headline-md text-primary mt-xs">{data.boardIndep}</span>
        </div>
        <div className="flex flex-col items-center justify-center p-md border border-outline-variant/30 rounded-xl">
          <span className="font-label-sm text-on-surface-variant uppercase">Ethics Audit</span>
          <span className="font-label-md text-secondary mt-xs font-bold px-2 py-0.5 bg-secondary/10 rounded-full">{data.ethicsAudit}</span>
        </div>
      </div>
      <div className="mt-md flex items-center gap-sm text-on-surface-variant">
        <ShieldCheck className="w-5 h-5" />
        <span className="font-body-sm italic">Last audit: {data.lastAudit}</span>
      </div>
    </div>
  );
}
