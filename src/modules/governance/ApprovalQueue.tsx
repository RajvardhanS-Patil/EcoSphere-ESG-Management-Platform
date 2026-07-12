import React from "react";
import { ArrowRight } from "lucide-react";

interface ApprovalItem {
  title: string;
  id: string;
}

export function ApprovalQueue({ items, onBatchApprove }: { items: ApprovalItem[]; onBatchApprove?: () => void }) {
  return (
    <div className="col-span-12 lg:col-span-4 bg-primary text-on-primary rounded-xl p-lg flex flex-col shadow-lg relative overflow-hidden">
      <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-on-primary-container/20 rounded-full blur-3xl"></div>
      <h3 className="font-headline-md text-headline-md font-semibold mb-base relative z-10">Approval Queue</h3>
      <p className="text-on-primary-container font-body-sm mb-lg relative z-10">
        {items.length} ESG documents require your immediate review and final authorization.
      </p>
      <div className="flex flex-col gap-md relative z-10">
        {items.map((item, i) => (
          <div key={i} className="p-md bg-white/10 rounded-lg flex items-center justify-between border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
            <div className="flex flex-col min-w-0 pr-4">
              <span className="font-body-md font-medium truncate" title={item.title}>{item.title}</span>
              <span className="text-[11px] font-label-md text-on-primary-container truncate">Submission ID: {item.id}</span>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        ))}
      </div>
      <div className="mt-auto pt-lg">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[32px] font-display-lg font-bold">12</span>
            <p className="text-label-sm uppercase tracking-widest text-on-primary-container">Approved this week</p>
          </div>
          <button 
            onClick={onBatchApprove}
            className="bg-secondary-fixed text-on-secondary-fixed font-bold px-lg py-sm rounded-full text-label-md shadow-lg hover:scale-105 active:scale-95 transition-all">
            Batch Approve
          </button>
        </div>
      </div>
    </div>
  );
}
