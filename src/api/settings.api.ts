import httpClient from "../helpers/httpClient";

export const getAllSettings = async () => {
    const result = await httpClient.get("/settings");
    return result.data;
}


