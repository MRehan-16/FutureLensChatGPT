export default async function handler(req, res) {
  try {
    const { interests, career, salary, budget } = req.body;

    const prompt = `
You are an AI career planner.

Create a clean structured roadmap:

User:
- Interests: ${interests}
- Career: ${career}
- Salary goal: ${salary}
- Budget: ${budget}

Return:
1. Career Overview
2. 4 Phase Roadmap
3. Top 5 Skills
4. Timeline
5. Budget Advice
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.status(200).json({ result: text });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
