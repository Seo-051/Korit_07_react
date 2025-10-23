import axios, { AxiosRequestConfig } from "axios";
import { CarResponse, Car, CarEntity } from "../types";

const getAxiosConfig = () : AxiosRequestConfig => {
    const token = sessionStorage.getItem('jwt')?.replace('Bearer ', '');

    return {
        headers: {
            'Authorization' : token,
            'Content-Type': 'application/json',
            
        },
    };
};

export const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, getAxiosConfig());

    return response.data._embedded.cars;
}

export const deleteCar = async (link: string) : Promise<CarResponse> => {
    const response = await axios.delete(link, getAxiosConfig());
    return response.data
}

export const addCar = async (car: Car) : Promise<CarResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car, getAxiosConfig());

    return response.data;
}

export const updateCar = async (carEntity: CarEntity): Promise<CarResponse> => {
    const response = await axios.put(carEntity.url, carEntity.car, getAxiosConfig());
    return response.data;
}