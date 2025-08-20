import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FiPlusCircle, FiGrid, FiCompass } from "react-icons/fi";
import Button from "../components/Button";
import {Outlet, useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function userDashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <NavBar />
            <div className="w-full min-h-[80vh] bg-bgBase flex flex-col items-center sm:px-6 px-4 lg:px-40 py-5">
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 w-full max-w-5xl border-b border-primary pb-5">

                    <Button onClick={()=>navigate("/user/dashboard/create-room")} icon={FiPlusCircle} className={`border border-primary bg-bgBase text-primary px-5 py-2 rounded-full transition font-semibold flex items-center gap-2 shadow-lg ${isActive("/user/dashboard/create-room")? "bg-primary hover:bg-primary text-bgBase":"bg-bgBase hover:bg-bgLight" }`}>Create Room</Button>
                    <Button onClick={()=>navigate("/user/dashboard/my-rooms")} icon={FiGrid} className={`border border-primary bg-bgBase text-primary px-5 py-2 rounded-full transition font-semibold flex items-center gap-2 shadow-lg ${isActive("/user/dashboard/my-rooms")? "bg-primary hover:bg-primary text-bgBase":"bg-bgBase hover:bg-bgLight" }`}>My Rooms</Button>
                    <Button onClick={()=>navigate("/user/dashboard/all-rooms")} icon={FiCompass} className={`border border-primary bg-bgBase text-primary px-5 py-2 rounded-full transition font-semibold flex items-center gap-2 shadow-lg ${isActive("/user/dashboard/all-rooms")? "bg-primary hover:bg-primary text-bgBase":"bg-bgBase hover:bg-bgLight" }`}>Explore</Button>

                </div>

                {/* Cards grid */}
                <Outlet/>
                
            </div>
            <Footer />
        </>
    );
}

export default userDashboardLayout;
