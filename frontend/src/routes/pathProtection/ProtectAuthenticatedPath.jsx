import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PageLoader from "../../components/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser, finishLoading } from "../../redux/userSlice";
import userAxios from "../../axios/userAuthenticationInterceptor";

const ProtectAuthetictedPath = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (loading) {
            const fetchUser = async () => {
                try {
                    const response = await userAxios.get("/users/get-user-profile");
                    dispatch(setUser(response.data));
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    dispatch(clearUser());
                } finally {
                    dispatch(finishLoading());
                }
            };
            fetchUser();
        }
    }, [loading, dispatch]);

    if (loading) {
        return <PageLoader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default ProtectAuthetictedPath