export const aiMockData = {
  history: [
    { title: "Scope 3 Emissions Q3 Analysis", time: "Updated 2h ago", active: true },
    { title: "Gender Pay Gap Report Review", time: "Updated yesterday", active: false },
    { title: "Supply Chain Audit Recommendations", time: "Updated 3d ago", active: false },
    { title: "GRI Standards Compliance Checklist", time: "Updated Oct 12", active: false }
  ],
  chat: {
    suggestedPrompts: [
      "Draft CSR Report",
      "Analyze Carbon Trends",
      "Social Risk Assessment",
      "Board Prep Presentation"
    ],
    messages: [
      { sender: "ai", text: "Hello! I've analyzed your latest sustainability datasets. How can I assist with your ESG goals today?" },
      { sender: "user", text: "Can you compare our carbon intensity with the 2023 industry benchmark?" }
    ]
  },
  insights: {
    recommendation: {
      title: "Update Scope 2 emissions for the Berlin plant. Recent data suggests a 4% variance from projections."
    },
    dataTrend: {
      trend: "-12.4% vs LY"
    },
    nextActions: [
      { title: "Export to CSV", subtitle: "Q3 Energy Matrix", icon: "table_chart" },
      { title: "Share Insight", subtitle: "Governance Committee", icon: "share" }
    ],
    storage: {
      used: "68%"
    }
  }
};
