import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, mode } = await req.json();
    const headers = {
      Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "AI Code Reviewer",
    };
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          model: "openrouter/free", // openai/gpt-4o-mini
          messages: [
            {
              role: "system",
              content: `Actúa como un experto. Objetivo: ${mode}.`,
            },
            { role: "user", content: code },
          ],
        }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Error al conectar con la IA" },
        { status: response.status },
      );
    }

    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Fallo interno en el servidor" },
      { status: 500 },
    );
  }
}
