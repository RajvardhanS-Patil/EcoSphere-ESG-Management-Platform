export const environmentalMockData = {
  carbonCounter: {
    total: "24,852.41",
    unit: "tCO2e",
    description: "Your enterprise emissions have decreased by 4.2% since last quarter. Continue tracking to meet your Net Zero targets."
  },
  activeGoals: [
    { label: "Renewable", progress: 75, color: "text-secondary", offset: 62.8 },
    { label: "Waste Redux", progress: 45, color: "text-primary", offset: 138.1 }
  ],
  emissionFactors: [
    { source: "Electricity (Grid)", unit: "kWh", factor: 0.412 },
    { source: "Natural Gas", unit: "m3", factor: 1.937 },
    { source: "Diesel Fuel", unit: "Litre", factor: 2.68 },
    { source: "Waste (Landfill)", unit: "Tonne", factor: 0.45 }
  ],
  departmentEmissions: [
    { 
      name: "Manufacturing", icon: "factory", 
      scope1: "12,450.2", scope2: "4,120.0", 
      status: "Compliant", statusColor: "bg-secondary-fixed/30 text-on-secondary-container border-secondary-container/50",
      targetVar: "-1.2%", targetColor: "text-secondary" 
    },
    { 
      name: "Logistics", icon: "local_shipping", 
      scope1: "8,210.5", scope2: "540.2", 
      status: "Critical", statusColor: "bg-error-container text-on-error-container border-error/20",
      targetVar: "+4.8%", targetColor: "text-error" 
    },
    { 
      name: "HQ Operations", icon: "corporate_fare", 
      scope1: "120.3", scope2: "1,820.4", 
      status: "Compliant", statusColor: "bg-secondary-fixed/30 text-on-secondary-container border-secondary-container/50",
      targetVar: "-8.4%", targetColor: "text-secondary" 
    }
  ]
};
