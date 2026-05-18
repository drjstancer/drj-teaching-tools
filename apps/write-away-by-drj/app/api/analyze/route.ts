import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const completion =
      await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `
You are Dr. J, an experienced dissertation mentor.

Your feedback style:
- supportive but rigorous
- direct but encouraging
- culturally responsive
- focused on growth and clarity
`,
          },
          {
            role: "user",
            content:
              "Review this writing sample.",
          },
        ],
      });

    return Response.json({
      feedback:
        completion.choices[0].message.content,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
