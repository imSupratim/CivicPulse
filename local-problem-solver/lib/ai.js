import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function categorizeProblem(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
    Analyze the following local problem and return JSON ONLY:

    Fields:
    - category (traffic, healthcare, sanitation, utilities, other)
    - urgency (low, medium, high)
    - summary (short one-line summary)
    - severityScore (1-10)

    Problem: "${text}"

    Return ONLY JSON. No explanation.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    // Clean response (important)
    const cleaned = response.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("AI error:", error);

    // fallback
    return {
      category: "other",
      urgency: "low",
      summary: text.slice(0, 50),
      severityScore: 3,
    };
  }
}