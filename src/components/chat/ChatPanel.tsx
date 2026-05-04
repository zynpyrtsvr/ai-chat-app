"use client";

import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

type Message = {
  id: number;
  role: string;
  content: string;
  time: string;
};

type Props = {
  conversationId: number;
  title: string;
};

export default function ChatPanel({ conversationId, title }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/conversations/${conversationId}/messages`)
      .then((r) => r.json())
      .then(setMessages);
  }, [conversationId]);

  async function handleSendMessage(text: string) {
    setLoading(true);

    const tempUserMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, tempUserMessage]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, message: text }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    const tempAssistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: "",
      time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, tempAssistantMessage]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullText += decoder.decode(value);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempAssistantMessage.id ? { ...m, content: fullText } : m
        )
      );
    }

    setLoading(false);
  }

  return (
    <main className="flex-1 flex flex-col">
      <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4">
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="ml-2 text-sm text-slate-500">• AI Chat App</div>
      </header>
      <MessageList messages={messages} loading={loading} />
      <MessageInput onSendMessage={handleSendMessage} disabled={loading} />
    </main>
  );
}