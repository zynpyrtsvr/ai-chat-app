import { messagesDb, wait, getCurrentTime } from "./mockDb";

export async function getMessagesByConversationId(conversationId) {
  await wait(200);

  const messages = messagesDb[conversationId] || [];

  return [...messages];
}

export async function createUserMessage(conversationId, text) {
  await wait(200);

  const newMessage = {
    id: Date.now(),
    role: "user",
    content: text,
    time: getCurrentTime(),
  };

  messagesDb[conversationId].push(newMessage);

  return newMessage;
}

export async function createAssistantMessage(conversationId, text) {
  await wait(200);

  const newMessage = {
    id: Date.now() + 1,
    role: "assistant",
    content: text,
    time: getCurrentTime(),
  };

  messagesDb[conversationId].push(newMessage);

  return newMessage;
}