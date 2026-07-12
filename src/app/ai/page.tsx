"use client";

import { AICopilotHistory } from "@/modules/ai/AICopilotHistory";
import { AICopilotChat } from "@/modules/ai/AICopilotChat";
import { AICopilotInsights } from "@/modules/ai/AICopilotInsights";
import { aiMockData } from "@/lib/mock/ai";
import { useScoreStore } from "@/stores/scoreStore";
import { useEnvironmentalStore } from "@/stores/environmentalStore";
import { useGovernanceStore } from "@/stores/governanceStore";
import { useMasterDataStore } from "@/stores/masterDataStore";
import { useSocialGamificationStore } from "@/stores/socialGamificationStore";

import { useState } from "react";
import { Menu, Info } from "lucide-react";

export default function AIESGCopilotPage() {
  const { history, chat, insights } = aiMockData;
  const overallScore = useScoreStore(state => state.getOverallScore());
  const carbonTransactions = useEnvironmentalStore(state => state.carbonTransactions);
  const emissions = carbonTransactions.reduce((acc, tx) => acc + tx.calculatedCO2e, 0);
  const departments = useMasterDataStore(state => state.departments);
  const complianceIssues = useGovernanceStore(state => state.complianceIssues);
  const employees = useSocialGamificationStore(state => state.employees);

  const esgContext = {
    overallScore,
    totalEmissions: emissions,
    transactionCount: carbonTransactions.length,
    departments: departments.map(d => d.name),
    openComplianceIssues: complianceIssues.filter(i => i.status !== 'Resolved').length,
    totalEmployees: employees.length,
    topPerformer: [...employees].sort((a, b) => b.xp - a.xp)[0]?.name || 'N/A',
  };

  const [showHistory, setShowHistory] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  // Dynamic injection into insights based on Zustand state
  const dynamicInsights = {
    ...insights,
    analysis: [
      {
        icon: "trending_up",
        title: "ESG Score Overview",
        description: `Current score is ${overallScore}/100. Social metrics are driving growth.`,
        colorClass: "text-primary"
      },
      {
        icon: "warning",
        title: "Emissions Alert",
        description: `Total emissions currently at ${emissions} kg CO2e. Consider accelerating Scope 1 reduction initiatives.`,
        colorClass: "text-error"
      }
    ]
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden h-[calc(100vh-4rem)] -mt-6 -mx-xl border-t border-outline-variant relative">
      {/* Mobile Toggle Bar */}
      <div className="flex lg:hidden justify-between items-center bg-surface-container p-sm border-b border-outline-variant">
        <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1 text-on-surface-variant p-2 rounded hover:bg-surface-container-high">
          <Menu className="w-5 h-5" /> <span className="font-label-sm">History</span>
        </button>
        <button onClick={() => setShowInsights(!showInsights)} className="flex items-center gap-1 text-on-surface-variant p-2 rounded hover:bg-surface-container-high">
          <span className="font-label-sm">Insights</span> <Info className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className={`absolute lg:relative z-20 h-full transition-transform duration-300 ${showHistory ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <AICopilotHistory history={history} />
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col z-10 bg-surface-container-lowest">
          <AICopilotChat data={chat} esgContext={esgContext} />
        </div>

        <div className={`absolute right-0 lg:relative z-20 h-full transition-transform duration-300 ${showInsights ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          <AICopilotInsights data={dynamicInsights} />
        </div>
      </div>
    </div>
  );
}
