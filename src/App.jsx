import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import ChatPanel from "./components/chat/ChatPanel";
import { getAllConversations, createConversation } from "./api/conversations";
import {
  getMessagesByConversationId,
  createUserMessage,
  createAssistantMessage,
} from "./api/messages";
import { getAssistantReply } from "./api/llm";

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadConversationsOnStart();
  }, []);

  useEffect(() => {
    if (activeConversationId !== null) {
      loadMessages(activeConversationId);
    }
  }, [activeConversationId]);

  async function loadConversationsOnStart() {
    const data = await getAllConversations();
    setConversations(data);

    if (data.length > 0) {
      setActiveConversationId(data[0].id);
    }
  }

  async function refreshConversations() {
    const data = await getAllConversations();
    setConversations(data);
  }

  async function loadMessages(conversationId) {
    const data = await getMessagesByConversationId(conversationId);
    setMessages(data);
  }

  async function handleNewChat() {
    const newConversation = await createConversation();
    await refreshConversations();
    setActiveConversationId(newConversation.id);
  }

  async function handleSendMessage(text) {
    if (activeConversationId === null) {
      return;
    }

    const userMessage = await createUserMessage(activeConversationId, text);
    const messagesAfterUser = [...messages, userMessage];

    setMessages(messagesAfterUser);
    await refreshConversations();

    setLoading(true);

    try {
      const aiReplyText = await getAssistantReply(messagesAfterUser);

      const assistantMessage = await createAssistantMessage(
        activeConversationId,
        aiReplyText
      );

      const messagesAfterAssistant = [
        ...messagesAfterUser,
        assistantMessage,
      ];

      setMessages(messagesAfterAssistant);
      await refreshConversations();
    } catch (error) {
      console.error("LLM request error:", error);

      const errorMessage = await createAssistantMessage(
        activeConversationId,
        "Sorry, there was a problem while getting the AI reply."
      );

      const messagesAfterError = [...messagesAfterUser, errorMessage];
      setMessages(messagesAfterError);
      await refreshConversations();
    } finally {
      setLoading(false);
    }
  }

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId
  );

  const currentTitle = activeConversation
    ? activeConversation.title
    : "No Chat Selected";

  return (
    <div className="h-screen w-full flex bg-slate-100">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
      />

      <ChatPanel
        title={currentTitle}
        messages={messages}
        loading={loading}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;