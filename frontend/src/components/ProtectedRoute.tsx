import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts";

interface ProtectedRouteProps {
    children: ReactNode;
    requireAuth?: boolean; // true for authenticated routes, false for guest-only routes
}

export default function ProtectedRoute({
    children,
    requireAuth = true,
}: ProtectedRouteProps) {
    const { isAuthenticated, isInitializing } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (isInitializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#2C0F74]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    // Redirect authenticated users away from auth pages (login/signup)
    if (!requireAuth && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Redirect unauthenticated users to login for protected routes
    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
