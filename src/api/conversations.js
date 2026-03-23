import { conversationsDb, messagesDb, wait } from "./mockDb";

export async function getAllConversations() {
  await wait(200);

  return conversationsDb.map((conversation) => {
    const conversationMessages = messagesDb[conversation.id] || [];
    const lastMessage = conversationMessages[conversationMessages.length - 1];

    return {
      ...conversation,
      preview: lastMessage ? lastMessage.content : "No messages yet",
    };
  });
}

export async function createConversation() {
  await wait(200);

  const newConversation = {
    id: Date.now(),
    title: `Chat ${conversationsDb.length + 1}`,
  };

  conversationsDb.unshift(newConversation);
  messagesDb[newConversation.id] = [];

  return newConversation;
}