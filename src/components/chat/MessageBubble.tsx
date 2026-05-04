"use client";

type Message = {
  id: number;
  role: string;
  content: string;
  time: string;
};

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[75%] rounded-2xl px-4 py-2 bg-slate-900 text-white"
            : "max-w-[75%] rounded-2xl px-4 py-2 bg-white text-slate-900 border border-slate-200"
        }
      >
        <div className="text-sm leading-relaxed">{message.content}</div>
        {message.time && (
          <div
            className={
              isUser
                ? "mt-1 text-xs text-slate-300 text-right"
                : "mt-1 text-xs text-slate-400"
            }
          >
            {message.time}
          </div>
        )}
      </div>
    </div>
  );
}