export const aiMockData = {
  history: [
    { title: "Scope 3 Emissions Q3 Analysis", time: "Updated 2h ago", active: true },
    { title: "Gender Pay Gap Report Review", time: "Updated yesterday", active: false },
    { title: "Supply Chain Audit Recommendations", time: "Updated 3d ago", active: false },
    { title: "GRI Standards Compliance Checklist", time: "Updated Oct 12", active: false },
    { title: "Net-Zero Roadmap 2030", time: "Updated Oct 5", active: false },
  ],
  chat: {
    suggestedPrompts: [
      "Executive ESG Summary",
      "Analyze Carbon Trends",
      "Department Risk Analysis",
      "Sustainability Recommendations"
    ],
    messages: [
      { sender: "ai", text: "Hello! I've analyzed your latest sustainability datasets across all departments. Your overall ESG score is trending positively this quarter. How can I assist with your ESG goals today?" },
      { sender: "user", text: "Can you compare our carbon intensity with the 2023 industry benchmark?" },
      { sender: "ai", text: "Based on your current data, GreenTech Solutions' carbon intensity is 12.2 kg CO2e per unit of revenue, which is 18% below the 2023 industry average of 14.9 kg CO2e. Your Operations & Logistics department is the largest contributor at 55% of total emissions, but has shown a 12% reduction quarter-over-quarter due to the fleet electrification initiative. I recommend focusing Scope 2 reduction efforts on the Sales & Marketing department, which currently has the highest intensity per employee." }
    ],
    promptResponses: {
      "Executive ESG Summary": "📊 **Executive ESG Summary — Q4 2024**\n\nYour organization's ESG performance remains strong with an overall composite score trending upward.\n\n**Environmental (40% weight):** Total carbon footprint is approximately 12.2k kg CO2e across 8 tracked transactions. Operations & Logistics contributes 55% of emissions. The fleet electrification program has delivered a 12% reduction this quarter.\n\n**Social (30% weight):** 67% of CSR participations are approved, with 6 active employees earning a combined 7,400 XP. Sarah Jenkins leads with 2,450 XP and has unlocked the Carbon Champion badge.\n\n**Governance (30% weight):** 3 of 4 compliance issues are actively being addressed. One high-severity data privacy gap in Sector 7 requires immediate attention. Policy acknowledgement rates are at 50% — follow-up reminders recommended for 3 pending employees.\n\n**Key Recommendation:** Prioritize resolving the 2 high-severity compliance issues before the Annual Social Governance Audit concludes on Nov 15.",
      "Analyze Carbon Trends": "📈 **Carbon Emission Trend Analysis**\n\nAnalyzing 8 transactions from Oct 1 to Nov 12, 2024:\n\n• **Total Emissions:** 12,206 kg CO2e\n• **Highest Source:** Manufacturing (6,435 kg CO2e — 53%)\n• **Fastest Growing:** Fleet operations showing 2 transactions totaling 2,064 kg CO2e\n• **Most Efficient Dept:** R&D with only 1,200 kg CO2e despite 2 transactions\n\n**Month-over-Month Trend:**\n- October: 9,119 kg CO2e (6 transactions)\n- November: 3,088 kg CO2e (2 transactions, partial month)\n- Projected November: ~6,176 kg CO2e (32% reduction trajectory)\n\n**Recommendation:** The Electricity - Grid factor (0.45 kg/kWh) accounts for the majority of emissions. Transitioning Operations to renewable energy contracts could reduce total footprint by an estimated 35%.",
      "Department Risk Analysis": "⚠️ **Department ESG Risk Analysis**\n\n**Operations & Logistics (HIGH RISK)**\n- Highest carbon emitter: 6,918 kg CO2e\n- Active compliance issue: Data Privacy Gap (High severity)\n- Mitigation: Accelerate fleet electrification; resolve data encryption by Nov 15\n\n**Supply Chain (MEDIUM RISK)**\n- 2 fleet-related transactions totaling 2,064 kg CO2e\n- Supplier ESG audit overdue for 3 Tier 2 suppliers\n- Mitigation: Schedule emergency supplier re-certification\n\n**R&D (LOW RISK)**\n- Water recycling sensor anomaly detected at Site-B\n- Minimal carbon footprint (1,200 kg CO2e)\n- Mitigation: Recalibrate sensors; independent verification by Nov 14\n\n**Sales & Marketing (MODERATE RISK)**\n- 2,025 kg CO2e from energy purchases\n- No active compliance issues\n- Mitigation: Transition to renewable energy provider",
      "Sustainability Recommendations": "🌱 **Top 5 Sustainability Recommendations**\n\n1. **Resolve High-Severity Compliance Issues** (Priority: CRITICAL)\n   - Data Privacy Gap in Sector 7 and Water Recycling anomaly at Site-B need resolution before the ongoing audit concludes.\n\n2. **Accelerate Renewable Energy Transition** (Impact: HIGH)\n   - Operations consumes 8,200+ kWh of grid electricity monthly. Switching to a renewable PPA could cut Scope 2 emissions by 35%.\n\n3. **Expand Gamification Program** (Impact: MEDIUM)\n   - Only 3 of 6 employees have pending CSR participations. Launch a company-wide challenge to boost engagement to 90%+ participation.\n\n4. **Complete Policy Acknowledgements** (Impact: MEDIUM)\n   - 3 employees have pending policy acknowledgements. Send automated reminders to achieve 100% compliance before quarter-end.\n\n5. **Supplier ESG Re-certification** (Impact: HIGH)\n   - 3 Tier 2 suppliers are overdue for ESG certification renewal. Non-compliance could impact your Governance score by up to 15 points."
    }
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
