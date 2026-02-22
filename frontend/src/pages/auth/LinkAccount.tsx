import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../contexts";
import logo from "../../assets/bvlogo.png";

const KeyIcon = () => (
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
            d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z"
        />
    </svg>
);

export default function LinkAccount() {
    const [inviteCode, setInviteCode] = useState("");
    const [error, setError] = useState("");
    const { linkPlayer, isLoading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.player) {
            navigate(`/players/${user.player.id}`, { replace: true });
        }
    }, [user, navigate]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!inviteCode.trim()) {
            setError("Please enter your invite code.");
            return;
        }

        try {
            await linkPlayer(inviteCode.trim());
            // useEffect watches user.player and handles redirect once state updates
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Invalid invite code. Please try again.";
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
                        Link Your{" "}
                        <span className="text-[#E879F9]">Account</span>
                    </h1>
                    <p className="text-sm text-gray-400 mb-8">
                        Enter the invite code provided by your league admin to
                        link your account to your player profile.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        <Input
                            label="Invite Code"
                            icon={<KeyIcon />}
                            value={inviteCode}
                            onChange={setInviteCode}
                            placeholder="e.g. a1b2c3d4e5f6"
                        />

                        {error && (
                            <p className="text-red-400 text-sm">{error}</p>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 mt-1"
                        >
                            {isLoading ? "Linking..." : "Link Account →"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
