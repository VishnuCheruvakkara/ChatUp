import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { TbDoorExit } from "react-icons/tb";

const ChatHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary rounded-t-lg text-white px-6 py-4 shadow-md flex items-center justify-between">
      <h1 className="text-xl font-bold">Group Chat</h1>
      <Button icon={TbDoorExit} onClick={()=> navigate(-1)} className="bg-bgBase text-primary text-xs ">Leave Room</Button>
    </div>
  );
};

export default ChatHeader;
