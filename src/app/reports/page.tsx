import { reportsMockData } from "@/lib/mock/reports";
import { ReportsHeader } from "@/modules/reports/ReportsHeader";
import { GlobalScoreCard } from "@/modules/reports/GlobalScoreCard";
import { EnvironmentalPreview } from "@/modules/reports/EnvironmentalPreview";
import { SocialDisclosure } from "@/modules/reports/SocialDisclosure";
import { GovernanceAudit } from "@/modules/reports/GovernanceAudit";
import { RawMetricsTable } from "@/modules/reports/RawMetricsTable";
import { Plus } from "lucide-react";

export default function ReportsAnalyticsPage() {
  const { globalScore, environmentalPreview, socialDisclosure, governanceAudit, rawMetrics } = reportsMockData;

  return (
    <div className="space-y-lg pb-24">
      {/* HEADER SECTION */}
      <ReportsHeader />

      {/* SUMMARY BENTO GRID */}
      <div className="grid grid-cols-12 gap-lg mb-xl">
        {/* MAIN SCORE CARD */}
        <GlobalScoreCard data={globalScore} />

        {/* ENVIRONMENTAL PREVIEW */}
        <EnvironmentalPreview data={environmentalPreview} />

        {/* SOCIAL & GOVERNANCE SUB-GRID */}
        <SocialDisclosure data={socialDisclosure} />
        <GovernanceAudit data={governanceAudit} />
      </div>

      {/* RAW METRICS DATA TABLE */}
      <RawMetricsTable metrics={rawMetrics} />

      {/* FOOTER INFO */}
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

      {/* FLOATING ACTION BUTTON */}
      <button className="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
