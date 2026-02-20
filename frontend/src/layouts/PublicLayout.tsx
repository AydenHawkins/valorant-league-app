import { Outlet } from "react-router-dom";
import NavigationHeader from "../components/NavigationHeader";

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-[#2C0F74] text-white">
            <NavigationHeader />
            <Outlet />
        </div>
    );
}
