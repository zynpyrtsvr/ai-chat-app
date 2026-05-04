"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "./LoadingIndicator";

type Message = {
  id: number;
  role: string;
  content: string;
  time: string;
};

type Props = {
  messages: Message[];
  loading: boolean;
};

export default function MessageList({ messages, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <section className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {loading && <LoadingIndicator />}
      <div ref={bottomRef} />
    </section>
  );
}