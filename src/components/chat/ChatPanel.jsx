import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatPanel({ title, messages, loading, onSendMessage }) {
  return (
    <main className="flex-1 flex flex-col">
      <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4">
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="ml-2 text-sm text-slate-500">• React Chat App</div>
      </header>

      <MessageList messages={messages} loading={loading} />

      <MessageInput onSendMessage={onSendMessage} disabled={loading} />
    </main>
  );
}

export default ChatPanel;