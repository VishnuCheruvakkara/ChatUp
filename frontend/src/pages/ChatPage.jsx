import { useState,useEffect } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import { useParams } from "react-router-dom";
import userAxios from "../axios/userAuthenticationInterceptor";
import useChatSocket from "../utils/useChatSocket";

const ChatPage = () => {
  const {roomId} = useParams();
  const [chatRoom,setChatRoom] = useState(null);
  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    const getChatRoom = async() =>{
      try{
        const response = await userAxios.get(`/chat/get-chat-room/${roomId}`);
        console.log(response.data);
        setChatRoom(response.data);
      }catch(error){
        console.error("Error happen while fetching room data",error);
      }
    };
    getChatRoom();
  },[roomId])

  const {sendMessage} = useChatSocket(roomId,(data)=>{
    setMessages((prev) =>[
      ...prev,
      {
        user:data.user || "User",
        text:data.message,
        time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:true}),
      },
    ])
  });

  const handleSend = (newMessage) => {
    setMessages((prev) => [
      ...prev,
      {
        user: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12:true,
        }),
      },
    ]);
    sendMessage(newMessage);
  };

  useEffect (()=>{

  },[])

  return (
    <div className="flex border rounded-lg shadow-lg border-primary flex-col h-[500px] w-full max-w-5xl bg-bgBase">
      <ChatHeader />
      <ChatBody messages={messages} />
      <ChatFooter onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
