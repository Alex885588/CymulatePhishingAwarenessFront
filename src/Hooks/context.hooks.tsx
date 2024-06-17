import { useState } from "react";

import { ApiService } from "../ApiServices/api.service";

const apiService = new ApiService();

export function useUserInfo() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)


    const isTokenValid = async () => {
        const token: any = localStorage.getItem('token')
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        apiService.setToken(token)
        const result = await apiService.isTokenValid()
        if (!result) {
            setIsAuthenticated(false)
            return;
        }
        setIsAuthenticated(true)
    }

    const setToken = async (token: string) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true);
    }
    return { apiService, setToken, isAuthenticated, setIsAuthenticated, isTokenValid };
}