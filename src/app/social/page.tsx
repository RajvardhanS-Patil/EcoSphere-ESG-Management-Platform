import { socialMockData } from "@/lib/mock/social";
import { HeroStatsRow } from "@/modules/social/HeroStatsRow";
import { CSRActivities } from "@/modules/social/CSRActivities";
import { ChallengeDashboard } from "@/modules/social/ChallengeDashboard";
import { SocialLeaderboard } from "@/modules/social/SocialLeaderboard";
import { ActivityPulseHeatmap } from "@/modules/social/ActivityPulseHeatmap";
import { CommunitySpotlight } from "@/modules/social/CommunitySpotlight";
import { Plus } from "lucide-react";

export default function SocialCSRPage() {
  const { heroStats, csrActivities, activeChallenges, leaderboard, spotlight } = socialMockData;

  return (
    <div className="space-y-xl pb-24">
      {/* Hero Stats Row */}
      <HeroStatsRow stats={heroStats} />

      {/* Main Bento Layout */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Left Column: CSR Activities & Challenges */}
        <div className="col-span-12 lg:col-span-8 space-y-lg">
          <CSRActivities activities={csrActivities} />
          <ChallengeDashboard challenges={activeChallenges} />
        </div>

        {/* Right Column: Leaderboard & Heatmap */}
        <div className="col-span-12 lg:col-span-4 space-y-lg">
          <SocialLeaderboard leaderboard={leaderboard} />
          <ActivityPulseHeatmap />
        </div>

        {/* Footer Section: Employee Recognition Cards */}
        <CommunitySpotlight employees={spotlight} />
      </div>

      {/* Contextual FAB for Social */}
      <button className="fixed bottom-xl right-xl w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-50">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
