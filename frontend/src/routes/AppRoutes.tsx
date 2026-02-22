import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/public/Home";
// import Leagues from "../pages/public/Leagues";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard.tsx";
import Profile from "../pages/public/Profile.tsx";
import LinkAccount from "../pages/auth/LinkAccount.tsx";
export default function AppRoutes() {
    return (
        <Routes>
            {/* Public pages */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/leagues" element={<Leagues />} /> */}
                <Route path="/profile/:username" element={<Profile />} />
            </Route>

            {/* Protected pages (require authentication) */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/link"
                element={
                    <ProtectedRoute>
                        <LinkAccount />
                    </ProtectedRoute>
                }
            />

            {/* Auth pages (redirect if already authenticated) */}
            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={
                        <ProtectedRoute requireAuth={false}>
                            <Login />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <ProtectedRoute requireAuth={false}>
                            <Signup />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
}
