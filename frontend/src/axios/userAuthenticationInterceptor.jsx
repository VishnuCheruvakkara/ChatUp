import axios from 'axios';

const userAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// Auto refresh access token request logic 
userAxios.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try{
                await userAxios.post('/users/token/refresh/');
                return userAxios(originalRequest);
            }catch(refreshError){
                console.error('Token refresh failed',refreshError);
                alert("Session expired. Please log in again.");
                window.location.href = '/login';
                return;
            }
        }
        return Promise.reject(error);
    }
)

export default userAxios;