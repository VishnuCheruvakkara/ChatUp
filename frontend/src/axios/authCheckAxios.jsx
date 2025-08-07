import userAxios from "./userAuthenticationInterceptor";

export const checkUserAuthStatus = async ()=>{
    try{
        const response = await userAxios.get('/users/check-status/')
        return response.data;
    }catch(error){
        return {authenticated : false};
    }
}