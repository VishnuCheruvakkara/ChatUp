import { useEffect, useState,useMemo } from "react";
import {debounce} from "lodash";
import RoomsGrid from "../components/RoomCard";
import SearchBar from "../components/SearchBar";
import userAxios from "../axios/userAuthenticationInterceptor";
import SingleLoader from "../components/SingleLoader";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import useModal from "../hooks/useModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useToast } from "../components/Toast";
import { useNavigate } from "react-router-dom";

function RoomPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const {showToast} = useToast();
    const [chatRooms, setChatRooms] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [roomToDelete,setRoomToDelete] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const isMyRooms = location.pathname.includes("/my-rooms");
    const isAllRooms = location.pathname.includes("/all-rooms");

    const debouncedSearch = useMemo(
        ()=>debounce((value) => {
            setSearch(value);
            setPage(1);
        },500),
        []
    )

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
                const totalCount = response.data.count;
                const pageSize = 6;
                setTotalPages(Math.ceil(totalCount / pageSize));
            } catch (error) {
                console.error("Errror when fecthing chat rooms", error)
            } finally {
                setLoading(false);
            }
        }
        getAllChatRooms();

        return() => {
            debouncedSearch.cancel();
        }

    }, [isAllRooms, isMyRooms, search, page, debouncedSearch])

    const handleJoin = (roomId) => {
        navigate(`/user/dashboard/chat-room/${roomId}`)
    }

    const handleDeleteClick = (room) => {
        setRoomToDelete(room);
        openModal();
    }

    const confirmDelete = async (roomId) => {
        try {
            await userAxios.post(`/chat/delete-room/${roomId}/`);
            showToast("Room deleted successfully","success")
            setChatRooms((prev) => prev.filter((room) => room.id !== roomId));
        } catch (error) {
            console.error("Error deleting room", error);
        }finally{
            closeModal();
            setRoomToDelete(null);
        }
    };

    return (
        <>
            <h2 className="text-primary text-xl font-bold pb-2"> {isMyRooms ? "My Chat Rooms" : "All Chat Rooms"} </h2>
            {/* Search bar */}
            <div className="w-full max-w-5xl ">
                <SearchBar value={searchInput} onChange={(e) => {debouncedSearch(e.target.value); setSearchInput(e.target.value); }} onClear={() => { setSearchInput(""); setSearch(""); setPage(1); }} />
            </div>

            {loading ? (
                <SingleLoader />
            ) : (
                <RoomsGrid rooms={chatRooms} onJoinClick={handleJoin} onDeleteClick={handleDeleteClick} />
            )}

            {/* Pagination */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
            />
            <ConfirmationModal
                isOpen={isOpen}
                title="Delete Room"
                message={`Are you sure you want to delete this room ( ${roomToDelete?.name} ) ? This action cannot be undone.`}
                onConfirm={()=> confirmDelete(roomToDelete?.id)}
                onCancel={closeModal}
            />
        </>
    )
}

export default RoomPage;