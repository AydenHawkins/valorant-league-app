const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface ApiResponse<T = any> {
    error?: string;
    [key: string]: any;
}

export const api = {
    async post<T = any>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include HTTP-only cookies
            body: JSON.stringify(data),
        });

        const responseData: ApiResponse<T> = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error || 'An error occurred');
        }

        return responseData as T;
    },

    async get<T = any>(endpoint: string): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include HTTP-only cookies
        });

        const responseData: ApiResponse<T> = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error || 'An error occurred');
        }

        return responseData as T;
    },
};
