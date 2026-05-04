import { redirect } from "next/navigation";
import { getAllConversations, createConversation } from "@/lib/dal";

export default async function Home() {
  const conversations = await getAllConversations();

  if (conversations.length > 0) {
    redirect(`/chat/${conversations[0].id}`);
  }

  const newConversation = await createConversation();
  redirect(`/chat/${newConversation.id}`);
}