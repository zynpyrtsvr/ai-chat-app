// IMPORTANT:
// Do not write your real API key directly in this file.
// Put it inside a .env file like this:
//
// VITE_OPENROUTER_API_KEY=your_key_here
// VITE_OPENROUTER_MODEL=your_model_name_here

export async function getAssistantReply(allMessages) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const modelName = import.meta.env.VITE_OPENROUTER_MODEL;

  if (!apiKey) {
    throw new Error("Missing OpenRouter API key.");
  }

  if (!modelName) {
    throw new Error("Missing OpenRouter model name.");
  }

  const requestMessages = allMessages.map((message) => {
    return {
      role: message.role,
      content: message.content,
    };
  });

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: requestMessages,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  const data = await response.json();

  const reply = data.choices?.[0]?.message?.content;

  if (!reply) {
    return "Sorry, I could not generate a reply.";
  }

  return reply.trim();
}