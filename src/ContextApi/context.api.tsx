import { createContext, useContext, ReactNode } from 'react';
import { ApiService } from '../ApiServices/api.service';
import { useUserInfo } from '../Hooks/context.hooks';


interface AuthContextType {
    apiService: ApiService,
    setToken: (token: string) => void,
    isTokenValid: () => void,
    isAuthenticated: boolean,
    setIsAuthenticated: (t: boolean) => void,
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { apiService, setToken, isAuthenticated, setIsAuthenticated, isTokenValid } = useUserInfo();

    return (
        <AuthContext.Provider value={{ apiService, setToken, isAuthenticated, setIsAuthenticated, isTokenValid }} >
            {children}
        </AuthContext.Provider >
    );
}

export const useAuth = () => useContext(AuthContext);
