import { useState, FormEvent } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../contexts";
import logo from "../../assets/bvlogo.png";

const PersonIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
    </svg>
);

const LockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
    </svg>
);

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

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
        <div className="relative min-h-screen flex items-center justify-center bg-[#0D0A1A] overflow-hidden px-4">
            <div className="relative z-10 w-full max-w-md bg-[#130D35] border border-[#2D1B69] rounded-xl overflow-hidden">
                {/* Pink accent line */}
                <div className="h-0.5 bg-gradient-to-r from-[#8B5CF6] via-[#E879F9] to-[#60A5FA]" />

                <div className="p-8">
                    {/* Logo */}
                    <div className="flex items-center gap-4 mb-8">
                        <img
                            src={logo}
                            alt="BVL Logo"
                            className="h-25 w-25 object-contain"
                        />
                        <span className="text-3xl font-black tracking-widest text-white uppercase leading-tight text-center">
                            Better Vibes League
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-2xl font-extrabold text-white uppercase mb-1">
                        Welcome Back,{" "}
                        <span className="text-[#E879F9] text-2xl">Player</span>
                    </h1>
                    <p className="text-sm text-gray-400 mb-8">
                        Sign in to your competitive dashboard
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        <Input
                            label="Username"
                            icon={<PersonIcon />}
                            value={username}
                            onChange={setUsername}
                            placeholder="Username"
                        />

                        <Input
                            label="Password"
                            icon={<LockIcon />}
                            type="password"
                            value={password}
                            onChange={setPassword}
                            placeholder="••••••••••"
                        />

                        {error && (
                            <p className="text-red-400 text-sm">{error}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 mt-1"
                        >
                            {isLoading ? "Signing in..." : "Login →"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#60A5FA] hover:text-[#818CF8] transition-colors"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
