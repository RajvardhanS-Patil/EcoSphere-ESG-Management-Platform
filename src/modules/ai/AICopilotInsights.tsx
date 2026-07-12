import React from "react";
import { Lightbulb, TrendingDown, Table, Share } from "lucide-react";

interface Action {
  title: string;
  subtitle: string;
  icon: string;
}

interface InsightsData {
  recommendation: { title: string };
  dataTrend: { trend: string };
  nextActions: Action[];
  storage: { used: string };
}

const iconMap: Record<string, React.ReactNode> = {
  table_chart: <Table className="w-5 h-5" />,
  share: <Share className="w-5 h-5" />
};

export function AICopilotInsights({ data }: { data: InsightsData }) {
  return (
    <aside className="w-80 border-l border-outline-variant bg-surface-container-lowest flex flex-col overflow-hidden">
      <div className="p-lg border-b border-outline-variant/30">
        <h3 className="font-headline-md text-[18px] text-primary font-bold">Insights & Actions</h3>
      </div>
      <div className="flex-grow overflow-y-auto custom-scrollbar p-lg space-y-lg">
        {/* Recommendation Card */}
        <div className="p-md rounded-2xl bg-secondary-container/20 border-l-4 border-secondary space-y-sm">
          <div className="flex items-center gap-sm">
            <Lightbulb className="text-secondary w-5 h-5" />
            <p className="font-label-md text-on-secondary-container font-semibold">AI Recommendation</p>
          </div>
          <p className="font-body-sm text-on-surface">{data.recommendation.title}</p>
          <button className="w-full mt-sm py-sm rounded-lg bg-secondary text-on-secondary font-label-md text-sm">Review Data</button>
        </div>
        {/* Data Trend Card */}
        <div className="p-md rounded-2xl border border-outline-variant/50 space-y-md">
          <p className="font-label-md text-outline uppercase tracking-wider">Carbon Intensity Trend</p>
          <div className="h-24 w-full bg-surface-container flex items-end justify-between p-sm gap-xs rounded-lg overflow-hidden">
            <div className="w-full bg-primary/20 rounded-t h-[40%]"></div>
            <div className="w-full bg-primary/30 rounded-t h-[55%]"></div>
            <div className="w-full bg-primary/40 rounded-t h-[70%]"></div>
            <div className="w-full bg-primary/60 rounded-t h-[60%]"></div>
            <div className="w-full bg-secondary rounded-t h-[45%]"></div>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-body-sm font-semibold">{data.dataTrend.trend}</p>
            <TrendingDown className="text-secondary w-5 h-5" />
          </div>
        </div>
        {/* Next Actions List */}
        <div className="space-y-sm">
          <p className="font-label-md text-outline uppercase tracking-wider">Next Actions</p>
          {data.nextActions.map((action, i) => (
            <div key={i} className="flex items-center gap-md p-sm hover:bg-surface-container-low rounded-xl cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container group-hover:text-primary transition-colors">
                {iconMap[action.icon]}
              </div>
              <div>
                <p className="font-body-sm font-medium">{action.title}</p>
                <p className="text-[11px] text-outline">{action.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer Action */}
      <div className="p-lg mt-auto border-t border-outline-variant/30">
        <div className="flex items-center justify-between text-on-surface-variant mb-md">
          <span className="font-label-md">Storage Used</span>
          <span className="font-label-md">{data.storage.used}</span>
        </div>
        <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: data.storage.used }}></div>
        </div>
      </div>
    </aside>
  );
}
