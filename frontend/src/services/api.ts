const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:4000/api";

interface ApiResponse {
    error?: string;
    [key: string]: unknown;
}

export const api = {
    async post<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const responseData = (await response.json()) as ApiResponse;

        if (!response.ok) {
            throw new Error(responseData.error || "An error occurred");
        }

        return responseData as unknown as T;
    },

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const responseData = (await response.json()) as ApiResponse;

        if (!response.ok) {
            throw new Error(responseData.error || "An error occurred");
        }

        return responseData as unknown as T;
    },
};
