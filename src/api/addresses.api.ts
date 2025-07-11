import httpClient from "../helpers/httpClient";
import { Address } from "../hooks/addresses.hooks";
import { ProductFilters } from "../hooks/products.hooks";


export const getAddresses = async () => {
    const result = await httpClient.get('/addresses');
    return result.data;
};


export const getAddressDetails = async (addressId: string) => {
    const result = await httpClient.get(`/addresses/${addressId}`);
    return result.data;
}

export const addAddress = async (newAddress: Address) => {
    const result = await httpClient.post('/addresses', newAddress);
    return result.data;
}

export const updateAddress = async (addressId: string, newAddress: Address) => {
    const result = await httpClient.put(`/addresses/${addressId}`, newAddress);
    return result.data;
}

