export const reportsMockData = {
  globalScore: {
    score: 88,
    trend: "+4.2% from LY",
    industryAvg: 64,
    percentile: "Top 5%"
  },
  environmentalPreview: {
    co2: { value: "12.4t", trend: "+1.2%", trendColor: "text-error" },
    renewable: { value: "68%", trend: "+12%", trendColor: "text-secondary" },
    water: { value: "4.2k", trend: "-0.8%", trendColor: "text-secondary" }
  },
  socialDisclosure: [
    { title: "Diversity & Inclusion Report", icon: "diversity_3" },
    { title: "Employee Safety Metrics", icon: "health_and_safety" }
  ],
  governanceAudit: {
    boardIndep: "82%",
    ethicsAudit: "PASSED",
    lastAudit: "Oct 2023 by KPMG"
  },
  rawMetrics: [
    { id: "GHG-001", name: "Scope 1 Emissions", entity: "Munich Facility", value: "1,240 tCO2e", trend: "trending_up", trendColor: "text-error", status: "Verified", statusColor: "bg-secondary/10 text-secondary border-secondary/20" },
    { id: "WTR-012", name: "Water Withdrawal", entity: "Dublin Data Ctr", value: "480,000 m³", trend: "trending_down", trendColor: "text-secondary", status: "Verified", statusColor: "bg-secondary/10 text-secondary border-secondary/20" },
    { id: "DIV-045", name: "Executive Gender Pay Gap", entity: "Global HQ", value: "-1.4%", trend: "trending_flat", trendColor: "text-secondary", status: "Reviewing", statusColor: "bg-tertiary-container/10 text-tertiary border-tertiary/20" },
    { id: "EN-RE-09", name: "Renewable Purchase", entity: "Texas Wind Farm", value: "12,500 MWh", trend: "trending_up", trendColor: "text-secondary", status: "Verified", statusColor: "bg-secondary/10 text-secondary border-secondary/20" }
  ]
};
