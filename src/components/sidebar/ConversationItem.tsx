"use client";

type Conversation = {
  id: number;
  title: string;
  preview: string;
};

type Props = {
  conversation: Conversation;
  isActive: boolean;
  onSelectConversation: (id: number) => void;
  onDeleteConversation: (id: number) => void;
};

export default function ConversationItem({
  conversation,
  isActive,
  onSelectConversation,
  onDeleteConversation,
}: Props) {
  return (
    <div
      className={
        isActive
          ? "w-full text-left px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between group"
          : "w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition flex items-center justify-between group"
      }
    >
      <button
        type="button"
        onClick={() => onSelectConversation(conversation.id)}
        className="flex-1 text-left"
      >
        <div className="font-medium text-slate-900">{conversation.title}</div>
        <div className="text-sm text-slate-500 truncate">{conversation.preview}</div>
      </button>
      <button
        type="button"
        onClick={() => onDeleteConversation(conversation.id)}
        className="ml-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
      >
        ✕
      </button>
    </div>
  );
}