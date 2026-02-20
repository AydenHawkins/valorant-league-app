import { useAuth } from "../contexts";
import Button from "../components/Button";

export default function Dashboard() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#2C0F74] text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-[#25C8FF] mb-2">
                                Welcome to your Dashboard
                            </h1>
                            <p className="text-lg text-gray-300">
                                Hello,{" "}
                                <span className="text-[#A020F0] font-semibold">
                                    {user?.username}
                                </span>
                                !
                            </p>
                        </div>
                        <Button onClick={handleLogout} variant="danger">
                            Logout
                        </Button>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-[#1B0252] rounded-xl p-6 border border-[#A020F0]">
                            <h2 className="text-xl font-bold text-[#25C8FF] mb-4">
                                Profile
                            </h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-semibold">
                                        Username:
                                    </span>{" "}
                                    {user?.username}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {user?.email}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        User ID:
                                    </span>{" "}
                                    {user?.id}
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#1B0252] rounded-xl p-6 border border-[#A020F0]">
                            <h2 className="text-xl font-bold text-[#25C8FF] mb-4">
                                Quick Actions
                            </h2>
                            <div className="space-y-3">
                                <Button className="w-full">Create Team</Button>
                                <Button className="w-full">Join League</Button>
                                <Button className="w-full">View Matches</Button>
                            </div>
                        </div>

                        <div className="bg-[#1B0252] rounded-xl p-6 border border-[#A020F0]">
                            <h2 className="text-xl font-bold text-[#25C8FF] mb-4">
                                Recent Activity
                            </h2>
                            <p className="text-gray-400">No recent activity</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
