import httpClient from "../helpers/httpClient";
// import { Brand } from "./brands.hooks";

export const getDepartments = async () => {
    const result = await httpClient.get("/departments");
    return result.data;
}
