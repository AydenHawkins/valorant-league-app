import { useEffect, useState, ReactNode } from "react";
import { authService } from "../services/auth";
import { AuthContext, AuthContextType, User } from "./AuthContextValue.ts";
interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        // Check if user is stored in localStorage on app start
        const storedUser = authService.getUser();
        setUser(storedUser);
        setIsInitializing(false);
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await authService.login(username, password);
            setUser(response.user);
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (
        username: string,
        email: string,
        password: string,
    ): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await authService.signup(
                username,
                email,
                password,
            );
            setUser(response.user);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        setIsLoading(true);
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
            // Even if logout fails on server, clear local state
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const contextValue: AuthContextType = {
        user,
        login,
        signup,
        logout,
        isLoading,
        isInitializing,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
