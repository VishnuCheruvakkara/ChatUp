import React from "react";
import { FiUser, FiBookOpen, FiInfo } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import { IoMdTime } from "react-icons/io";
import DateTimeFormatter from "./DateTimeFormatter";
import { FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";

const RoomCard = ({
  room,
  onJoinClick,
  onDeleteClick,
}) => {
  const currentUserId = useSelector((state) => state.user.userData?.id);

  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteClick(room);
  };

  return (

    <div onClick={onJoinClick} className="border border-primary rounded-lg shadow-xl hover:shadow-none flex flex-col justify-between group cursor-pointer transition duration-300 ease-in-out">
      <div>

        <div className="flex justify-between items-center bg-bgLight border-b border-primary px-4 py-2 rounded-t-lg">
          <h3 className="text-primary font-semibold text-lg">{room?.name}</h3>
          {room?.creator_id == currentUserId && (
            <div className="shrink-0">
              <button
                onClick={handleDelete}
                aria-label="Delete room"
                className="flex items-center justify-center hover:text-bgBase w-8 h-8 rounded-full border border-primary hover:bg-primary bg-bgBase text-primary hover:bg-primary-700 transition-colors duration-200 "
              >
                <FiTrash size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="px-4 pb-4">
          <p className="flex items-center text-sm text-gray-600 mb-2 gap-2 mt-2">
            <FiUser className="text-primary" size={18} />
            <span className="text-primary font-semibold">{room?.creator_name}</span>(Creator)
          </p>
          <p className="flex items-center text-sm text-gray-600 mb-2 gap-2">
            <IoMdTime className="text-primary" size={18} />
            <span className=" text-xs"><DateTimeFormatter dateString={room?.created_at} /></span>
          </p>
          <p className="flex items-start text-xs text-gray-700 mb-3 leading-relaxed gap-2">
            <FiBookOpen className="text-primary shrink-0" size={18} />
            {room?.description}
          </p>

          <p
            className="flex items-center text-xs text-gray-600 gap-2 cursor-pointer group-hover:text-primary transition-colors "
          >
            <FiInfo size={16} />
            Click to join the conversation
          </p>
        </div>

      </div>
    </div>
  );
};

const RoomsGrid = ({ rooms, onJoinClick, onDeleteClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-8 mx-auto my-6">
      {rooms && rooms.length > 0 ? (
        rooms.map(room => (
          <RoomCard
            key={room?.id}
            room={room}
            onJoinClick={() => onJoinClick(room.id)}
            onDeleteClick={onDeleteClick}
          />
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center py-[100px] ">No rooms found</p>
      )
      }

    </div>
  );
};

export default RoomsGrid;
