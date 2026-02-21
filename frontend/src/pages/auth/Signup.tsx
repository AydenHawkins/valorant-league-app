import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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

const MailIcon = () => (
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
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
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

const ShieldIcon = () => (
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
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
    </svg>
);

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
        <div className="relative min-h-screen flex items-center justify-center bg-[#0D0A1A] overflow-hidden px-4 py-12">
            <div className="relative z-10 w-full max-w-lg">
                <div className="w-full bg-[#130D35] border border-[#2D1B69] rounded-xl overflow-hidden">
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
                            Join The{" "}
                            <span className="text-[#E879F9] text-2xl">
                                League
                            </span>
                        </h1>
                        <p className="text-sm text-gray-400 mb-8">
                            Create your competitor profile and start climbing
                            the ranks.
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
                                label="Email"
                                icon={<MailIcon />}
                                type="email"
                                value={email}
                                onChange={setEmail}
                                placeholder="Email"
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Password"
                                    icon={<LockIcon />}
                                    type="password"
                                    value={password}
                                    onChange={setPassword}
                                    placeholder="••••••••"
                                />
                                <Input
                                    label="Verify Password"
                                    icon={<ShieldIcon />}
                                    type="password"
                                    value={confirmPassword}
                                    onChange={setConfirmPassword}
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <p className="text-red-400 text-sm">{error}</p>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 mt-1"
                            >
                                {isLoading
                                    ? "Creating Account..."
                                    : "Sign Up →"}
                            </Button>
                        </form>

                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-[#2D1B69]" />
                            <span className="text-xs text-gray-600 tracking-widest uppercase">
                                Already Registered?
                            </span>
                            <div className="flex-1 h-px bg-[#2D1B69]" />
                        </div>

                        <Button
                            variant="outline"
                            className="w-full py-3"
                            onClick={() => navigate("/login")}
                        >
                            Log In to Account
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
