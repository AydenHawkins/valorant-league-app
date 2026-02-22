import { api } from './api';
import { User } from '../contexts/AuthContextValue';

interface AuthResponse {
    user: User;
    message?: string;
}

interface LinkResponse {
    user: User;
}

export const authService = {
    async signup(username: string, email: string, password: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/signup', {
            username,
            email,
            password,
        });

        // Token is now stored in HTTP-only cookie by the server
        // Only store user data in localStorage
        if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    },

    async login(username: string, password: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', {
            username,
            password,
        });

        // Token is now stored in HTTP-only cookie by the server
        // Only store user data in localStorage
        if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    },

    async logout(): Promise<void> {
        // Call backend to clear the HTTP-only cookie
        try {
            await api.post('/auth/logout', {});
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear local user data
            localStorage.removeItem('user');
        }
    },

    getUser(): User | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    async linkPlayer(inviteCode: string): Promise<LinkResponse> {
        const response = await api.post<LinkResponse>('/users/link', { inviteCode });

        if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    },

    isAuthenticated(): boolean {
        // Check if user data exists in localStorage
        // The actual token validation happens on the server
        return !!this.getUser();
    },
};
