import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { TbDoorExit } from "react-icons/tb";
import { IoIosInformationCircle } from "react-icons/io";

const ChatHeader = ({ chatRoom, onRoomDetailsClick, onlineUsers}) => {
  const navigate = useNavigate();
  const firstLetter = chatRoom?.name?.charAt(0).toUpperCase() || "G";

  return (
    <div className="bg-primary rounded-t-lg text-white sm:px-6 px-2 py-3 shadow-md flex items-center justify-between">
      <div onClick={onRoomDetailsClick} className="flex items-center gap-3 cursor-pointer">
        {/* Avatar */}
        <div className="shrink-0 h-8 w-8  rounded-full bg-bgBase text-primary flex items-center justify-center font-bold">
          <span className="sm:text-xl text-sm">{firstLetter}</span>
        </div>

        {/* Name + Online count stacked */}
        <div className="flex flex-col leading-tight">
          <h1 className="sm:text-xl text-sm font-bold truncate max-w-24 sm:max-w-full">
            {chatRoom?.name || "Group Chat"}
          </h1>
          <span className="text-xs opacity-80 text-white font-semibold"> {onlineUsers || "0"} online</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          icon={IoIosInformationCircle}
          onClick={onRoomDetailsClick}
          className="bg-bgBase text-primary text-xs sm:flex hidden"
        >
          Room Details
        </Button>
        <Button
          icon={TbDoorExit}
          onClick={() => navigate(-1)}
          className="bg-bgBase text-primary text-xs sm:flex hidden"
        >
          Leave Room
        </Button>
        <span
          onClick={onRoomDetailsClick}
          className="w-8 h-8  items-center justify-center bg-bgBase rounded-full cursor-pointer hover:bg-accent transition sm:hidden flex"
        >
          <IoIosInformationCircle className="text-primary text-2xl" />
        </span>

        <span
          onClick={() => navigate(-1)}
          className="w-8 h-8  items-center justify-center bg-bgBase rounded-full cursor-pointer hover:bg-accent transition sm:hidden flex"
        >
          <TbDoorExit className="text-primary text-xl" />
        </span>


      </div>
    </div>
  );
};

export default ChatHeader;
