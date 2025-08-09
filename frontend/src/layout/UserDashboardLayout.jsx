import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FiPlusCircle, FiGrid, FiCompass } from "react-icons/fi";
import Button from "../components/Button";
import {Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function userDashboardLayout() {
    const navigate = useNavigate();
    return (
        <>
            <NavBar />
            <div className="w-full min-h-[80vh] bg-bgBase flex flex-col items-center sm:px-6 px-4 lg:px-40 py-6">
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 w-full max-w-4xl">

                    <Button onClick={()=>navigate("/user/dashboard/create-room")} icon={FiPlusCircle} className="border border-primary bg-bgBase text-primary px-5 py-2 rounded-full transition font-semibold flex items-center gap-2 hover:bg-bgLight">Create Room</Button>
                    <Button icon={FiGrid} className="border border-primary bg-bgBase text-primary px-5 py-2 rounded-full transition font-semibold flex items-center gap-2 hover:bg-bgLight">My Rooms</Button>
                    <Button icon={FiCompass} className="border border-primary bg-bgBase text-primary px-5 py-2 rounded-full transition font-semibold flex items-center gap-2 hover:bg-bgLight">Explore</Button>

                </div>

               

                {/* Cards grid */}
                <Outlet/>

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
            </div>
            <Footer />
        </>
    );
}

export default userDashboardLayout;
