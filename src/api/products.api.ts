import httpClient from "../helpers/httpClient";
import { ProductFilters } from "../hooks/products.hooks";




export const getProducts = async (filters: ProductFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.query) params.append('query', filters.query);
    if (filters.groupId) params.append('groupId', filters.groupId);
    if (filters.categoryId) params.append('categoryId', filters.categoryId);
    if (filters.brandId) params.append('brandId', filters.brandId);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
     if (filters.price) params.append('price', filters.price);
    const url = `http://localhost:3000/products?${params.toString()}`;
    const result = await httpClient.get(url);
    return result.data;
};
