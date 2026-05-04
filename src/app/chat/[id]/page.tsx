import { getAllConversations } from "@/lib/dal";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";
import ChatPanel from "@/components/chat/ChatPanel";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { id } = await params;
  const conversations = await getAllConversations();
  const activeId = Number(id);
  const activeConversation = conversations.find((c: { id: number }) => c.id === activeId);

  return (
    <div className="h-screen w-full flex bg-slate-100">
      <SidebarWrapper
        conversations={conversations}
        activeConversationId={activeId}
      />
      <ChatPanel
        conversationId={activeId}
        title={activeConversation?.title ?? "Chat"}
      />
    </div>
  );
}