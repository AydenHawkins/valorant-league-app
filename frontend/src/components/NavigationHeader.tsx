import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts";
import Button from "./Button";
import logo from "../assets/bvlogo.png";

export default function NavigationHeader() {
    const { isAuthenticated, user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                        { to: "/seasons", label: "Seasons" },
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
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() =>
                                        setDropdownOpen((prev) => !prev)
                                    }
                                    className="h-8 w-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#60A5FA] flex items-center justify-center text-sm font-bold text-white hover:ring-2 hover:ring-[#E879F9] transition-all"
                                >
                                    {user?.username?.[0]?.toUpperCase()}
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-44 bg-[#130D35] border border-[#2D1B69] rounded-xl shadow-lg overflow-hidden z-50">
                                        <Link
                                            to={`/profile/${user?.username}`}
                                            onClick={() =>
                                                setDropdownOpen(false)
                                            }
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#A5B4FC] hover:text-white hover:bg-white/[0.07] transition-all"
                                        >
                                            View Profile
                                        </Link>
                                        <div className="border-t border-[#2D1B69]" />
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                handleLogout();
                                            }}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/[0.07] transition-all"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
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
