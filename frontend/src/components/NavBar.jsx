import { useState } from "react";
import Button from "./Button"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import publicAxios from "../axios/publicAxios";
import PageLoader from "./PageLoader";
import { clearUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./Toast";

function NavBar() {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const userName = useSelector(state => state.user.userData?.username)
    const firstLetter = userName?.charAt(0).toUpperCase() || "U";


    const handleSignOut = async () => {
        setLoading(true);
        try {
            const response = await publicAxios.post('/users/logout/')
            dispatch(clearUser());
            showToast("Logout successfully", "success")
            navigate('/')
        } catch (error) {
            console.error("Error while logout:", error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <PageLoader />}
            <header className="w-full py-4 sm:px-8 px-3  flex justify-between items-center border-b border-primary bg-bgBase sticky top-0 z-40">
                <div onClick={() => navigate('/')} className="flex items-center gap-2 text-primary cursor-pointer ">
                    <div className="bg-primary text-white p-2 rounded-full">
                        <IoChatbubbleEllipsesSharp className="text-xl" />
                    </div>
                    <h1 className="sm:text-2xl text-xl font-bold">ChatUP</h1>
                </div>
                <nav className=" flex gap-3">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2">
                                <div className="shrink-0 h-9 w-9 rounded-full bg-bgBase text-primary flex items-center justify-center font-bold border border-primary">
                                    <span className="sm:text-xl text-sm">{firstLetter}</span>
                                </div>

                                <Button onClick={() => handleSignOut()} className="text-xs sm:text-sm">
                                    Sign Out
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => navigate('/sign-in')} className="bg-transparent text-primary border-2 hover:bg-primary hover:text-white border-primary text-xs sm:text-sm" >Login</Button>
                            <Button onClick={() => navigate('/sign-up')} className="text-xs sm:text-sm">Sign Up</Button>
                        </>
                    )}
                </nav>
            </header>
            {isAuthenticated && (
                <div className="w-full text-xs bg-accent text-white text-center py-[1px] font-semibold  z-30 border-b border-primary">
                    Welcome back, {userName || "User"}!
                </div>
            )}
        </>
    )
}

export default NavBar