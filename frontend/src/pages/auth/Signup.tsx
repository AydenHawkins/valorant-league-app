import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../contexts";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { signup, isLoading } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!username || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await signup(username, email, password);
            navigate("/dashboard");
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Failed to create account.";
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
                    Sign Up
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Username"
                        value={username}
                        onChange={setUsername}
                        placeholder="Choose a username"
                    />

                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Enter your email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Enter your password"
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Confirm your password"
                    />

                    {error && <p className="text-[#FF4BD5] text-sm">{error}</p>}

                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                </form>

                <p className="text-center text-sm text-[#89E3FF] mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[#25C8FF] hover:text-[#33E3CC]"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
