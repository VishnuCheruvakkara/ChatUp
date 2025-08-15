import { useEffect,useRef,useCallback } from "react";

function useChatSocket(roomName,onMessage){
    const socketRef  = useRef(null);
    const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

    useEffect(()=>{
        const socket = new WebSocket(
            `${WS_BASE_URL}/ws/chat-room/${roomName}/`
        );
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) =>{
            try{
                const data = JSON.parse(event.data);
                onMessage(data);
            }catch(error){
                console.log("Failed to parse message",error)
            }
        };

        socket.onclose = (event) =>{
            console.log("WebSocket closed",event);
        };

        socket.onerror = (error) =>{
            console.error("WebSocket error",error);
        };

        return () => {
            socket.close();
        };

    },[roomName,onMessage]);

    const sendMessage = useCallback((message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN){
            socketRef.current.send(JSON.stringify({message}));
        } else{
            console.error("WebSocket is not connected.")
        }
    },[]);

    return { sendMessage };
    
}

export default useChatSocket