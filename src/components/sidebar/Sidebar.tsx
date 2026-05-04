"use client";

import ConversationItem from "./ConversationItem";

type Conversation = {
  id: number;
  title: string;
  preview: string;
};

type Props = {
  conversations: Conversation[];
  activeConversationId: number | null;
  onSelectConversation: (id: number) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: number) => void;
};

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
}: Props) {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <button
          type="button"
          onClick={onNewChat}
          className="w-full rounded-lg bg-slate-900 text-white py-2 font-medium hover:bg-slate-800 transition"
        >
          + New Chat
        </button>
      </div>

      <nav className="p-3 space-y-2 overflow-y-auto">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            onSelectConversation={onSelectConversation}
            onDeleteConversation={onDeleteConversation}
          />
        ))}
      </nav>
    </aside>
  );
}