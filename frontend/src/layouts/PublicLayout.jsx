import { Outlet } from "react-router-dom";

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-[#2C0F74] text-white">
            <Outlet />
        </div>
    );
}
