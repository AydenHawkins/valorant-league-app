import { Link } from "react-router-dom";
import { useAuth } from "../contexts";
import Button from "./Button";
import logo from "../assets/bvlogo.png";

export default function NavigationHeader() {
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="bg-[#0D0A1A] border-b border-[#2D1B69] px-4 py-3">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="BVL Logo"
                        className="h-8 w-8 object-contain"
                    />
                    <span className="text-lg font-bold text-white tracking-wide">
                        Better Vibes League
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
                    <Link
                        to="/"
                        className="text-[#A5B4FC] hover:text-white hover:bg-white/[0.07] px-3 py-1.5 rounded-md transition-all"
                    >
                        Home
                    </Link>
                    <Link
                        to="/teams"
                        className="text-[#A5B4FC] hover:text-white hover:bg-white/[0.07] px-3 py-1.5 rounded-md transition-all"
                    >
                        Teams
                    </Link>
                    <Link
                        to="/players"
                        className="text-[#A5B4FC] hover:text-white hover:bg-white/[0.07] px-3 py-1.5 rounded-md transition-all"
                    >
                        Players
                    </Link>
                    <Link
                        to="/matches"
                        className="text-[#A5B4FC] hover:text-white hover:bg-white/[0.07] px-3 py-1.5 rounded-md transition-all"
                    >
                        Matches
                    </Link>
                    <Link
                        to="/leaderboard"
                        className="text-[#A5B4FC] hover:text-white hover:bg-white/[0.07] px-3 py-1.5 rounded-md transition-all"
                    >
                        Leaderboard
                    </Link>
                    <Link
                        to="/stats"
                        className="text-[#A5B4FC] hover:text-white hover:bg-white/[0.07] px-3 py-1.5 rounded-md transition-all"
                    >
                        Stats
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-sm text-[#A5B4FC] hover:text-white hover:bg-white/[0.07] px-3 py-1.5 rounded-md transition-all"
                            >
                                Dashboard
                            </Link>
                            <span className="text-sm text-gray-500">
                                {user?.username}
                            </span>
                            <Button
                                onClick={handleLogout}
                                variant="danger"
                                className="text-sm px-3 py-1"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm text-[#A5B4FC] hover:text-white hover:bg-white/[0.07] px-3 py-1.5 rounded-md transition-all"
                            >
                                Login
                            </Link>
                            <Link to="/signup">
                                <Button className="text-sm px-4 py-1.5">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
