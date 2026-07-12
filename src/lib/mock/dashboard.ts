export const dashboardMockData = {
  kpis: {
    esgScore: { value: 84, unit: "/100", trend: "+4.2% from LY", trendUp: true },
    carbonFootprint: { value: "12.4k", unit: "tCO2e", trend: "12% reduction", trendUp: true },
    socialImpact: { value: 92, unit: "index", trend: "Top 5% sector", trendUp: true },
    governance: { value: 100, unit: "%", trend: "SEBI Compliant", trendUp: true },
  },
  departmentPerformance: [
    { name: "Manufacturing", score: 94.8, color: "bg-primary" },
    { name: "Operations", score: 88.2, color: "bg-primary" },
    { name: "Sustainability", score: 82.5, color: "bg-secondary" },
    { name: "Procurement", score: 76.0, color: "bg-outline-variant" },
  ],
  complianceAlerts: [
    { type: "DUE IN 2 DAYS", description: "BRSR Annual Disclosure renewal for SEBI filing.", colorClass: "text-secondary-fixed" },
    { type: "PENDING REVIEW", description: "Tier 2 supplier ESG audit — Maharashtra vendors.", colorClass: "text-tertiary-fixed-dim" },
  ],
  leaderboard: [
    { id: 1, name: "Raj Patil", role: "Corporate Affairs Head", points: 3200, avatar: "" },
    { id: 2, name: "Priya Sharma", role: "Manufacturing Lead", points: 2450, avatar: "" },
    { id: 3, name: "Aarav Mehta", role: "Procurement Manager", points: 1800, avatar: "" }
  ],
  recentActivities: [
    { title: "Solar PPA Contract Signed", description: "50 MW renewable energy agreement with Tata Power Solar.", time: "2 hours ago", colorClass: "bg-primary" },
    { title: "BRSR Audit Completed", description: "Q3 Sustainability audit for Pune & Nashik sites passed.", time: "6 hours ago", colorClass: "bg-secondary" },
    { title: "Waste Diversion Rate Updated", description: "Improved to 68% across all manufacturing sites.", time: "Yesterday", colorClass: "bg-tertiary" },
  ],
  notifications: [
    { title: "Monthly Impact Summary available", description: "Download the detailed BRSR report for October.", time: "10m", type: "report", colorClass: "text-primary bg-primary-container/20" },
    { title: "Company Goal Milestone Reached", description: "80% of office spaces now powered by renewables.", time: "1h", type: "milestone", colorClass: "text-secondary bg-secondary-container/20" },
  ]
};
