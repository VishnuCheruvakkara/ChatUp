import axios from 'axios';
import { showGlobalToast } from '../services/ToastService';
import { navigateTo } from '../services/navigationService';

let isSessionExpiredHandle = false;
const userAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

const refreshAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// Auto refresh access token request logic 
userAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshAxios.post('/users/token/refresh/');
                return userAxios(originalRequest);
            } catch (refreshError) {
                if (!isSessionExpiredHandle) {
                    isSessionExpiredHandle = true
                    console.error('Token refresh failed', refreshError);
                    showGlobalToast("Session expired. Please log in again.", "warning");
                    navigateTo('/');
                }
                return;
            }
        }
        return Promise.reject(error);
    }
)

export default userAxios;