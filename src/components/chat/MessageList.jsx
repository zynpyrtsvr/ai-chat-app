import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "./LoadingIndicator";

function MessageList({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <section className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {loading && <LoadingIndicator />}

      <div ref={bottomRef}></div>
    </section>
  );
}

export default MessageList;