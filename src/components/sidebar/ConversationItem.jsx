function ConversationItem({
  conversation,
  isActive,
  onSelectConversation,
}) {
  return (
    <button
      type="button"
      onClick={() => onSelectConversation(conversation.id)}
      className={
        isActive
          ? "w-full text-left px-3 py-2 rounded-lg bg-slate-100 border border-slate-200"
          : "w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition"
      }
    >
      <div className="font-medium text-slate-900">{conversation.title}</div>
      <div className="text-sm text-slate-500 truncate">
        {conversation.preview}
      </div>
    </button>
  );
}

export default ConversationItem;