import {useEffect,useState} from 'react'
import NavBar from "../components/NavBar";
import userAxios from '../axios/userAuthenticationInterceptor';
import { useDispatch,useSelector } from 'react-redux';
import { setUser,clearUser } from '../redux/userSlice';
import PageLoader from '../components/PageLoader';

function userDashboardLayout() {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);

    useEffect (()=>{
        const fetchUser = async ()=>{
            setLoading(true);
            try{
                const response = await userAxios.get('/users/get-user-profile');
                dispatch(setUser(response.data));
            }catch(error){
                console.error("Failed to fetch user",error)
                dispatch(clearUser());
            }finally{
                setLoading(false);
            }
        }
        fetchUser();
    },[])
    
    return (
        <>
        {loading && <PageLoader/>}
        <NavBar/>
        <div>
            User dash board ////////
        </div>
        </>
    )
}

export default userDashboardLayout;
