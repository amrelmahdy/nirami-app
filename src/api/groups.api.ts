import httpClient from "../helpers/httpClient";
import { GroupFilters } from "../hooks/groups.hooks";




export const getGroups = async (filters: GroupFilters = {}) => {
    console.log("Filters", filters);
    const params = new URLSearchParams();

    if (filters.query) params.append('query', filters.query);
    if (filters.categoryId) params.append('categoryId', filters.categoryId);

    const url = `http://localhost:3000/groups?${params.toString()}`;
    const result = await httpClient.get(url);
    return result.data;
};
