import { aiMockData } from "@/lib/mock/ai";
import { AICopilotHistory } from "@/modules/ai/AICopilotHistory";
import { AICopilotChat } from "@/modules/ai/AICopilotChat";
import { AICopilotInsights } from "@/modules/ai/AICopilotInsights";

export default function AIESGCopilotPage() {
  const { history, chat, insights } = aiMockData;

  return (
    <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)] -mt-6 -mx-xl border-t border-outline-variant">
      {/* Internal Left Sidebar: History & Status */}
      <AICopilotHistory history={history} />

      {/* Central Chat Canvas */}
      <AICopilotChat data={chat} />

      {/* Right Panel: Insights & Actions */}
      <AICopilotInsights data={insights} />
    </div>
  );
}
