"use client";

import { AICopilotHistory } from "@/modules/ai/AICopilotHistory";
import { AICopilotChat } from "@/modules/ai/AICopilotChat";
import { AICopilotInsights } from "@/modules/ai/AICopilotInsights";
import { aiMockData } from "@/lib/mock/ai";
import { useScoreStore } from "@/stores/scoreStore";
import { useEnvironmentalStore } from "@/stores/environmentalStore";

export default function AIESGCopilotPage() {
  const { history, chat, insights } = aiMockData;
  const overallScore = useScoreStore(state => state.getOverallScore());
  const emissions = useEnvironmentalStore(state => state.carbonTransactions).reduce((acc, tx) => acc + tx.calculatedCO2e, 0);

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
    <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)] -mt-6 -mx-xl border-t border-outline-variant">
      <AICopilotHistory history={history} />
      <AICopilotChat data={chat} />
      <AICopilotInsights data={dynamicInsights} />
    </div>
  );
}
