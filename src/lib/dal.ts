import { prisma } from "./prisma";

export async function getAllConversations() {
  const conversations = await prisma.conversation.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      messages: {
        orderBy: { id: "desc" },
        take: 1,
      },
    },
  });

  return conversations.map((c) => ({
    id: c.id,
    title: c.title,
    preview: c.messages[0]?.content ?? "No messages yet",
  }));
}

export async function createConversation() {
  const count = await prisma.conversation.count();
  return prisma.conversation.create({
    data: { title: `Chat ${count + 1}` },
  });
}

export async function deleteConversation(id: number) {
  return prisma.conversation.delete({ where: { id } });
}

export async function getMessagesByConversationId(conversationId: number) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { id: "asc" },
  });
}

export async function createMessage(
  conversationId: number,
  role: string,
  content: string
) {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return prisma.message.create({
    data: { conversationId, role, content, time },
  });
}