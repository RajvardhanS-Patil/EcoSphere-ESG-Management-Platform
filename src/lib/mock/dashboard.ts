export const dashboardMockData = {
  kpis: {
    esgScore: { value: 84, unit: "/100", trend: "+4.2% from LY", trendUp: true },
    carbonFootprint: { value: "12.4k", unit: "tCO2e", trend: "12% reduction", trendUp: true },
    socialImpact: { value: 92, unit: "index", trend: "Top 5% sector", trendUp: true },
    governance: { value: 100, unit: "%", trend: "Audit passed", trendUp: true },
  },
  departmentPerformance: [
    { name: "Operations & Logistics", score: 94.8, color: "bg-primary" },
    { name: "Data Infrastructure", score: 88.2, color: "bg-primary" },
    { name: "Research & Development", score: 82.5, color: "bg-secondary" },
    { name: "Sales & Marketing", score: 76.0, color: "bg-outline-variant" },
  ],
  complianceAlerts: [
    { type: "DUE IN 2 DAYS", description: "BRSR Annual Disclosure renewal for APAC region.", colorClass: "text-secondary-fixed" },
    { type: "PENDING REVIEW", description: "Supply chain labor audit (Tier 2 Suppliers).", colorClass: "text-tertiary-fixed-dim" },
  ],
  leaderboard: [
    { id: 1, name: "Marcus Chen", role: "Logistics Manager", points: 2450, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRwjBk5Bbr4DBCsJ7y8PAVNaSTH21jfFi3hnE1eEnJh3fQg9oZALPW469mGigw9ZCMRqH3MczxmRyT6pMZt_N14dTSovbTftlVmSPdRZfscuV6JmvSJXyXEeVTgrIj2x7EU1hDAFwGoTmOMH4dEhI1fgvg9Q2LhHmpeyonfEiYCSiDWmH1OpC4_7qvoyIA8T9wRdeJ0aHI6LHXOMrbq8tWKgeCG9wtqPd-_3tBVbJgIQbxaVmGWT4m026Ir3_w7YZB6uxlLYpGSzff" },
    { id: 2, name: "Priya Sharma", role: "ESG Analyst", points: 2120, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8tcSYRZzmGhOcK65dlX7kvH3N306NnnsCHZOLWGmVITe9EHYze6ERHvcXIwhazouuX2RmQ8baj1OoBk7fX1ez2Qb0fZToRZT7-yqLfV0xQbH1Z-c8wpfsbbY-XteUHZx9rrIjAo2zBcaVPVqdvNiB0Y1xT7AGihee9cCHMDzsde8vyMFz6RQLCwnHIv6W5PioSlmGDb8KUHmVNYTt7cgq5g9oWb0H-r4-XuTPYUaQeS9dMltAaOBoja1NnhyaCNQiZVcJNqBj9rSS" },
    { id: 3, name: "David Okoro", role: "Operations Lead", points: 1980, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHpTCQsHfFp5mNw25WbWszEM-Njsrpg6R_vxzEQ7rvwgBiXt0PCneNFF7-DWMLwQ5OydxTNY8sZ-NoZ-ys-JGEGBrfegJbVyHSAiyzOribTKDSzd4J9z76Sap9ABU3DAb6N_41w6CNyXd81DjYzE6WEN_8YvkQsS7EaayZnqacmdnmMn8Be0oezETbdTUKg7H7l3Y4UNtTEmoxQge3OEHChRkMRby5fs6O0r3LwrsQBQoQE-q_KaFboL3Gc1JcttwuIOfpQZRgalED" }
  ],
  recentActivities: [
    { title: "New Carbon Offset Purchased", description: "2,500 units from Amazon Reforestation Project.", time: "2 hours ago", colorClass: "bg-primary" },
    { title: "Audit Completed", description: "Q3 Sustainability audit for EMEA sites passed.", time: "6 hours ago", colorClass: "bg-secondary" },
    { title: "Metric Updated", description: "Waste diversion rate improved to 68%.", time: "Yesterday", colorClass: "bg-tertiary" },
  ],
  notifications: [
    { title: "Monthly Impact Summary available", description: "Download the detailed report for September.", time: "10m", type: "report", colorClass: "text-primary bg-primary-container/20" },
    { title: "Company Goal Milestone Reached", description: "80% of office spaces now powered by renewables.", time: "1h", type: "milestone", colorClass: "text-secondary bg-secondary-container/20" },
  ]
};
