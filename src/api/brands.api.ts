import httpClient from "../helpers/httpClient";
// import { Brand } from "./brands.hooks";

export const getBrands = async () => {
    const result = await httpClient.get("/brands");
    return result.data;
}
