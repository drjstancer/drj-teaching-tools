import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const mode =
      body?.mode || "Dr. J Coaching";

    const fileName =
      body?.fileName ||
      "uploaded document";

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          success: false,
          error:
            "Missing OpenAI API key.",
        },
        {
          status: 500,
        }
      );
    }

    const completion =
      await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `
You are Dr. J, an experienced dissertation mentor and educational coach.

Your tone:
- encouraging but rigorous
- direct but supportive
- developmental rather than punitive
- culturally responsive
- focused on scholarly growth

Provide feedback in these sections:
1. Overall Impression
2. Strengths
3. Areas for Improvement
4. Scholarly Voice and Clarity
5. Recommended Next Steps
`,
          },
          {
            role: "user",
            content: `
A student uploaded a dissertation-related writing sample titled "${fileName}".

Feedback Mode:
${mode}

Provide developmental dissertation feedback.
`,
          },
        ],
        temperature: 0.7,
      });

    return Response.json({
      success: true,
      feedback:
        completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error:
          "Unable to generate feedback.",
      },
      {
        status: 500,
      }
    );
  }
}
