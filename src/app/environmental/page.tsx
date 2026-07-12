"use client";


import { CarbonCounterHero } from "@/modules/environmental/CarbonCounterHero";
import { ActiveGoals } from "@/modules/environmental/ActiveGoals";
import { CarbonTrends } from "@/modules/environmental/CarbonTrends";
import { EmissionFactors } from "@/modules/environmental/EmissionFactors";
import { DepartmentEmissions } from "@/modules/environmental/DepartmentEmissions";
import { UpcomingAudits } from "@/modules/environmental/UpcomingAudits";
import { useEnvironmentalStore } from "@/stores/environmentalStore";
import { useMasterDataStore } from "@/stores/masterDataStore";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function EnvironmentalTrackingPage() {
  const carbonTransactions = useEnvironmentalStore(state => state.carbonTransactions);
  const addCarbonTransaction = useEnvironmentalStore(state => state.addCarbonTransaction);
  const emissionFactors = useMasterDataStore(state => state.emissionFactors);
  const departments = useMasterDataStore(state => state.departments);

  // Derived state for the CarbonCounterHero
  const totalEmissions = carbonTransactions.reduce((acc, curr) => acc + curr.calculatedCO2e, 0);
  const carbonCounter = {
    total: totalEmissions.toString(),
    unit: "kg CO2e",
    description: "On track to meet Q4 reduction targets",
  };

  const activeGoals = [
    { label: "Reduce Scope 1", progress: 65, color: "text-primary", offset: 120 },
    { label: "Transition to Renewables", progress: 40, color: "text-secondary", offset: 180 },
  ];
  const departmentEmissions = departments.map(d => {
    const deptEmissions = carbonTransactions
      .filter(tx => tx.departmentId === d.id)
      .reduce((sum, tx) => sum + tx.calculatedCO2e, 0);
    return {
      name: d.name,
      icon: "corporate_fare",
      scope1: deptEmissions.toString(),
      scope2: "0", // Mocked
      status: "Compliant",
      statusColor: "bg-secondary-fixed/30 text-on-secondary-container border-secondary-container/50",
      targetVar: "-1.2%",
      targetColor: "text-secondary"
    };
  });

  const handleAddTransaction = () => {
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const qty = Math.floor(Math.random() * 500) + 100;
    addCarbonTransaction({
      date: new Date().toISOString().split('T')[0],
      departmentId: dept.id,
      emissionFactorId: emissionFactors[0].id,
      quantity: qty,
      source: 'Manufacturing'
    });
    toast.success('Carbon Transaction Added', {
      description: `${qty} ${emissionFactors[0].unit} recorded for ${dept.name}`,
    });
  };

  return (
    <div className="space-y-2xl pb-24 relative">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <CarbonCounterHero {...carbonCounter} />
        <ActiveGoals goals={activeGoals} />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-lg">
        <CarbonTrends />
        <EmissionFactors factors={emissionFactors.map(f => ({ name: f.name, category: "Energy", factor: f.co2ePerUnit, unit: f.unit, source: "EPA 2024", confidence: "High", confidenceColor: "text-primary bg-primary/10" }))} />
      </section>

      <DepartmentEmissions emissions={departmentEmissions} />

      <UpcomingAudits />

      {/* Floating Action Button to add transaction */}
      <button 
        onClick={handleAddTransaction}
        className="fixed bottom-xl right-xl w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group z-50">
        <Plus className="w-7 h-7" />
        <span className="absolute right-16 bg-surface-container-highest text-on-surface-variant text-label-md px-md py-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
          Simulate Transaction
        </span>
      </button>
    </div>
  );
}
