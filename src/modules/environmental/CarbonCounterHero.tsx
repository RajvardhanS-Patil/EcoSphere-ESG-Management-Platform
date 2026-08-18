import React, { useState } from "react";
import { Cloud, Calculator, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useEnvironmentalStore } from "@/stores/environmentalStore";
import { useMasterDataStore } from "@/stores/masterDataStore";

interface CarbonCounterProps {
  total: string;
  unit: string;
  description: string;
}

export function CarbonCounterHero({ total, unit, description }: CarbonCounterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addCarbonTransaction = useEnvironmentalStore(state => state.addCarbonTransaction);
  const departments = useMasterDataStore(state => state.departments);
  const emissionFactors = useMasterDataStore(state => state.emissionFactors);

  const [departmentId, setDepartmentId] = useState("d1");
  const [emissionFactorId, setEmissionFactorId] = useState("ef1");
  const [source, setSource] = useState<"Manufacturing" | "Fleet" | "Purchase" | "Expense">("Manufacturing");
  const [qty, setQty] = useState("");

  const selectedFactor = emissionFactors.find(f => f.id === emissionFactorId) || emissionFactors[0];
  const parsedQty = parseFloat(qty) || 0;
  const calculatedKg = parsedQty * (selectedFactor?.co2ePerUnit || 0);
  const calculatedTonnes = (calculatedKg / 1000).toFixed(2);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qty || parsedQty <= 0) return;
    
    addCarbonTransaction({
      date: new Date().toISOString().split('T')[0],
      departmentId,
      emissionFactorId,
      quantity: parsedQty,
      source
    });
    
    setIsModalOpen(false);
    setQty("");
    toast.success("Emissions Calculated & Logged", { 
      description: `${parsedQty.toLocaleString()} ${selectedFactor?.unit || 'units'} logged (${calculatedKg.toFixed(1)} kg CO2e). ESG score updated!` 
    });
  };

  return (
    <div className="lg:col-span-2">
      <div className="w-full relative overflow-hidden rounded-2xl bg-primary-container p-2xl text-on-primary shadow-lg flex flex-col justify-center min-h-[320px]">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          {/* Background graphic can go here */}
        </div>
        <div className="relative z-10 space-y-md">
          <div className="flex items-center gap-sm">
            <Cloud className="text-secondary-fixed w-6 h-6" />
            <span className="font-label-md uppercase tracking-widest text-secondary-fixed">Real-time Carbon Footprint</span>
          </div>
          <div className="flex items-baseline gap-md">
            <h3 className="font-display-lg text-display-lg font-bold">{total}</h3>
            <span className="font-headline-md text-primary-fixed-dim">{unit}</span>
          </div>
          <p className="font-body-lg text-primary-fixed-dim max-w-md">{description}</p>
          <div className="pt-lg">
            <button onClick={() => setIsModalOpen(true)} className="px-xl py-md bg-secondary-fixed text-on-secondary-fixed rounded-xl font-bold flex items-center gap-md hover:opacity-90 transition-all active:scale-95 shadow-md">
              <Calculator className="w-5 h-5" />
              Emission Calculator
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl w-[90vw] sm:w-[460px] min-w-[300px] shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden text-on-surface">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-md font-bold text-primary flex items-center gap-2">
                <Calculator className="w-5 h-5" /> Quick Carbon Calculator
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCalculate} className="p-lg space-y-md">
              <div className="space-y-sm">
                <label className="text-label-md font-medium text-on-surface-variant">Department / Facility</label>
                <select 
                  value={departmentId} 
                  onChange={e => setDepartmentId(e.target.value)} 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="space-y-sm">
                  <label className="text-label-md font-medium text-on-surface-variant">Activity / Emission Factor</label>
                  <select 
                    value={emissionFactorId} 
                    onChange={e => setEmissionFactorId(e.target.value)} 
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    {emissionFactors.map(ef => (
                      <option key={ef.id} value={ef.id}>{ef.name} ({ef.unit})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-sm">
                  <label className="text-label-md font-medium text-on-surface-variant">Source Type</label>
                  <select 
                    value={source} 
                    onChange={e => setSource(e.target.value as any)} 
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Fleet">Fleet</option>
                    <option value="Purchase">Purchase</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>
              </div>

              <div className="space-y-sm">
                <label className="text-label-md font-medium text-on-surface-variant">
                  Quantity ({selectedFactor?.unit || "units"})
                </label>
                <input 
                  value={qty} 
                  onChange={e => setQty(e.target.value)} 
                  type="number" 
                  min="0"
                  step="any"
                  placeholder={`Enter quantity in ${selectedFactor?.unit || "units"}`} 
                  required 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" 
                />
              </div>

              {/* Dynamic live calculation box */}
              {parsedQty > 0 && (
                <div className="p-md bg-secondary-container/20 border border-secondary/30 rounded-xl flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-secondary font-medium">
                    <Sparkles className="w-4 h-4" />
                    <span>Predicted Impact:</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-on-surface text-base">{calculatedKg.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg CO2e</span>
                    <span className="text-xs text-on-surface-variant ml-1">({calculatedTonnes} tCO2e)</span>
                  </div>
                </div>
              )}

              <div className="pt-sm flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-primary font-medium hover:bg-surface-container-high transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold shadow-md hover:opacity-90 active:scale-95 transition-all">Log Emissions</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
