import httpClient from "../../helpers/httpClient";
// import { Brand } from "./brands.hooks";

export const getBrands = async () => {
    const result = await httpClient.get("http://localhost:3000/brands");
    return result.data;
}
