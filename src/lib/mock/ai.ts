export const aiMockData = {
  history: [
    { title: "BRSR Annual Disclosure Analysis", time: "Updated 2h ago", active: true },
    { title: "Scope 3 Emissions — Pune Plant", time: "Updated yesterday", active: false },
    { title: "Supply Chain Audit — Tier 2 Vendors", time: "Updated 3d ago", active: false },
    { title: "SEBI ESG Compliance Checklist", time: "Updated Oct 12", active: false },
    { title: "Net-Zero Roadmap 2030 — India Operations", time: "Updated Oct 5", active: false },
  ],
  chat: {
    suggestedPrompts: [
      "Executive ESG Summary",
      "Analyze Carbon Trends",
      "Department Risk Analysis",
      "Sustainability Recommendations"
    ],
    messages: [
      { sender: "ai", text: "Namaste! I've analyzed the latest sustainability data across all departments. Your BRSR compliance metrics are trending well this quarter. How can I assist with your ESG goals today?" },
      { sender: "user", text: "What is our current carbon intensity compared to the SEBI sector benchmark?" },
      { sender: "ai", text: "Based on current data, your carbon intensity is 12.2 kg CO2e per unit of revenue — 18% below the SEBI sector benchmark of 14.9 kg CO2e. Manufacturing is the largest contributor at 55% of total emissions, but has shown a 12% reduction QoQ due to the solar rooftop initiative at the Pune facility. I recommend focusing Scope 2 reduction on Procurement, which currently has the highest intensity per headcount." }
    ],
    promptResponses: {
      "Executive ESG Summary": "📊 **Executive ESG Summary — Q4 2024**\n\nYour organization's ESG performance remains strong with an overall composite score trending upward, aligned with SEBI BRSR disclosure requirements.\n\n**Environmental (40% weight):** Total carbon footprint is approximately 12.2k kg CO2e across 8 tracked transactions. Manufacturing contributes 55% of emissions. The solar rooftop program at the Pune facility has delivered a 12% reduction this quarter.\n\n**Social (30% weight):** 71% of CSR participations are approved, with 8 active employees earning a combined 12,100 XP. Raj Patil leads with 3,200 XP and has unlocked the Carbon Champion badge. The Narmada River Cleanup Drive is our most impactful CSR initiative.\n\n**Governance (30% weight):** 3 of 4 compliance issues are actively being addressed. One high-severity data privacy gap requires immediate attention before the SEBI audit deadline. Policy acknowledgement is at 50% — follow-up reminders recommended for pending employees.\n\n**Key Recommendation:** Prioritize resolving the 2 high-severity compliance issues and complete BRSR disclosures before the Q4 SEBI deadline.",
      "Analyze Carbon Trends": "📈 **Carbon Emission Trend Analysis — Indian Operations**\n\nAnalyzing 8 transactions from Oct 1 to Nov 12, 2024:\n\n• **Total Emissions:** 12,206 kg CO2e\n• **Highest Source:** Manufacturing at Pune Plant (6,435 kg CO2e — 53%)\n• **Fastest Growing:** Fleet operations across Mumbai-Pune corridor\n• **Most Efficient Dept:** Operations with only 1,200 kg CO2e\n\n**Month-over-Month Trend:**\n- October: 9,119 kg CO2e (6 transactions)\n- November: 3,088 kg CO2e (2 transactions, partial month)\n- Projected November: ~6,176 kg CO2e (32% reduction trajectory)\n\n**BRSR Alignment:** Current Scope 1+2 emissions are within the voluntary disclosure targets set for FY 2024-25.\n\n**Recommendation:** Transitioning the Pune facility to 100% renewable energy contracts (TATA Power Solar PPA) could reduce total footprint by an estimated 35%. The estimated annual savings would be ₹12.4 lakhs.",
      "Department Risk Analysis": "⚠️ **Department ESG Risk Analysis**\n\n**Manufacturing — Pune (HIGH RISK)**\n- Highest carbon emitter: 6,918 kg CO2e\n- Active compliance issue: Data Privacy Gap (High severity)\n- Employs 150 staff — largest department\n- Mitigation: Complete data encryption upgrade; accelerate solar PPA\n\n**Procurement (MEDIUM RISK)**\n- 2 fleet-related transactions totaling 2,064 kg CO2e\n- Supplier ESG audit overdue for 3 Tier 2 vendors in Maharashtra\n- Mitigation: Schedule emergency vendor re-certification per SEBI guidelines\n\n**Operations (LOW RISK)**\n- Water recycling sensor anomaly at Site-B, Nashik\n- Minimal carbon footprint (1,200 kg CO2e)\n- Mitigation: Sensor recalibration; CPCB verification by Nov 14\n\n**Sustainability (MINIMAL RISK)**\n- Leading by example with lowest emissions per headcount\n- All policies acknowledged\n- Strong CSR participation rate",
      "Sustainability Recommendations": "🌱 **Top 5 Sustainability Recommendations for Indian Operations**\n\n1. **Complete BRSR Disclosures** (Priority: CRITICAL)\n   - Q4 SEBI filing deadline approaching. Ensure all ESG metrics are verified and submitted through the BSE portal.\n\n2. **Solar PPA for Pune Facility** (Impact: HIGH)\n   - Manufacturing consumes 8,200+ kWh of grid electricity monthly. A TATA Power Solar PPA could cut Scope 2 emissions by 35% and save ₹12.4 lakhs annually.\n\n3. **Expand CSR Gamification** (Impact: MEDIUM)\n   - Only 5 of 8 employees have active CSR participations. Launch a company-wide \"Green Maharashtra\" challenge to boost engagement to 90%+.\n\n4. **Complete Policy Acknowledgements** (Impact: MEDIUM)\n   - 3 employees have pending acknowledgements for the Net-Zero Commitment Charter. Automated reminders via HRMS integration recommended.\n\n5. **Supplier ESG Re-certification** (Impact: HIGH)\n   - 3 Tier 2 suppliers in Maharashtra and Gujarat are overdue for ESG certification renewal. Non-compliance risks a 15-point governance score impact under SEBI norms."
    }
  },
  insights: {
    recommendation: {
      title: "Update Scope 2 emissions for the Pune facility. Recent solar installation data suggests a 4% variance from projections."
    },
    dataTrend: {
      trend: "-12.4% vs LY"
    },
    nextActions: [
      { title: "Export BRSR Report", subtitle: "Q3 Compliance Data", icon: "table_chart" },
      { title: "Share with Board", subtitle: "ESG Committee", icon: "share" }
    ],
    storage: {
      used: "68%"
    }
  }
};
