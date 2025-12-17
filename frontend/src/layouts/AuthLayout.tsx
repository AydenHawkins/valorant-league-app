import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0118] to-[#1A0A2E] px-4">
            <div className="w-full max-w-lg">
                <Outlet />
            </div>
        </div>
    );
}
