"use client";

import { ReportsHeader } from "@/modules/reports/ReportsHeader";
import { GlobalScoreCard } from "@/modules/reports/GlobalScoreCard";
import { EnvironmentalPreview } from "@/modules/reports/EnvironmentalPreview";
import { SocialDisclosure } from "@/modules/reports/SocialDisclosure";
import { GovernanceAudit } from "@/modules/reports/GovernanceAudit";
import { RawMetricsTable } from "@/modules/reports/RawMetricsTable";
import { CustomReportBuilder } from "@/modules/reports/CustomReportBuilder";
import { useScoreStore } from "@/stores/scoreStore";
import { useEnvironmentalStore } from "@/stores/environmentalStore";
import { useSocialGamificationStore } from "@/stores/socialGamificationStore";
import { useGovernanceStore } from "@/stores/governanceStore";
import { Plus, BarChart4 } from "lucide-react";
import { useState } from "react";

export default function ReportsAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("Reports");
  const getOverallScore = useScoreStore(state => state.getOverallScore);
  const carbonTransactions = useEnvironmentalStore(state => state.carbonTransactions);
  const participations = useSocialGamificationStore(state => state.participations);
  const issues = useGovernanceStore(state => state.complianceIssues);

  const overallScore = getOverallScore();
  const totalEmissions = carbonTransactions.reduce((acc, curr) => acc + curr.calculatedCO2e, 0);

  const globalScore = {
    score: overallScore,
    trend: "+2.5% from last month",
    industryAvg: 75,
    percentile: "Top 10%"
  };

  const environmentalPreview = {
    co2: { value: `${(totalEmissions / 1000).toFixed(1)}k`, trend: "-5.0%", trendColor: "text-secondary" },
    renewable: { value: "40%", trend: "+2.0%", trendColor: "text-secondary" },
    water: { value: "3.2k", trend: "0.0%", trendColor: "text-on-surface-variant" }
  };

  const socialDisclosure = [
    { title: `Total CSR Participants: ${participations.length}`, icon: "diversity_3" },
    { title: `Total CSR Points Awarded: ${participations.reduce((acc, p) => acc + p.pointsEarned, 0)}`, icon: "health_and_safety" }
  ];

  const governanceAudit = {
    boardIndep: "90%",
    ethicsAudit: issues.filter(i => i.status !== 'Resolved').length > 0 ? "REVIEW" : "PASSED",
    lastAudit: "System auto-generated"
  };

  const rawMetrics = carbonTransactions.map(tx => ({
    id: tx.id,
    name: `Carbon Transaction (${tx.source})`,
    entity: "Operations",
    value: `${tx.calculatedCO2e} kg CO2e`,
    trend: "trending_up",
    trendColor: "text-error",
    status: "Verified",
    statusColor: "bg-secondary/10 text-secondary border-secondary/20"
  }));

  return (
    <div className="space-y-lg pb-24 relative">
      <ReportsHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'Reports' ? (
        <>
          <div className="grid grid-cols-12 gap-lg mb-xl">
            <GlobalScoreCard data={globalScore} />
            <EnvironmentalPreview data={environmentalPreview} />
            <SocialDisclosure data={socialDisclosure} />
            <GovernanceAudit data={governanceAudit} />
          </div>

          <CustomReportBuilder />

          <RawMetricsTable metrics={rawMetrics} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-surface rounded-2xl border border-outline-variant shadow-sm min-h-[500px]">
          <div className="p-4 bg-primary-container/20 rounded-full mb-4">
            <BarChart4 className="w-12 h-12 text-primary" />
          </div>
          <h3 className="font-headline-lg font-bold text-on-surface mb-2">Advanced Analytics Suite</h3>
          <p className="text-on-surface-variant max-w-md text-center">
            The cross-module analytics suite provides deep dive visualizations, trend forecasting, and predictive modeling for your ESG performance.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-2 bg-primary text-on-primary rounded-xl font-bold shadow-md">Connect PowerBI</button>
            <button className="px-6 py-2 bg-surface-container-high text-on-surface rounded-xl font-bold">Generate AI Insights</button>
          </div>
        </div>
      )}

      <div className="mt-2xl flex flex-col md:flex-row justify-between items-center border-t border-outline-variant pt-lg text-on-surface-variant mb-xl">
        <div className="flex items-center gap-md mb-md md:mb-0">
          <span className="font-label-sm">Reporting Standards:</span>
          <span className="font-label-md text-primary font-bold">GRI</span>
          <span className="font-label-md text-primary font-bold">SASB</span>
          <span className="font-label-md text-primary font-bold">TCFD</span>
        </div>
        <div className="font-body-sm">
          © 2024 EcoSphere ESG Enterprise. All data encrypted and audit-logged.
        </div>
      </div>

      <button className="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
