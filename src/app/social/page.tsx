"use client";

import { HeroStatsRow } from "@/modules/social/HeroStatsRow";
import { CSRActivities } from "@/modules/social/CSRActivities";
import { ChallengeDashboard } from "@/modules/social/ChallengeDashboard";
import { SocialLeaderboard } from "@/modules/social/SocialLeaderboard";
import { ActivityPulseHeatmap } from "@/modules/social/ActivityPulseHeatmap";
import { CommunitySpotlight } from "@/modules/social/CommunitySpotlight";
import { RewardsCatalog } from "@/modules/social/RewardsCatalog";
import { DiversityMetrics } from "@/modules/social/DiversityMetrics";
import { useSocialGamificationStore } from "@/stores/socialGamificationStore";
import { useMasterDataStore } from "@/stores/masterDataStore";
import { Plus } from "lucide-react";

export default function SocialCSRPage() {
  const employees = useSocialGamificationStore(state => state.employees);
  const csrActivities = useSocialGamificationStore(state => state.csrActivities);
  const participations = useSocialGamificationStore(state => state.participations);
  const redeemReward = useSocialGamificationStore(state => state.redeemReward);
  const rewards = useMasterDataStore(state => state.rewards);

  const totalPoints = participations.reduce((acc, curr) => acc + curr.pointsEarned, 0);
  const totalBadges = employees.reduce((acc, curr) => acc + curr.unlockedBadges.length, 0);
  const currentUser = employees.find(e => e.id === 'e1'); // Mock current user

  const heroStats = [
    { label: "Total XP Earned", value: totalPoints.toString(), icon: "local_fire_department", colorClass: "text-tertiary", bgClass: "bg-tertiary-container/20", trend: "+12% this month", trendIcon: "trending_up", textClass: "text-tertiary" },
    { label: "Badges Unlocked", value: totalBadges.toString(), icon: "workspace_premium", colorClass: "text-secondary", bgClass: "bg-secondary-container/20", trend: "Top 10%", trendIcon: "trending_up", textClass: "text-secondary" },
    { label: "CSR Events", value: csrActivities.length.toString(), icon: "diversity_3", colorClass: "text-primary", bgClass: "bg-primary-container/20", trend: "On track", trendIcon: "check_circle", textClass: "text-primary" }
  ];

  const activeChallenges = [
    { title: "Zero Waste Week", xp: 500, timeRemaining: "2 Days Left", progress: 80, badgeIcon: "recycling", description: "Reduce waste to zero.", reward: "Eco Badge", icon: "recycling", bgClass: "bg-secondary-container/30" },
    { title: "Public Transit Commute", xp: 300, timeRemaining: "5 Days Left", progress: 45, badgeIcon: "directions_bus", description: "Use public transport.", reward: "Transit Badge", icon: "directions_bus", bgClass: "bg-primary-container/30" },
    { title: "Energy Fast", xp: 1000, timeRemaining: "12 Days Left", progress: 20, badgeIcon: "bolt", description: "Save energy.", reward: "Bolt Badge", icon: "bolt", bgClass: "bg-tertiary-container/30" }
  ];

  const leaderboard = [...employees]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 5)
    .map((e, idx) => ({
      rank: idx + 1,
      name: e.name,
      points: e.xp,
      xp: `${e.xp} XP`,
      progress: Math.min(100, (e.xp / 2000) * 100),
      progressClass: "bg-primary",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRwjBk5Bbr4DBCsJ7y8PAVNaSTH21jfFi3hnE1eEnJh3fQg9oZALPW469mGigw9ZCMRqH3MczxmRyT6pMZt_N14dTSovbTftlVmSPdRZfscuV6JmvSJXyXEeVTgrIj2x7EU1hDAFwGoTmOMH4dEhI1fgvg9Q2LhHmpeyonfEiYCSiDWmH1OpC4_7qvoyIA8T9wRdeJ0aHI6LHXOMrbq8tWKgeCG9wtqPd-_3tBVbJgIQbxaVmGWT4m026Ir3_w7YZB6uxlLYpGSzff"
    }));

  const spotlight = employees.slice(0, 2).map(e => ({
    name: e.name,
    role: "Employee",
    achievement: `Unlocked ${e.unlockedBadges.length} Badges`,
    projects: e.unlockedBadges.length,
    impact: `${e.xp} XP Earned`,
    impactClass: "text-secondary",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRwjBk5Bbr4DBCsJ7y8PAVNaSTH21jfFi3hnE1eEnJh3fQg9oZALPW469mGigw9ZCMRqH3MczxmRyT6pMZt_N14dTSovbTftlVmSPdRZfscuV6JmvSJXyXEeVTgrIj2x7EU1hDAFwGoTmOMH4dEhI1fgvg9Q2LhHmpeyonfEiYCSiDWmH1OpC4_7qvoyIA8T9wRdeJ0aHI6LHXOMrbq8tWKgeCG9wtqPd-_3tBVbJgIQbxaVmGWT4m026Ir3_w7YZB6uxlLYpGSzff"
  }));

  const mappedCsrActivities = csrActivities.map(a => ({
    title: a.title,
    date: "Current",
    participants: 10,
    impact: `${a.xpReward} XP Reward`,
    description: "CSR Activity generated from master data.",
    progress: 50,
    progressClass: "bg-primary",
    category: "Community",
    categoryClass: "bg-primary-container text-primary",
    avatarGroup: [],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8tcSYRZzmGhOcK65dlX7kvH3N306NnnsCHZOLWGmVITe9EHYze6ERHvcXIwhazouuX2RmQ8baj1OoBk7fX1ez2Qb0fZToRZT7-yqLfV0xQbH1Z-c8wpfsbbY-XteUHZx9rrIjAo2zBcaVPVqdvNiB0Y1xT7AGihee9cCHMDzsde8vyMFz6RQLCwnHIv6W5PioSlmGDb8KUHmVNYTt7cgq5g9oWb0H-r4-XuTPYUaQeS9dMltAaOBoja1NnhyaCNQiZVcJNqBj9rSS"
  }));

  return (
    <div className="space-y-xl pb-24 relative">
      <HeroStatsRow stats={heroStats} />

      <div className="grid grid-cols-12 gap-lg">
        <div className="col-span-12 lg:col-span-8 space-y-lg">
          <CSRActivities activities={mappedCsrActivities} />
          <ChallengeDashboard challenges={activeChallenges} />
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-lg">
          <SocialLeaderboard leaderboard={leaderboard} />
          <ActivityPulseHeatmap />
        </div>

        <CommunitySpotlight employees={spotlight} />
        <DiversityMetrics />
        <RewardsCatalog rewards={rewards} userXp={currentUser?.xp || 0} onRedeem={(rewardId) => redeemReward('e1', rewardId)} />
      </div>

      <button className="fixed bottom-xl right-xl w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-50">
        <Plus className="w-6 h-6" />
        <span className="absolute right-16 bg-surface-container-highest text-on-surface-variant text-label-md px-md py-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
          Add Activity
        </span>
      </button>
    </div>
  );
}
