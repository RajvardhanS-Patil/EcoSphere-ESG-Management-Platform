import React from "react";

interface EnvData {
  co2: { value: string; trend: string; trendColor: string };
  renewable: { value: string; trend: string; trendColor: string };
  water: { value: string; trend: string; trendColor: string };
}

export function EnvironmentalPreview({ data }: { data: EnvData }) {
  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-2xl p-lg flex flex-col border border-outline-variant/30">
      <div className="flex justify-between items-start mb-lg">
        <div>
          <h4 className="font-headline-md text-headline-md text-primary">Environmental</h4>
          <p className="font-body-sm text-on-surface-variant">Carbon intensity, water waste, and renewable mix.</p>
        </div>
        <div className="px-md py-1 bg-secondary-container/30 text-on-secondary-container rounded-full font-label-sm">In Review</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {/* CO2 Emission */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-outline-variant/50">
          <span className="font-label-sm text-on-surface-variant">CO2 Emission</span>
          <p className="font-headline-md text-primary mt-xs">{data.co2.value} <span className={`${data.co2.trendColor} text-sm font-label-md`}>{data.co2.trend}</span></p>
          <div className="mt-md h-8 flex items-end gap-1">
            <div className="w-full bg-primary/20 h-2/3 rounded-t-sm"></div>
            <div className="w-full bg-primary/20 h-1/2 rounded-t-sm"></div>
            <div className="w-full bg-primary/20 h-3/4 rounded-t-sm"></div>
            <div className="w-full bg-primary h-5/6 rounded-t-sm"></div>
          </div>
        </div>
        {/* Renewable Energy */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-outline-variant/50">
          <span className="font-label-sm text-on-surface-variant">Renewable Energy</span>
          <p className="font-headline-md text-primary mt-xs">{data.renewable.value} <span className={`${data.renewable.trendColor} text-sm font-label-md`}>{data.renewable.trend}</span></p>
          <div className="mt-md h-8 flex items-end gap-1">
            <div className="w-full bg-secondary/20 h-1/2 rounded-t-sm"></div>
            <div className="w-full bg-secondary/20 h-2/3 rounded-t-sm"></div>
            <div className="w-full bg-secondary/20 h-5/6 rounded-t-sm"></div>
            <div className="w-full bg-secondary h-full rounded-t-sm"></div>
          </div>
        </div>
        {/* Water Waste */}
        <div className="p-md bg-surface-container-lowest rounded-xl border border-outline-variant/50">
          <span className="font-label-sm text-on-surface-variant">Water Waste</span>
          <p className="font-headline-md text-primary mt-xs">{data.water.value} <span className={`${data.water.trendColor} text-sm font-label-md`}>{data.water.trend}</span></p>
          <div className="mt-md h-8 flex items-end gap-1">
            <div className="w-full bg-primary/20 h-full rounded-t-sm"></div>
            <div className="w-full bg-primary/20 h-3/4 rounded-t-sm"></div>
            <div className="w-full bg-primary h-2/3 rounded-t-sm"></div>
            <div className="w-full bg-primary/20 h-1/2 rounded-t-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
