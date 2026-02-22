import { createContext } from "react";

export interface LinkedPlayer {
    id: number;
    name: string;
    tag: string;
    puuid: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    player: LinkedPlayer | null;
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    signup: (
        username: string,
        email: string,
        password: string,
    ) => Promise<void>;
    logout: () => Promise<void>;
    linkPlayer: (inviteCode: string) => Promise<void>;
    isLoading: boolean;
    isInitializing: boolean;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);
