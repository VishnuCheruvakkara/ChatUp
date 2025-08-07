import axios from 'axios';

const publicAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials:False,
})

export default publicAxios;