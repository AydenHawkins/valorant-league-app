import { Link, NavLink } from "react-router-dom";
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
                        className="h-15 w-15 object-contain"
                    />
                    <span className="text-lg font-bold text-white tracking-wide">
                        Better Vibes League
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
                    {[
                        { to: "/", label: "Home", end: true },
                        { to: "/teams", label: "Teams" },
                        { to: "/players", label: "Players" },
                        { to: "/matches", label: "Matches" },
                        { to: "/leaderboard", label: "Leaderboard" },
                        { to: "/stats", label: "Stats" },
                    ].map(({ to, label, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `px-3 py-1.5 rounded-md transition-all ${
                                    isActive
                                        ? "text-white bg-white/[0.07]"
                                        : "text-[#A5B4FC] hover:text-white hover:bg-white/[0.07]"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `text-sm px-3 py-1.5 rounded-md transition-all ${
                                        isActive
                                            ? "text-white bg-white/[0.07]"
                                            : "text-[#A5B4FC] hover:text-white hover:bg-white/[0.07]"
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to={`/profile/${user?.username}`}
                                className={({ isActive }) =>
                                    `text-sm px-3 py-1.5 rounded-md transition-all ${
                                        isActive
                                            ? "text-white bg-white/[0.07]"
                                            : "text-gray-400 hover:text-white hover:bg-white/[0.07]"
                                    }`
                                }
                            >
                                {user?.username}
                            </NavLink>
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
