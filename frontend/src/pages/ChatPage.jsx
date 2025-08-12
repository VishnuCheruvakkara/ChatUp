import { useState } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { user: "Alice", text: "Hey there!", time: "10:30 AM" },
    { user: "Me", text: "Hi Alice! How are you?", time: "10:31 AM" },
    { user: "Bob", text: "Hello everyone!", time: "10:32 AM" },
  ]);

  const handleSend = (newMessage) => {
    setMessages((prev) => [
      ...prev,
      {
        user: "Me",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <div className="flex border rounded-lg shadow-lg border-primary flex-col h-[500px] w-full max-w-5xl bg-bgBase">
      <ChatHeader />
      <ChatBody messages={messages} />
      <ChatFooter onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
