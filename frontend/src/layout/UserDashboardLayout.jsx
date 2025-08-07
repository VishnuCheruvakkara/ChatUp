import {useEffect,useState} from 'react'
import NavBar from "../components/NavBar";
import userAxios from '../axios/userAuthenticationInterceptor';

function userDashboardLayout() {
    const [user,setUser]=useState(null);

    useEffect (()=>{
        const fetchUser = async ()=>{
            try{
                const response = await userAxios.get('/users/get-user-profile');
                console.log(response.data)
            }catch(error){
                console.error("Failed to fetch user",error)
            }
        }
        fetchUser();
    },[])
    
    return (
        <>
        <NavBar/>
        <div>
            User dash board ////////
        </div>
        </>
    )
}

export default userDashboardLayout;
