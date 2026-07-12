"use client";

import { KPICard } from "@/components/shared/KPICard";
import { 
  BarChart3, 
  CloudRain, 
  Users, 
  CheckSquare,
  TrendingUp,
  ArrowDown,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { CarbonEmissionOverview } from "@/modules/dashboard/CarbonEmissionOverview";
import { DepartmentRankings } from "@/modules/dashboard/DepartmentRankings";
import { ComplianceAlerts } from "@/modules/dashboard/ComplianceAlerts";
import { InternalLeaderboard } from "@/modules/dashboard/InternalLeaderboard";
import { RecentActivities } from "@/modules/dashboard/RecentActivities";
import { RecentNotifications } from "@/modules/dashboard/RecentNotifications";
import { QuickActions } from "@/modules/dashboard/QuickActions";
import { useScoreStore } from "@/stores/scoreStore";
import { useEnvironmentalStore } from "@/stores/environmentalStore";
import { useGovernanceStore } from "@/stores/governanceStore";
import { useSocialGamificationStore } from "@/stores/socialGamificationStore";
import { useNotificationStore } from "@/stores/notificationStore";

export default function ExecutiveDashboard() {
  const getOverallScore = useScoreStore(state => state.getOverallScore);
  const getDepartmentScores = useScoreStore(state => state.getDepartmentScores);
  const carbonTransactions = useEnvironmentalStore(state => state.carbonTransactions);
  const complianceIssues = useGovernanceStore(state => state.complianceIssues);
  const employees = useSocialGamificationStore(state => state.employees);
  const notifications = useNotificationStore(state => state.notifications);
  
  const overallScore = getOverallScore();
  const totalEmissions = carbonTransactions.reduce((acc, curr) => acc + curr.calculatedCO2e, 0);

  // Simplified KPI mock calculations
  const kpis = {
    esgScore: { value: overallScore, unit: "/100", trend: "Live Calculation", trendUp: true },
    carbonFootprint: { value: totalEmissions, unit: "kg CO2e", trend: "Live Calculation", trendUp: true },
    socialImpact: { value: 92, unit: "index", trend: "Live Calculation", trendUp: true },
    governance: { value: 100, unit: "%", trend: "Live Calculation", trendUp: true },
  };

  const departmentPerformance = getDepartmentScores().map(ds => ({
    name: ds.departmentId, // Mock mapping, real app would lookup name
    score: ds.totalScore,
    color: ds.totalScore > 80 ? "bg-primary" : "bg-error"
  }));

  const complianceAlerts = complianceIssues
    .filter(i => i.status !== 'Resolved')
    .map(i => ({
      type: "ALERT",
      description: i.description,
      colorClass: i.severity === 'High' ? "text-error" : "text-secondary-fixed"
    }));

  const leaderboard = [...employees]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 3)
    .map((e, idx) => ({
      id: idx,
      name: e.name,
      role: "Employee",
      points: e.xp,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRwjBk5Bbr4DBCsJ7y8PAVNaSTH21jfFi3hnE1eEnJh3fQg9oZALPW469mGigw9ZCMRqH3MczxmRyT6pMZt_N14dTSovbTftlVmSPdRZfscuV6JmvSJXyXEeVTgrIj2x7EU1hDAFwGoTmOMH4dEhI1fgvg9Q2LhHmpeyonfEiYCSiDWmH1OpC4_7qvoyIA8T9wRdeJ0aHI6LHXOMrbq8tWKgeCG9wtqPd-_3tBVbJgIQbxaVmGWT4m026Ir3_w7YZB6uxlLYpGSzff"
    }));

  const recentActivities = carbonTransactions.slice(-3).map(tx => ({
    title: "Carbon Transaction",
    description: `Added ${tx.quantity} units from ${tx.source}`,
    time: tx.date,
    colorClass: "bg-primary"
  }));

  const mappedNotifications = notifications.slice(0, 3).map(n => ({
    title: n.title,
    description: n.message,
    time: "Just now",
    type: "alert",
    colorClass: n.type === 'error' ? "text-error bg-error/20" : "text-primary bg-primary-container/20"
  }));

  return (
    <div className="space-y-gutter pb-12">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
        <KPICard
          title="ESG Score"
          icon={<BarChart3 className="w-5 h-5" />}
          value={kpis.esgScore.value.toString()}
          unit={kpis.esgScore.unit}
          trend={
            <>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{kpis.esgScore.trend}</span>
            </>
          }
          trendUp={kpis.esgScore.trendUp}
          colorClass="primary"
        />
        <KPICard
          title="Carbon Footprint"
          icon={<CloudRain className="w-5 h-5" />}
          value={kpis.carbonFootprint.value.toString()}
          unit={kpis.carbonFootprint.unit}
          trend={
            <>
              <ArrowDown className="w-4 h-4 mr-1" />
              <span>{kpis.carbonFootprint.trend}</span>
            </>
          }
          trendUp={kpis.carbonFootprint.trendUp}
          colorClass="secondary"
        />
        <KPICard
          title="Social Impact"
          icon={<Users className="w-5 h-5" />}
          value={kpis.socialImpact.value.toString()}
          unit={kpis.socialImpact.unit}
          trend={
            <>
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>{kpis.socialImpact.trend}</span>
            </>
          }
          trendUp={kpis.socialImpact.trendUp}
          colorClass="tertiary"
        />
        <KPICard
          title="Governance"
          icon={<CheckSquare className="w-5 h-5" />}
          value={kpis.governance.value.toString()}
          unit={kpis.governance.unit}
          trend={
            <>
              <ShieldCheck className="w-4 h-4 mr-1" />
              <span>{kpis.governance.trend}</span>
            </>
          }
          trendUp={kpis.governance.trendUp}
          colorClass="error"
        />
      </div>

      {/* Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 space-y-gutter">
          <CarbonEmissionOverview />
          <DepartmentRankings departments={departmentPerformance} />
        </div>
        <div className="space-y-gutter">
          <ComplianceAlerts alerts={complianceAlerts} />
          <InternalLeaderboard leaderboard={leaderboard} />
          <RecentActivities activities={recentActivities} />
        </div>
      </div>

      {/* Bottom Section: Quick Actions & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <RecentNotifications notifications={mappedNotifications} />
        <QuickActions />
      </div>
    </div>
  );
}
