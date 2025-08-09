import RoomsGrid from "../components/RoomCard";
import SearchBar from "../components/SearchBar";

function RoomPage() {
    return (
        <>
            {/* Search bar */}
            <div className="w-full max-w-5xl mb-6">
                <SearchBar onChange={(e) => setSearch(e.target.value)} />
            </div>
            <RoomsGrid />
        </>
    )
}

export default RoomPage;