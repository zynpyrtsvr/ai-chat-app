import { createMessage, getMessagesByConversationId } from "@/lib/dal";

export async function POST(req: Request) {
  const { conversationId, message } = await req.json();

  await createMessage(conversationId, "user", message);

  const messages = await getMessagesByConversationId(conversationId);

  const apiKey = process.env.OPENROUTER_API_KEY;
  const modelName = process.env.OPENROUTER_MODEL;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(error, { status: 500 });
  }

  const reader = response.body!.getReader();
  const encoder = new TextEncoder();
  let fullText = "";

  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.replace("data: ", "");
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            let token = "";
            if (typeof content === "string") {
              token = content;
            } else if (Array.isArray(content)) {
              token = content.map((c: any) => c.text ?? "").join("");
            }
            fullText += token;
            controller.enqueue(encoder.encode(token));
          } catch {}
        }
      }

      await createMessage(conversationId, "assistant", fullText);
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}