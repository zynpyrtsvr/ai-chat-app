import { useState } from "react";

function MessageInput({ onSendMessage, disabled }) {
  const [inputText, setInputText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedText = inputText.trim();

    if (cleanedText === "") {
      return;
    }

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
          onChange={(event) => setInputText(event.target.value)}
          className="flex-1 resize-none rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
          rows="1"
          placeholder="Type a message..."
          disabled={disabled}
        ></textarea>

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

export default MessageInput;