import { useState, useEffect } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import { useParams } from "react-router-dom";
import userAxios from "../axios/userAuthenticationInterceptor";
import useChatSocket from "../hooks/useChatSocket";
import { useSelector } from "react-redux";
import PageLoader from "../components/PageLoader";

const ChatPage = () => {
  const { roomId } = useParams();
  const [loading, setLoading] = useState(false);
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const currentUserId = useSelector((state) => state.user.userData?.id)

  useEffect(() => {
    const getChatRoom = async () => {
      setLoading(true);
      try {
        const response = await userAxios.get(`/chat/get-chat-room/${roomId}`);
        console.log(response.data);
        setChatRoom(response.data);
      } catch (error) {
        console.error("Error happen while fetching room data", error);
      } finally {
        setLoading(false);
      }
    };
    getChatRoom();
  }, [roomId])

  const { sendMessage } = useChatSocket(roomId, (data) => {
    console.log("Message recieved:::", data);
    setMessages((prev) => [
      ...prev,
      {
        user: data.username || "User",
        text: data.message,
        userId: data.user_id,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
      },
    ])
  });

  const handleSend = (newMessage) => {
    console.log("Message sent to server ::::", newMessage)
    setMessages((prev) => [
      ...prev,
      {
        user: "You",
        text: newMessage,
        userId: currentUserId,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),

      },
    ]);
    sendMessage(newMessage);
  };

  useEffect(() => {

  }, [])

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (

        <div className="flex border rounded-lg shadow-lg border-primary flex-col h-[500px] w-full max-w-5xl bg-bgBase">
          <ChatHeader chatRoom={chatRoom} />
          <ChatBody messages={messages} />
          <ChatFooter onSend={handleSend} />
        </div>

      )
      }
    </>
  );
};

export default ChatPage;
