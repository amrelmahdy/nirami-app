import httpClient from "../helpers/httpClient";
import { Category, CategoryFilters } from "../hooks/categories.hooks";

export const getCategories = async (filters: CategoryFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.query) params.append('query', filters.query);
    if (filters.departmentId) params.append('departmentId', filters.departmentId);

    const url = `http://localhost:3000/categories?${params.toString()}`;
    const result = await httpClient.get(url);
    return result.data;
};