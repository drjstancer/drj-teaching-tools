export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  return Response.json({
    success: true,
    mode: body?.mode || "Dr. J Coaching",
    feedback: "API route updated successfully."
  });
}
