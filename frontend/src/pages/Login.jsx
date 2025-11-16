import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { authService } from "../services/auth";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // Validation
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        setIsLoading(true);

        try {
            await authService.login(username, password);
            // Redirect to dashboard or home after successful login
            navigate("/");
        } catch (err) {
            setError(err.message || "Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Username"
                        type="text"
                        value={username}
                        onChange={setUsername}
                        placeholder="Enter your username"
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Enter your password"
                    />

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
