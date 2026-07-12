import React from "react";
import { Cloud, Calculator } from "lucide-react";

interface CarbonCounterProps {
  total: string;
  unit: string;
  description: string;
}

export function CarbonCounterHero({ total, unit, description }: CarbonCounterProps) {
  return (
    <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-primary-container p-2xl text-on-primary shadow-lg flex flex-col justify-center min-h-[320px]">
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
          <button className="px-xl py-md bg-secondary-fixed text-on-secondary-fixed rounded-xl font-bold flex items-center gap-md hover:opacity-90 transition-all active:scale-95 shadow-md">
            <Calculator className="w-5 h-5" />
            Emission Calculator
          </button>
        </div>
      </div>
    </div>
  );
}
