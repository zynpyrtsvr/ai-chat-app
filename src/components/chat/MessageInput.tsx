"use client";

import { useState } from "react";

type Props = {
  onSendMessage: (text: string) => void;
  disabled: boolean;
};

export default function MessageInput({ onSendMessage, disabled }: Props) {
  const [inputText, setInputText] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const cleanedText = inputText.trim();
    if (cleanedText === "") return;
    onSendMessage(cleanedText);
    setInputText("");
  }

  return (
    <footer className="bg-white border-t border-slate-200 p-3">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex gap-2 items-end"
      >
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 resize-none rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-900 placeholder:text-slate-400"
          rows={1}
          placeholder="Type a message..."
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled}
          className="rounded-xl bg-slate-900 text-white px-5 py-3 font-medium hover:bg-slate-800 transition disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </footer>
  );
}