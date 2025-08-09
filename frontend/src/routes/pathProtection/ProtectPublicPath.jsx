import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectPublicPath = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    if (isAuthenticated) {
        // If logged in, redirect to dashboard
        return <Navigate to="/user/dashboard" replace />;
    }
    return <Outlet />; // else render child route
};

export default ProtectPublicPath;