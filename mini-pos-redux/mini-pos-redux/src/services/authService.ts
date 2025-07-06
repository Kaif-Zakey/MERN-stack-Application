import type { User } from "../types/User.ts";
import { apiClient } from "./apiClient";

export interface SignupResponse{
    name : string
    email : string
    _id : string
}

export interface LoginResponse{
    name : string
    email : string
    accessToken: string
    _id : string
}

export const signUp = async (userData: User): Promise<SignupResponse> => {
    const response = await apiClient.post("/auth/signup", userData);
    return response.data;
};

export const login = async (loginData: Omit<User, "name">): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", loginData);
    return response.data;
};

export const logout = (): void => {
    localStorage.removeItem("user");
};