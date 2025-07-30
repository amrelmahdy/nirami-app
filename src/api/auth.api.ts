import httpClient from "../helpers/httpClient";
import { User } from "../hooks/user.hooks";

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


export const login = async  (otpId: string, code: string) => {
    const result = await httpClient.post("/auth/otp-login", {
        otpId,
        code
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


export const updateUser = async (userId: string, user: User) => {
    const result = await httpClient.put(`/users/${userId}`, user);
    return result.data;
}




