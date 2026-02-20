import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../contexts";

function Home() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0118] to-[#1A0A2E] px-4">
            <div className="w-full max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#25C8FF] drop-shadow-md mb-4">
                        Welcome to Better Vibes League
                    </h1>
                    {isAuthenticated ? (
                        <p className="text-xl text-[#A020F0] mb-2">
                            Welcome back,{" "}
                            <span className="font-semibold">
                                {user?.username}
                            </span>
                            !
                        </p>
                    ) : (
                        <p className="text-xl text-[#89E3FF] mb-2">
                            Compete, Track, and Dominate
                        </p>
                    )}
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        {isAuthenticated
                            ? "Continue your competitive journey and dominate the leaderboards."
                            : "Join the ultimate competitive platform for Valorant players. Create your team, track your stats, and compete in organized leagues."}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#1B0252] rounded-xl p-6 border border-[#A020F0] shadow-xl hover:shadow-[0_0_15px_#A020F0] transition-shadow">
                        <h3 className="text-xl font-bold text-[#25C8FF] mb-3">
                            Track Stats
                        </h3>
                        <p className="text-gray-300 text-sm">
                            Monitor your performance and see detailed analytics
                            of your gameplay.
                        </p>
                    </div>

                    <div className="bg-[#1B0252] rounded-xl p-6 border border-[#A020F0] shadow-xl hover:shadow-[0_0_15px_#A020F0] transition-shadow">
                        <h3 className="text-xl font-bold text-[#25C8FF] mb-3">
                            Build Teams
                        </h3>
                        <p className="text-gray-300 text-sm">
                            Create or join teams and compete together in
                            organized leagues.
                        </p>
                    </div>

                    <div className="bg-[#1B0252] rounded-xl p-6 border border-[#A020F0] shadow-xl hover:shadow-[0_0_15px_#A020F0] transition-shadow">
                        <h3 className="text-xl font-bold text-[#25C8FF] mb-3">
                            Compete
                        </h3>
                        <p className="text-gray-300 text-sm">
                            Participate in competitive leagues and climb the
                            rankings.
                        </p>
                    </div>
                </div>

                <div className="bg-[#1B0252] rounded-xl p-8 border border-[#A020F0] shadow-xl text-center">
                    <h2 className="text-2xl font-bold text-[#25C8FF] mb-4">
                        {isAuthenticated
                            ? "Continue Your Journey"
                            : "Ready to Get Started?"}
                    </h2>
                    <p className="text-gray-300 mb-6">
                        {isAuthenticated
                            ? "Access your dashboard to manage teams, view stats, and compete."
                            : "Create an account or sign in to start your competitive journey."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        {isAuthenticated ? (
                            <Button
                                onClick={() => navigate("/dashboard")}
                                className="w-full"
                            >
                                Go to Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={() => navigate("/signup")}
                                    className="w-full"
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    onClick={() => navigate("/login")}
                                    className="w-full"
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
