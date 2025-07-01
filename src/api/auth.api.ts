import httpClient from "../helpers/httpClient";

export const sendAnOTPForLoginOrRegister = async (phoneOrEmail: string) => {
    const result = await httpClient.post("/auth/send-otp", {
       phoneOrEmail

    });
    return result.data;
}


export const verifyOTPForLoginOrRegister = async (phoneOrEmail: string, otp: string) => {
    const result = await httpClient.post("/auth/verify-otp", {
        phoneOrEmail, otp
    });
    return result.data;
}


export const register = async (phoneOrEmail: string) => {
    const result = await httpClient.post("/auth/otp-register", {
        phoneOrEmail,
    });
    return result.data;
}

export const login = async  (phoneOrEmail: string, otp: string) => {
    const result = await httpClient.post("/auth/otp-login", {
        phoneOrEmail,
        otp
    });
    return result.data;
}

export const refreshAccessToken = async (refresh: string) => {
    const result = await httpClient.post("/auth/refresh", {
        refresh
    });
    return result.data;
}

export const getCurrentUser = async () => {
    const result = await httpClient.get("/auth/user");
    return result.data;
}




