import React from "react";
import { FiUser, FiBookOpen, FiInfo } from "react-icons/fi";
import SearchBar from "../components/SearchBar";


const RoomCard = ({ 
  roomName, 
  creatorName, 
  description, 
  onJoinClick 
}) => {
  return (

    <div className="border border-primary rounded-lg shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="text-primary bg-bgLight border-b border-primary font-semibold px-4 py-3 rounded-t-lg text-lg mb-3">
          {roomName}
        </h3>
        <div className="px-4 pb-4">
          <p className="flex items-center text-sm text-gray-600 mb-2 gap-2">
            <FiUser className="text-primary" size={18} />
            <span className="text-primary font-semibold">{creatorName}</span>(Creator)
          </p>

          <p className="flex items-start text-xs text-gray-700 mb-3 leading-relaxed gap-2">
            <FiBookOpen className="text-primary shrink-0" size={18} />
            {description}
          </p>

          <p
            className="flex items-center text-xs text-gray-600 gap-2 cursor-pointer hover:text-primary transition-colors"
            onClick={onJoinClick}
          >
            <FiInfo size={16} />
            Click to join the conversation
          </p>
        </div>
       
      </div>
    </div>
  );
};

const RoomsGrid = () => {
  // Hardcoded dummy rooms data
  const dummyRooms = [
    {
      id: 1,
      name: "Room Alpha",
      creator: "Alice",
      description: "A place to discuss everything about tech and programming."
    },
    {
      id: 2,
      name: "Room Beta",
      creator: "Bob",
      description: "Chat about movies, TV shows, and pop culture."
    },
    {
      id: 3,
      name: "Room Gamma",
      creator: "Carol",
      description: "Talk all things fitness and health."
    },
    {
      id: 4,
      name: "Room Alpha",
      creator: "Alice",
      description: "A place to discuss everything about tech and programming."
    },
    {
      id: 5,
      name: "Room Beta",
      creator: "Bob",
      description: "Chat about movies, TV shows, and pop culture."
    },
    {
      id: 6,
      name: "Room Gamma",
      creator: "Carol",
      description: "Talk all things fitness and health."
    },
  ];

  const handleJoin = (roomId) => {
    alert(`Join clicked for room id: ${roomId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-8 mx-auto">
      {dummyRooms.map(room => (
        <RoomCard
          key={room.id}
          roomName={room.name}
          creatorName={room.creator}
          description={room.description}
          onJoinClick={() => handleJoin(room.id)}
        />
      ))}
    </div>
  );
};

export default RoomsGrid;
