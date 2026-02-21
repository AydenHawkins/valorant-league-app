import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../contexts";

const BarChartIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
    </svg>
);

const UsersIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
    </svg>
);

const TrophyIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
        />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
    </svg>
);

const ClockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
    </svg>
);

const features = [
    {
        label: "Performance Analytics",
        icon: <BarChartIcon />,
        title: "Track Stats",
        desc: "Deep dive into every round. Our engine tracks your ACS, ADR, and match percentages to give you actionable insights.",
    },
    {
        label: "Finding Teammates",
        icon: <UsersIcon />,
        title: "Build Teams",
        desc: "Connect with players that match your playstyle. Use our recruitment board to find the final piece of your roster.",
    },
    {
        label: "Tournament Play",
        icon: <TrophyIcon />,
        title: "Compete",
        desc: "Join structured tournaments with balanced teams. Earn seasonal points and qualify for the grand finals.",
    },
];

export default function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return (
        <div className="bg-[#0D0A1A] min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 pt-24 pb-20">
                {/* Background glows */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#8B5CF6] opacity-10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E879F9] opacity-[0.06] blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#60A5FA] opacity-[0.05] blur-3xl rounded-full pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2D1B69] bg-[#130D35] text-xs text-[#A5B4FC] mb-8 tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E879F9] animate-pulse" />
                        Season 2 Now Live
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
                        <span className="text-white">Better Vibes</span>
                        <br />
                        <span className="text-[#E879F9] italic">League</span>
                    </h1>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                        The elite ecosystem for competitive Valorant. Analyze
                        your performance, build your team, and dominate the
                        rankings.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Button
                            onClick={() =>
                                navigate(
                                    isAuthenticated ? "/dashboard" : "/signup",
                                )
                            }
                            className="px-8 py-3"
                        >
                            {isAuthenticated
                                ? "Go to Dashboard →"
                                : "Start Competing →"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/teams")}
                            className="px-8 py-3"
                        >
                            Explore Teams
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 border-t border-[#2D1B69] pt-8">
                        {[
                            { value: "20+", label: "Active Players" },
                            { value: "4+", label: "Competitive Teams" },
                            { value: "10+", label: "Award Titles" },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <div className="text-2xl font-black text-white">
                                    {value}
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-4 py-20 border-t border-[#2D1B69]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-extrabold text-white mb-3">
                            Where <span className="text-[#60A5FA]">Casual</span>{" "}
                            Meets{" "}
                            <span className="text-[#60A5FA]">Competitive</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                            BVL provides the tools you need to elevate from
                            casual ranked to organized competitive play.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map(({ label, icon, title, desc }) => (
                            <div
                                key={title}
                                className="bg-[#130D35] border border-[#2D1B69] rounded-xl p-6 hover:border-[#8B5CF6] transition-colors"
                            >
                                <div className="text-xs text-[#A5B4FC] uppercase tracking-widest mb-4">
                                    {label}
                                </div>
                                <div className="text-[#8B5CF6] mb-3">
                                    {icon}
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">
                                    {title}
                                </h3>
                                <p className="text-gray-400 text-sm">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integrity System Section */}
            <section className="px-4 py-20 border-t border-[#2D1B69] bg-[#0A0719]">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white mb-8 leading-snug">
                            Fair Matchmaking &
                            <br />
                            Match Analytics
                        </h2>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5 text-[#60A5FA] shrink-0">
                                    <ShieldCheckIcon />
                                </div>
                                <div>
                                    <div className="text-white font-semibold mb-1">
                                        Competitive Balance
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Our system ensures you play against
                                        evenly matched opponents.
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5 text-[#60A5FA] shrink-0">
                                    <ClockIcon />
                                </div>
                                <div>
                                    <div className="text-white font-semibold mb-1">
                                        Instant Match Reports
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Stats update in real-time as soon as the
                                        match is finalized.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#2D1B69] bg-[#0D0A1A] overflow-hidden">
                        {/* Card header */}
                        <div className="border-b border-[#2D1B69] px-5 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                                <span className="text-xs text-[#A5B4FC] uppercase tracking-widest font-medium">
                                    Match Recap
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">
                                Feb 15, 2026
                            </span>
                        </div>

                        {/* Meta */}
                        <div className="px-5 pt-5 text-center">
                            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                                BVL Season 2 · Week 1
                            </div>
                            <div className="text-xs text-[#A5B4FC]">
                                Best of 3 Series
                            </div>
                        </div>

                        {/* Score */}
                        <div className="px-5 py-6 flex items-center justify-between gap-4">
                            <div className="flex-1 text-center">
                                <div className="text-white font-bold text-sm mb-3 leading-tight">
                                    Last Minute Men
                                </div>
                                <div className="text-4xl font-black text-[#60A5FA]">
                                    2
                                </div>
                                <div className="text-xs text-[#60A5FA] uppercase tracking-widest mt-2 font-semibold">
                                    Winner
                                </div>
                            </div>

                            <div className="text-gray-700 font-black text-xl">
                                —
                            </div>

                            <div className="flex-1 text-center">
                                <div className="text-gray-400 font-bold text-sm mb-3 leading-tight">
                                    Alt Tab Titans
                                </div>
                                <div className="text-4xl font-black text-gray-600">
                                    0
                                </div>
                                <div className="text-xs text-gray-600 uppercase tracking-widest mt-2">
                                    Runner-up
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#2D1B69] px-5 py-3 text-center">
                            <div className="text-xs text-gray-600 uppercase tracking-widest">
                                Regular Season
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-24 border-t border-[#2D1B69] text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-black text-white mb-4">
                        Boost your Vibes -{" "}
                        <span className="text-[#60A5FA]">Get Started!</span>
                    </h2>
                    <p className="text-gray-400 mb-10">
                        Compete with friends, track your stats, and join a
                        friendly competitive community — all in under 2 minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button
                            onClick={() =>
                                navigate(
                                    isAuthenticated ? "/dashboard" : "/signup",
                                )
                            }
                            className="px-8 py-3"
                        >
                            {isAuthenticated
                                ? "Go to Dashboard"
                                : "Sign Up Now"}
                        </Button>
                        <Button variant="outline" className="px-8 py-3">
                            View Leaderboards
                        </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 text-xs text-gray-600 uppercase tracking-widest">
                        <span>Trusted by a community of 1200+ members.</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#2D1B69] px-4 py-12">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-10">
                    <div>
                        <div className="text-white font-bold mb-3 text-sm tracking-wide">
                            Better Vibes League
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The premier destination for competitive Valorant.
                            Track analytics, compete in tournament matches, and
                            rise through the ranks.
                        </p>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                            League
                        </div>
                        <div className="flex flex-col gap-2.5 text-sm text-[#A5B4FC]">
                            <a
                                href="#"
                                className="hover:text-white transition-colors w-fit"
                            >
                                Rules
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors w-fit"
                            >
                                Leaderboards
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors w-fit"
                            >
                                Schedule
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                            Support
                        </div>
                        <div className="flex flex-col gap-2.5 text-sm text-[#A5B4FC]">
                            <a
                                href="#"
                                className="hover:text-white transition-colors w-fit"
                            >
                                FAQ
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors w-fit"
                            >
                                Discord
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors w-fit"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto pt-6 border-t border-[#2D1B69] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
                    <span>
                        © 2026 Better Vibes League. All rights reserved. Not
                        affiliated with Riot Games.
                    </span>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="hover:text-gray-400 transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="hover:text-gray-400 transition-colors"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
