import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import DateTimeFormatter from "./DateTimeFormatter";

const ChatBody = ({ messages, onScroll, containerRef, appendType }) => {
  // appendType = 'prepend' | 'append'
  const chatEndRef = useRef(null);
  const currentUserId = useSelector((state) => state.user.userData?.id);
  const wasAtBottomRef = useRef(true);


  const isAtBottom = () => {
    const container = containerRef.current;
    if (!container) return false;
    return container.scrollHeight - container.scrollTop - container.clientHeight < 50;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      
      if (appendType === "append") {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      // Update bottom state
      wasAtBottomRef.current = isAtBottom();
    });

  }, [messages, appendType]);

  return (
    <div
      onScroll={onScroll}
      ref={containerRef}
      className="flex-1 overflow-y-auto sm:p-4 px-1 py-3 space-y-2 max-h-[calc(100vh-140px)] bg-bgBase"
    >
      {messages.map((msg, idx) => {
        const firstLetter = msg.user?.charAt(0).toUpperCase() || "?";
        const isMe = msg.userId === currentUserId;

        return (
          <div
            key={idx}
            className={`flex items-start ${isMe ? "justify-end" : "justify-start"}`}
          >
            {!isMe && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/80 text-white flex items-center justify-center font-semibold mr-2 select-none">
                {firstLetter}
              </div>
            )}

            <div
              className={`sm:max-w-[40%] max-w-[70%] shadow-sm break-words text-black
                ${isMe
                  ? "ml-auto bg-accent rounded-l-xl rounded-br-xl message-tail-right"
                  : "mr-auto bg-bgLight rounded-r-xl rounded-bl-xl message-tail-left"
                }`}
            >
              <p className="text-xs font-semibold text-gray-600 py-[1px] border-b border-bgBase px-4">
                {msg.user}
              </p>
              <p className="text-[14px] leading-relaxed px-4 pt-2">{msg.text}</p>
              <p className="text-[10px] text-gray-500 text-right mt-1 pb-1 select-none px-4">
                <DateTimeFormatter dateString={msg.time} />
              </p>
            </div>

            {isMe && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold ml-2 select-none">
                {firstLetter}
              </div>
            )}
          </div>
        );
      })}
      <div ref={chatEndRef}></div>
    </div>
  );
};

export default ChatBody;
