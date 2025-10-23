import axios, { AxiosRequestConfig } from "axios";

const getAxiosConfig = () : AxiosRequestConfig => {
    const token = sessionStorage.getItem('jwt')?.replace('Bearer ', '');

    return {
        headers: {
            'Authorization' : token,
            'Content-Type': 'application/json',
            
        },
    };
};

export const getItems = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`,  getAxiosConfig());
    console.log(response.data)
    return response.data;
}
