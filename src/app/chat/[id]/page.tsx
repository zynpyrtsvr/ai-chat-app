import { getAllConversations } from "@/lib/dal";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatPanel from "@/components/chat/ChatPanel";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { id } = await params;
  const conversations = await getAllConversations();
  const activeId = Number(id);
  const activeConversation = conversations.find((c) => c.id === activeId);

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