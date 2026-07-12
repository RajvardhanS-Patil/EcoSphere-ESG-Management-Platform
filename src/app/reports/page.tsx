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
import { Plus } from "lucide-react";

export default function ReportsAnalyticsPage() {
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
    co2: { value: `${totalEmissions}t`, trend: "-5.0%", trendColor: "text-secondary" },
    renewable: { value: "65%", trend: "+2.0%", trendColor: "text-secondary" },
    water: { value: "3.2k", trend: "0.0%", trendColor: "text-on-surface-variant" }
  };

  const socialDisclosure = [
    { title: `Total CSR Participants: ${participations.length}`, icon: "diversity_3" },
    { title: `Total Community Hours: ${participations.reduce((acc, p) => acc + p.pointsEarned, 0)}`, icon: "health_and_safety" }
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
      <ReportsHeader />

      <div className="grid grid-cols-12 gap-lg mb-xl">
        <GlobalScoreCard data={globalScore} />
        <EnvironmentalPreview data={environmentalPreview} />
        <SocialDisclosure data={socialDisclosure} />
        <GovernanceAudit data={governanceAudit} />
      </div>

      <CustomReportBuilder />

      <RawMetricsTable metrics={rawMetrics} />

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
