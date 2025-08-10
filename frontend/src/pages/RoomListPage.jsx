import { useEffect, useState } from "react";
import RoomsGrid from "../components/RoomCard";
import SearchBar from "../components/SearchBar";
import userAxios from "../axios/userAuthenticationInterceptor";
import SingleLoader from "../components/SingleLoader";
import { useLocation } from "react-router-dom";

function RoomPage() {
    const location = useLocation();
    const [chatRooms, setChatRooms] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search,setSearch] = useState("");

    const isMyRooms = location.pathname.includes("/my-rooms");
    const isAllRooms = location.pathname.includes("/all-rooms");
    useEffect(() => {
        const getAllChatRooms = async () => {
            setLoading(true);
            try {
                let url = "/chat/get-all-rooms/";
                if(isMyRooms){
                    url="/chat/get-all-rooms/?mine=true";
                }
                const response = await userAxios.get(url);
                console.log(response.data)
                setChatRooms(response.data);
            } catch (error) {
                console.error("Errror when fecthing chat rooms", error)
            } finally {
                setLoading(false);
            }
        }
        getAllChatRooms();
    }, [isAllRooms,isMyRooms])

    const handleJoin = () => {
        alert("joining...")
    }
    return (
        <>
            <h2 className="text-primary text-xl font-bold pb-2"> {isMyRooms ?"My Chat Rooms" : "All Chat Rooms"} </h2>
            {/* Search bar */}
            <div className="w-full max-w-5xl ">
                <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} onClear={()=> setSearch("")} />
            </div>

            {loading ? (
               <SingleLoader/>
            ) : (
                <RoomsGrid rooms={chatRooms} onJoinClick={handleJoin} />
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-3">
                {[1, 2, 3, 4].map((num) => (
                    <button
                        key={num}
                        className={`w-10 h-10 rounded-full border-2 border-primary text-primary font-semibold hover:bg-accent hover:text-white transition ${num === 1 ? "bg-accent text-white" : ""
                            }`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </>
    )
}

export default RoomPage;