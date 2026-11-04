import { NextRequest, NextResponse } from "next/server";

const MODEL = "openai/gpt-oss-20b"; // Groq's fastest current model (900+ tokens/sec)

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqRequestBody {
  model: string;
  messages: ChatMessage[];
  temperature: number;
  max_tokens: number;
}

interface GroqErrorResponse {
  error?: {
    message?: string;
  };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server configuration error: Missing API Key" },
      { status: 500 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = (await req.json()) as { messages?: unknown };
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Messages must be a non-empty array" },
      { status: 400 }
    );
  }

  // Validate each message has the correct shape
  const isValidMessages = messages.every(
    (m): m is ChatMessage =>
      typeof m === "object" &&
      m !== null &&
      typeof (m as Record<string, unknown>).role === "string" &&
      ["system", "user", "assistant"].includes(
        (m as Record<string, unknown>).role as string
      ) &&
      typeof (m as Record<string, unknown>).content === "string"
  );

  if (!isValidMessages) {
    return NextResponse.json(
      {
        error:
          'Each message must have a valid role ("system" | "user" | "assistant") and a string content',
      },
      { status: 400 }
    );
  }

  const requestBody: GroqRequestBody = {
    model: MODEL,
    messages: messages as ChatMessage[],
    temperature: 0.7,
    max_tokens: 300,
  };

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = (await response.json()) as GroqErrorResponse;

    if (!response.ok) {
      console.error("Groq API Error:", data);
      return NextResponse.json(
        { error: data?.error?.message ?? "Failed to fetch from Groq" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: message },
      { status: 500 }
    );
  }
}
