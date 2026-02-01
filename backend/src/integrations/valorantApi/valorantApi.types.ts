export interface ValorantApiResponse {
    status: number;
    data: MatchData;
}

export interface MatchData {
    metadata: MatchMetadata;
    players: Player[];
    observers: Observer[];
    coaches: unknown[];
    teams: Team[];
    rounds: Round[];
    kills: Kill[];
}

export interface MatchMetadata {
    match_id: string;
    map: { id: string; name: string };
    game_version: string;
    game_length_in_ms: number;
    started_at: string;
    is_completed: boolean;
    queue: { id: string; name: string; mode_type: string };
    season: { id: string; short: string };
    platform: string;
    premier: unknown | null;
    party_rr_penaltys: unknown[];
    region: string;
    cluster: string;
}

export interface Player {
    puuid: string;
    name: string;
    tag: string;
    team_id: string;
    platform: string;
    party_id: string;
    agent: { id: string; name: string };
    stats: {
        score: number;
        kills: number;
        deaths: number;
        assists: number;
        headshots: number;
        bodyshots: number;
        legshots: number;
        damage: { dealt: number; received: number };
    };
    ability_casts: {
        grenade: number;
        ability1: number;
        ability2: number;
        ultimate: number;
    };
    tier: { id: number; name: string };
    customization: {
        card: string;
        title: string;
        preferred_level_border: string | null;
    };
    account_level: number;
    session_playtime_in_ms: number;
    behavior: {
        afk_rounds: number;
        friendly_fire: { incoming: number; outgoing: number };
        rounds_in_spawn: number;
    };
    economy: {
        spent: { overall: number; average: number };
        loadout_value: { overall: number; average: number };
    };
}

export interface Observer {
    puuid: string;
    name: string;
    tag: string;
    account_level: number;
    session_playtime_in_ms: number;
    card_id: string;
    title_id: string;
    party_id: string;
}

export interface PlayerReference {
    puuid: string;
    name: string;
    tag: string;
    team: string;
}

export interface Location {
    x: number;
    y: number;
}

export interface PlayerLocation {
    player: PlayerReference;
    view_radians: number;
    location: Location;
}

export interface Team {
    team_id: string;
    rounds: { won: number; lost: number };
    won: boolean;
    premier_roster: unknown | null;
}

export interface Round {
    id: number;
    result: string;
    ceremony: string;
    winning_team: string;
    plant: {
        round_time_in_ms: number;
        site: string;
        location: Location;
        player: PlayerReference;
        player_locations: PlayerLocation[];
    } | null;
    defuse: {
        round_time_in_ms: number;
        location: Location;
        player: PlayerReference;
        player_locations: PlayerLocation[];
    } | null;
    stats: RoundPlayerStats[];
}

export interface RoundPlayerStats {
    player: PlayerReference;
    ability_casts: {
        grenade: number | null;
        ability_1: number | null;
        ability_2: number | null;
        ultimate: number | null;
    };
    damage_events: {
        player: PlayerReference;
        bodyshots: number;
        headshots: number;
        legshots: number;
        damage: number;
    }[];
    stats: {
        score: number;
        kills: number;
        headshots: number;
        bodyshots: number;
        legshots: number;
    };
    economy: {
        loadout_value: number;
        remaining: number;
        weapon: { id: string; name: string; type: string } | null;
        armor: { id: string; name: string } | null;
    };
    was_afk: boolean;
    received_penalty: boolean;
    stayed_in_spawn: boolean;
}

export interface Kill {
    time_in_round_in_ms: number;
    time_in_match_in_ms: number;
    round: number;
    killer: PlayerReference;
    victim: PlayerReference;
    assistants: PlayerReference[];
    location: Location;
    weapon: { id: string; name: string; type: string };
    secondary_fire_mode: boolean;
    player_locations: PlayerLocation[];
}
