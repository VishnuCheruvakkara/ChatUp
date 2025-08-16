import React, { useState } from "react";
import { LiaPaperPlaneSolid } from "react-icons/lia";
import Button from "./Button";

const ChatFooter = ({ onSend }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSend(newMessage);
    setNewMessage("");
  };

  // check if input is empty
  const isDisabled = !newMessage.trim();

  return (
    <div className="bg-bgBase border-t border-primary rounded-b-lg px-4 py-3 flex items-center gap-2">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !isDisabled && handleSend()}
        placeholder="Type a message..."
        className="flex-1 min-w-0 px-6 py-2 rounded-full border font-semibold text-gray-600 bg-bgBase border-primary focus:outline-none"
      />
      <Button
        onClick={handleSend}
        disabled={isDisabled}
        className={`px-2 py-2 rounded-full text-white transition-colors ${
          isDisabled
            ? "bg-gray-400 cursor-default hover:bg-gray-400"
            : "bg-primary hover:bg-accent"
        }`}
      >
        <LiaPaperPlaneSolid className="text-2xl" />
      </Button>
    </div>
  );
};

export default ChatFooter;
