import { Link, useParams } from "react-router-dom";

// ─── Icons ───────────────────────────────────────────────────────────────────

const CrosshairIcon = () => (
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
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
    </svg>
);

const TrophyIcon = () => (
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
            d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
        />
    </svg>
);

const BoltIcon = () => (
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
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
    </svg>
);

const FireIcon = () => (
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
            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
        />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
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

const TrendingUpIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.45m5.94 2.45-2.45 5.94"
        />
    </svg>
);

const LayersIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5l10.5-6 10.5 6-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
        />
    </svg>
);

const StarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
    </svg>
);

const TrophyLargeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
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

// ─── Static Data ──────────────────────────────────────────────────────────────

const statCards = [
    {
        icon: <CrosshairIcon />,
        label: "K/D Ratio",
        value: "1.48",
        sub: "Top 2% of the League",
        color: "#60A5FA",
    },
    {
        icon: <TrophyIcon />,
        label: "Win Rate",
        value: "68.5%",
        sub: "84 Wins / 99 Losses",
        color: "#8B5CF6",
    },
    {
        icon: <BoltIcon />,
        label: "Combat Score",
        value: "284",
        sub: "Average per Round",
        color: "#E879F9",
    },
    {
        icon: <FireIcon />,
        label: "Headshot %",
        value: "32.4%",
        sub: "Precision Elite",
        color: "#F59E0B",
    },
];

const matchHistory = [
    {
        agent: "Jett",
        agentColor: "#60A5FA",
        result: "WIN",
        mode: "Competitive",
        map: "Ascent",
        score: "13-8",
        kda: "24 / 12 / 6",
        ratio: "2.00",
        time: "2h ago",
    },
    {
        agent: "Reyna",
        agentColor: "#E879F9",
        result: "WIN",
        mode: "Competitive",
        map: "Haven",
        score: "13-4",
        kda: "19 / 8 / 3",
        ratio: "2.37",
        time: "5h ago",
    },
    {
        agent: "Jett",
        agentColor: "#60A5FA",
        result: "LOSS",
        mode: "Competitive",
        map: "Bind",
        score: "11-13",
        kda: "15 / 18 / 4",
        ratio: "0.83",
        time: "Yesterday",
    },
    {
        agent: "Raze",
        agentColor: "#F59E0B",
        result: "WIN",
        mode: "Tournament",
        map: "Lotus",
        score: "13-11",
        kda: "22 / 14 / 8",
        ratio: "1.57",
        time: "Yesterday",
    },
    {
        agent: "Jett",
        agentColor: "#60A5FA",
        result: "WIN",
        mode: "Competitive",
        map: "Sunset",
        score: "13-6",
        kda: "21 / 10 / 5",
        ratio: "2.10",
        time: "2 days ago",
    },
];

