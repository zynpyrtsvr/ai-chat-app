"use client";

import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

type Conversation = {
  id: number;
  title: string;
  preview: string;
};

type Props = {
  conversations: Conversation[];
  activeConversationId: number;
};

export default function SidebarWrapper({
  conversations,
  activeConversationId,
}: Props) {
  const router = useRouter();

  async function handleNewChat() {
    const res = await fetch("/api/conversations", { method: "POST" });
    const data = await res.json();
    router.push(`/chat/${data.id}`);
    router.refresh();
  }

  async function handleDeleteConversation(id: number) {
    await fetch(`/api/conversations/${id}`, { method: "DELETE" });
    if (id === activeConversationId) {
      router.push("/");
    }
    router.refresh();
  }

  return (
    <Sidebar
      conversations={conversations}
      activeConversationId={activeConversationId}
      onSelectConversation={(id) => router.push(`/chat/${id}`)}
      onNewChat={handleNewChat}
      onDeleteConversation={handleDeleteConversation}
    />
  );
}