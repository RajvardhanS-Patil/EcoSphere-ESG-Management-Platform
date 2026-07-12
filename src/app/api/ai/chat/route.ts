import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, context } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured", fallback: true },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemPrompt = `You are the EcoSphere ESG Executive Advisor — an AI assistant for enterprise ESG (Environmental, Social, Governance) management. You work for an Indian enterprise.

Your capabilities:
- Analyze carbon emissions, energy usage, and environmental metrics
- Review social impact, CSR activities, and gamification data
- Assess governance compliance, audit status, and policy adherence
- Provide actionable recommendations aligned with SEBI BRSR and GRI standards
- Reference Indian regulations: SEBI, CPCB, MoEFCC, Companies Act 2013 Section 135

Current Platform Data:
${JSON.stringify(context, null, 2)}

Guidelines:
- Use professional but accessible language
- Reference specific data points from the platform context
- Provide actionable, numbered recommendations when appropriate
- Use emoji sparingly for section headers
- Keep responses concise but comprehensive
- Reference Indian regulatory context (BRSR, SEBI) where relevant`;

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: prompt }
    ]);

    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "AI service temporarily unavailable", fallback: true },
      { status: 500 }
    );
  }
}
