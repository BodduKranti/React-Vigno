import axios from "axios"
// from the below we can CURD OPERATION for this site
export const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

// from the below we can get url for the geolocation
export const AxiosGetolocation = axios.create({
    baseURL: import.meta.env.VITE_GEOLOCATION_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

// from the below we can get url for the geolocation
export const AxiosFormData = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

// header pass token
AxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})