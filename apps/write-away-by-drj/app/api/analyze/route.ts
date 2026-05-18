export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const mode = body?.mode || "Dr. J Coaching";

    return Response.json({
      success: true,
      mode,
      feedback: `Write Away by Dr.J successfully processed your request in ${mode} mode. OpenAI integration and dissertation analysis are being connected next.`,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Unable to process request.",
      },
      {
        status: 500,
      }
    );
  }
}
