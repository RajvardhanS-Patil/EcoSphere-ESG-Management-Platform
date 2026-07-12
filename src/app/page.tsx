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
import { dashboardMockData } from "@/lib/mock/dashboard";
import { CarbonEmissionOverview } from "@/modules/dashboard/CarbonEmissionOverview";
import { DepartmentRankings } from "@/modules/dashboard/DepartmentRankings";
import { ComplianceAlerts } from "@/modules/dashboard/ComplianceAlerts";
import { InternalLeaderboard } from "@/modules/dashboard/InternalLeaderboard";
import { RecentActivities } from "@/modules/dashboard/RecentActivities";
import { RecentNotifications } from "@/modules/dashboard/RecentNotifications";
import { QuickActions } from "@/modules/dashboard/QuickActions";

export default function ExecutiveDashboard() {
  const { kpis, departmentPerformance, complianceAlerts, leaderboard, recentActivities, notifications } = dashboardMockData;

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
        <RecentNotifications notifications={notifications} />
        <QuickActions />
      </div>
    </div>
  );
}
