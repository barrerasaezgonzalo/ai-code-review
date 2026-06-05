import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    const headers = {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          max_tokens: 2048,
          temperature: 0.1,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `Actúa como un experto en desarrollo de software.
Analiza el código y responde ÚNICAMENTE en formato JSON.
Tu respuesta debe comenzar con "{" y terminar con "}". 
No incluyas explicaciones previas ni texto antes del objeto JSON.
{
  "explicacion": "Breve explicación técnica",
  "codigo_sugerido": "El código refactorizado o mejorado",
  "complejidad_ciclomatica": "0",
  "roast": "Un comentario sarcástico y divertido sobre el código"
}
`,
            },
            { role: "user", content: JSON.stringify(code) },
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

    const content = data.choices[0].message.content;
    const result = JSON.parse(content);
    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Fallo interno en el servidor" },
      { status: 500 },
    );
  }
}
