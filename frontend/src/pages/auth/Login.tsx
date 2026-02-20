import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../contexts";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the page user was trying to access before login
    const from = location.state?.from?.pathname || "/dashboard";

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            await login(username, password);
            navigate(from, { replace: true });
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Failed to login. Try again.";
            setError(errorMessage);
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

                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <p className="text-center text-sm text-[#89E3FF] mt-4">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-[#25C8FF] hover:text-[#33E3CC]"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
