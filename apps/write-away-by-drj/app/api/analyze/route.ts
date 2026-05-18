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

    const sampleText =
      body?.sampleText || "";

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
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: `
You are Dr. J, an experienced dissertation mentor and educational coach.

Your feedback style:
- encouraging but intellectually rigorous
- direct but supportive
- culturally responsive
- developmental rather than punitive
- focused on scholarly growth and dissertation persistence

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
A doctoral student submitted the following writing sample.

Document Title:
${fileName}

Feedback Mode:
${mode}

Writing Sample:
${sampleText}

Provide developmental dissertation feedback in Dr. J's voice.
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
