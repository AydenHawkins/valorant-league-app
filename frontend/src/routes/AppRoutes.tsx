import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/public/Home";
// import Leagues from "../pages/public/Leagues";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public pages */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/leagues" element={<Leagues />} /> */}
            </Route>

            {/* Auth pages */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
        </Routes>
    );
}
