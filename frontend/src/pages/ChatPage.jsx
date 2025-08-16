import { useState, useEffect } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import { useParams } from "react-router-dom";
import userAxios from "../axios/userAuthenticationInterceptor";
import useChatSocket from "../hooks/useChatSocket";
import { useSelector } from "react-redux";
import PageLoader from "../components/PageLoader";
import useModal from "../hooks/useModal";
import ChatSidebar from "../components/SideBar"

const ChatPage = () => {
  const { roomId } = useParams();
  const { isOpen, openModal, closeModal } = useModal(false);
  const [loading, setLoading] = useState(false);
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
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

  useEffect(()=>{
    const getChatMessages = async () =>{
      setLoading(true);
      try{
        const response = await userAxios.get(`/chat/get-chat-messages/${roomId}`);
        setMessages(response.data);
      }catch(error){
        console.error("Error while fetching the chats",error)
      }finally{
        setLoading(false);
      }
    }
    getChatMessages();
  },[roomId])

  const { sendMessage } = useChatSocket(roomId, (data) => {
    if (data.type === "user_list") {
      setOnlineUsers(data.users); // users is an array of {id, username}
    } else if (!data.type || data.type === "chat_message") {
      setMessages((prev) => [
        ...prev,
        {
          user: data.username || "User",
          text: data.message,
          userId: data.user_id,
          time: data.timestamp,
        },
      ]);
    }
  });

  const handleSend = (newMessage) => {
    console.log("Message sent to server ::::", newMessage)
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
          <ChatHeader chatRoom={chatRoom} onRoomDetailsClick={openModal} onlineUsers={onlineUsers.length} />
          <ChatSidebar isOpen={isOpen} onClose={closeModal} chatRoom={chatRoom} onlineUsers={onlineUsers}/>
          <ChatBody messages={messages} />
          <ChatFooter onSend={handleSend} />
        </div>

      )
      }
    </>
  );
};

export default ChatPage;