const achievements = [
    { title: "Ace Machine", date: "Jan 12", desc: "4 Aces in a single season" },
    { title: "Clutch King", date: "Jan 08", desc: "Won 16 1v3 situations" },
    {
        title: "Sharp Shooter",
        date: "Jan 02",
        desc: "Maintained 30%+ HS for 10 games",
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Profile() {
    const { username } = useParams<{ username: string }>();

    return (
        <div className="bg-[#0D0A1A] min-h-screen text-white py-8 px-4">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs text-gray-500">
                    <Link to="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-white">{username} Profile</span>
                </nav>

                {/* Profile Header */}
                <div className="bg-[#130D35] border border-[#2D1B69] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#60A5FA] flex items-center justify-center text-3xl font-black shrink-0">
                        T
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="text-3xl font-black">{username}</span>
                            <span className="text-gray-500 text-xl font-bold">
                                #GOAT
                            </span>
                            <span className="text-xs bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20 px-2.5 py-0.5 rounded-full font-semibold">
                                Pro Player
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
                            <span className="flex items-center gap-1.5 text-[#A5B4FC]">
                                <ShieldCheckIcon />
                                Verified Account
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded bg-gradient-to-br from-[#8B5CF6] to-[#60A5FA] flex items-center justify-center text-[9px] font-black">
                                    SE
                                </span>
                                Sentinex Esports
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3 shrink-0">
                        <button className="text-sm px-4 py-2 rounded-md font-semibold bg-[#0D0A1A] border border-[#2D1B69] text-[#A5B4FC] hover:border-[#8B5CF6] hover:text-white transition-all">
                            Compare Stats
                        </button>
                        <button className="text-sm px-4 py-2 rounded-md font-semibold bg-[#60A5FA] hover:bg-[#3B82F6] text-white transition-all">
                            Follow Player
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statCards.map(({ icon, label, value, sub, color }) => (
                        <div
                            key={label}
                            className="bg-[#130D35] border border-[#2D1B69] rounded-xl p-4"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div
                                    className="p-2 rounded-lg bg-white/5"
                                    style={{ color }}
                                >
                                    {icon}
                                </div>
                                <span className="text-xs text-gray-500 uppercase tracking-widest text-right leading-tight">
                                    {label}
                                </span>
                            </div>
                            <div
                                className="text-3xl font-black mb-1"
                                style={{ color }}
                            >
                                {value}
                            </div>
                            <div className="text-xs text-gray-500">{sub}</div>
                        </div>
                    ))}
                </div>

                {/* Two-column layout */}
                <div className="grid md:grid-cols-[1fr_300px] gap-6 items-start">
                    {/* Match History */}
                    <div className="bg-[#130D35] border border-[#2D1B69] rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[#2D1B69] flex justify-between items-center">
                            <div className="flex items-center gap-2 font-bold text-sm">
                                <span className="text-[#A5B4FC]">
                                    <LayersIcon />
                                </span>
                                Match History
                            </div>
                            <div className="flex gap-1">
                                <button className="text-xs px-3 py-1 rounded-md text-gray-500 hover:text-white hover:bg-white/[0.07] transition-all">
                                    All Modes
                                </button>
                                <button className="text-xs px-3 py-1 rounded-md bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20 font-medium">
                                    Competitive
                                </button>
                            </div>
                        </div>

                        {/* Column headers */}
                        <div className="grid grid-cols-[40px_1fr_80px_60px_110px_80px] px-5 py-2.5 text-xs text-gray-600 uppercase tracking-widest border-b border-[#2D1B69]">
                            <span>Agent</span>
                            <span>Result</span>
                            <span>Map</span>
                            <span>Score</span>
                            <span>KDA</span>
                            <span className="text-right">Date</span>
                        </div>

                        {matchHistory.map((match, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-[40px_1fr_80px_60px_110px_80px] px-5 py-3.5 items-center border-b border-[#2D1B69]/50 hover:bg-white/[0.02] transition-colors last:border-b-0"
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                    style={{
                                        color: match.agentColor,
                                        backgroundColor:
                                            match.agentColor + "22",
                                    }}
                                >
                                    {match.agent[0]}
                                </div>

                                <div>
                                    <div
                                        className={`text-sm font-bold ${match.result === "WIN" ? "text-green-400" : "text-red-400"}`}
                                    >
                                        {match.result}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {match.mode}
                                    </div>
                                </div>

                                <div className="text-sm text-gray-300">
                                    {match.map}
                                </div>

                                <div className="text-sm font-semibold text-white">
                                    {match.score}
                                </div>

                                <div>
                                    <div className="text-sm text-gray-300">
                                        {match.kda}
                                    </div>
                                    <div
                                        className={`text-xs font-semibold ${parseFloat(match.ratio) >= 1 ? "text-[#60A5FA]" : "text-red-400"}`}
                                    >
                                        {match.ratio} K/D
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 text-right">
                                    {match.time}
                                </div>
                            </div>
                        ))}

                        <div className="px-5 py-4 text-center">
                            <button className="text-sm text-[#60A5FA] hover:text-white transition-colors">
                                Load More Matches
                            </button>
                        </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="flex flex-col gap-4">
                        {/* Season Progress */}
                        <div className="bg-[#130D35] border border-[#2D1B69] rounded-xl p-5">
                            <div className="flex items-center gap-2 text-xs text-[#A5B4FC] uppercase tracking-widest mb-4 font-medium">
                                <TrendingUpIcon />
                                Season Progress
                            </div>
                            <div className="flex justify-between items-center text-sm mb-2">
                                <span className="text-white font-semibold">
                                    Level 79
                                </span>
                                <span className="text-xs text-[#60A5FA]">
                                    Battlepass Maxed
                                </span>
                            </div>
                            <div className="w-full bg-[#2D1B69] rounded-full h-1.5 mb-5">
                                <div className="bg-[#60A5FA] h-1.5 rounded-full w-full" />
                            </div>
                            <div className="bg-[#0D0A1A] border border-[#2D1B69] rounded-lg px-4 py-3 flex justify-between items-center">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-widest">
                                        Current Rank
                                    </div>
                                    <div className="text-sm font-bold text-white">
                                        Immortal 3
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        382 RR
                                    </div>
                                </div>
                                <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full font-semibold">
                                    Top 500
                                </span>
                            </div>
                        </div>

                        {/* Recent Achievements */}
                        <div className="bg-[#130D35] border border-[#2D1B69] rounded-xl p-5">
                            <div className="flex items-center gap-2 text-xs text-[#A5B4FC] uppercase tracking-widest mb-4 font-medium">
                                <StarIcon />
                                Recent Achievements
                            </div>
                            <div className="flex flex-col gap-4">
                                {achievements.map(({ title, date, desc }) => (
                                    <div key={title}>
                                        <div className="flex justify-between items-start mb-0.5">
                                            <span className="text-sm font-semibold text-white">
                                                {title}
                                            </span>
                                            <span className="text-xs text-gray-500 shrink-0 ml-2">
                                                {date}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            {desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BVL Elite Program */}
                        <div className="rounded-xl bg-gradient-to-br from-[#2D1B69] via-[#1E0A4C] to-[#130D35] border border-[#4C2F9E] p-5 text-center">
                            <div className="flex justify-center mb-3 text-[#60A5FA]">
                                <TrophyLargeIcon />
                            </div>
                            <div className="font-bold text-[#60A5FA] mb-2">
                                BVL Elite Program
                            </div>
                            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                                You're in the top 1% of players. Apply for the
                                professional draft scouting today.
                            </p>
                            <button className="text-sm text-[#60A5FA] hover:text-white font-semibold transition-colors">
                                Apply for Draft →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
