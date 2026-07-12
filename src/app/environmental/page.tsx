import { environmentalMockData } from "@/lib/mock/environmental";
import { CarbonCounterHero } from "@/modules/environmental/CarbonCounterHero";
import { ActiveGoals } from "@/modules/environmental/ActiveGoals";
import { CarbonTrends } from "@/modules/environmental/CarbonTrends";
import { EmissionFactors } from "@/modules/environmental/EmissionFactors";
import { DepartmentEmissions } from "@/modules/environmental/DepartmentEmissions";
import { UpcomingAudits } from "@/modules/environmental/UpcomingAudits";

export default function EnvironmentalTrackingPage() {
  const { carbonCounter, activeGoals, emissionFactors, departmentEmissions } = environmentalMockData;

  return (
    <div className="space-y-2xl pb-12">
      {/* Hero Section: Carbon Counter */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <CarbonCounterHero {...carbonCounter} />
        <ActiveGoals goals={activeGoals} />
      </section>

      {/* Grid: Trends & Factors */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-lg">
        <CarbonTrends />
        <EmissionFactors factors={emissionFactors} />
      </section>

      {/* Detailed Table: Department Emissions */}
      <DepartmentEmissions emissions={departmentEmissions} />

      {/* Empty State: Upcoming Audits */}
      <UpcomingAudits />
    </div>
  );
}
