import { useEffect, useState } from "react";
import RoomsGrid from "../components/RoomCard";
import SearchBar from "../components/SearchBar";
import userAxios from "../axios/userAuthenticationInterceptor";
import SingleLoader from "../components/SingleLoader";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";

function RoomPage() {
    const location = useLocation();
    const [chatRooms, setChatRooms] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const isMyRooms = location.pathname.includes("/my-rooms");
    const isAllRooms = location.pathname.includes("/all-rooms");

    useEffect(() => {
        const getAllChatRooms = async () => {
            setLoading(true);
            try {
                let url = "/chat/get-all-rooms/";
                if (isMyRooms) {
                    url = "/chat/get-all-rooms/?mine=true";
                }
                const response = await userAxios.get(url, { params: { search, page } });
                console.log(response.data)
                setChatRooms(response.data.results);
                const totalCount=response.data.count;
                const pageSize = 6;
                setTotalPages(Math.ceil(totalCount/pageSize));
            } catch (error) {
                console.error("Errror when fecthing chat rooms", error)
            } finally {
                setLoading(false);
            }
        }
        getAllChatRooms();
    }, [isAllRooms, isMyRooms, search, page])

    const handleJoin = () => {
        alert("joining...")
    }
    return (
        <>
            <h2 className="text-primary text-xl font-bold pb-2"> {isMyRooms ? "My Chat Rooms" : "All Chat Rooms"} </h2>
            {/* Search bar */}
            <div className="w-full max-w-5xl ">
                <SearchBar value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} onClear={() => { setSearch(""); setPage(1); }} />
            </div>

            {loading ? (
                <SingleLoader />
            ) : (
                <RoomsGrid rooms={chatRooms} onJoinClick={handleJoin} />
            )}

            {/* Pagination */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </>
    )
}

export default RoomPage;