import { MdOutlineCancel } from "react-icons/md";
import DateTimeFormatter from "./DateTimeFormatter";

const ChatSidebar = ({ isOpen, onClose, chatRoom, onlineUsers }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-bgLight bg-opacity-40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full sm:w-80 w-full bg-bgBase shadow-lg border-l transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-accent">
                    <h2 className="font-bold text-lg text-primary">Room Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-primary"><MdOutlineCancel className="text-2xl" /></button>
                </div>

                {/* Room info */}
                <div className="p-4 space-y-2">
                    <p className="font-semibold">Room : {chatRoom?.name}</p>
                    <p className="text-sm text-gray-500">Admin : {chatRoom?.creator_name}</p>
                    <p className="text-sm text-gray-500">Description : {chatRoom?.description}</p>
                    <p className="text-sm text-gray-500">Created : <DateTimeFormatter dateString={chatRoom?.created_at} /></p>
                </div>


                {/* Members */}
                <div className="p-4 border-accent border-t">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">Members</h3>
                        <span className="text-sm text-gray-500">Total: {onlineUsers.length || "0"}</span>
                    </div>

                    <ul className="space-y-2 text-sm text-gray-500">
                        {onlineUsers.map((user) => (
                            <li key={user.id} className="flex items-center gap-5 border p-2 border-accent rounded-md font-semibold">
                                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                    <span className="text-bgBase">{user.username[0]}</span>
                                </div>
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </div>



            </div>
        </>
    );
};

export default ChatSidebar