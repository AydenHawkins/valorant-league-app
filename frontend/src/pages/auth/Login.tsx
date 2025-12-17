import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { authService } from "../../services/auth";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        setIsLoading(true);

        try {
            await authService.login(username, password);
            navigate("/");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to login. Try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center
                        bg-gradient-to-br from-[#0A0118] to-[#1A0A2E] px-4"
        >
            <div
                className="w-full max-w-md bg-[#1B0252]
                            rounded-xl p-8 shadow-xl
                            border border-[#A020F0]"
            >
                <h1
                    className="text-3xl font-extrabold text-center
                               text-[#25C8FF] drop-shadow-md mb-6"
                >
                    Login
                </h1>

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

                    {error && <p className="text-[#FF4BD5] text-sm">{error}</p>}

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <p className="text-center text-sm text-[#89E3FF] mt-4">
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="text-[#25C8FF] hover:text-[#33E3CC]"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
