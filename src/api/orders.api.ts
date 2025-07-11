import httpClient from "../helpers/httpClient";

export const getOrders = async () => {
    const result = await httpClient.get("/orders");
    return result.data;
}

export const checkout = async (order: { 
    paymentMethod: string;
    paymentStatus: string;
    shippingAddress?: string;
    status: string;
}) => {
    const result = await httpClient.post(`/orders/checkout`, order);
    return result.data;
}


export const getOrderDetails = async (orderId: string) => {
    const result = await httpClient.get(`/orders/${orderId}`);
    return result.data;
}
