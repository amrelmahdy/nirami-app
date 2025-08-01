import httpClient from "../helpers/httpClient";
import { Address } from "../hooks/addresses.hooks";
import { ProductFilters } from "../hooks/products.hooks";






export const getTickets = async () => {
    const result = await httpClient.get('/tickets');
    return result.data;
};


// export const getTicketDetails = async (addressId: string) => {
//     const result = await httpClient.get(`/addresses/${addressId}`);
//     return result.data;
// }

export const addTicket = async (ticket: Ticket) => {
    const result = await httpClient.post('/tickets', ticket);
    return result.data;
}

// export const updateAddress = async (addressId: string, newAddress: Address) => {
//     const result = await httpClient.put(`/tickets/${addressId}`, newAddress);
//     return result.data;
// }

