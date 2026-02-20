import { Link } from "react-router-dom";
import { useAuth } from "../contexts";
import Button from "./Button";

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
        <header className="bg-[#1B0252] border-b border-[#A020F0] px-4 py-3">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-2xl font-bold text-[#25C8FF] hover:text-[#33E3CC] transition-colors"
                >
                    Better Vibes League
                </Link>

                <nav className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-[#89E3FF] hover:text-[#25C8FF] transition-colors"
                            >
                                Dashboard
                            </Link>
                            <span className="text-gray-400">
                                Welcome,{" "}
                                <span className="text-[#A020F0] font-semibold">
                                    {user?.username}
                                </span>
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
                                className="text-[#89E3FF] hover:text-[#25C8FF] transition-colors"
                            >
                                Login
                            </Link>
                            <Link to="/signup">
                                <Button className="text-sm px-4 py-2">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
