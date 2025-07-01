import httpClient from "../helpers/httpClient";

export const getCart = async () => {
    const result = await httpClient.get("/cart");
    return result.data;
}

export const addToCart = async (productId: string) => {
    const result = await httpClient.post(`/cart/add/${productId}`);
    return result.data;
}


export const removeFromCart = async ({ productId, removeCompletely }: { productId: string, removeCompletely?: boolean }) => {

    const params = new URLSearchParams();

    if (removeCompletely) params.append('removeCompletely', String(removeCompletely));
    // if (filters.groupId) params.append('groupId', filters.groupId);
    // if (filters.categoryId) params.append('categoryId', filters.categoryId);
    // if (filters.brandId) params.append('brandId', filters.brandId);
    // if (filters.sortBy) params.append('sortBy', filters.sortBy);
    // if (filters.priceFrom) params.append('priceFrom', filters.priceFrom);
    //  if (filters.priceTo) params.append('priceTo', filters.priceTo);
    const url = `/cart/remove/${productId}?${params.toString()}`;


    const result = await httpClient.post(url);
    return result.data;
}


export const clearCart = async () => {
    const result = await httpClient.post("cart/clear");
    return result.data;
}


export const orderCart = async () => {
    const result = await httpClient.post("/cart/order");
    return result.data;
}
