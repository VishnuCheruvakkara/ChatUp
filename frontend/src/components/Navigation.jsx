import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerGlobalNavigate } from "../services/navigationService";

function NavigationWrapper({children}){
    const navigate = useNavigate();
    useEffect(()=>{
        registerGlobalNavigate(navigate);
    },[navigate])

    return (
        <>
        {children}
        </>
    )
}

export default NavigationWrapper;