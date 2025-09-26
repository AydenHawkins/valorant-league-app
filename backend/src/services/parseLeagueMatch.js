const fs = require('fs')
const path = require('path')

// Utility: convert any value to a safe number
function safeNumber(v) {
    if (v === undefined || v === null) return 0
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
}

// Compute derived stats for a player
function calculateDerived(player, matchRoundsCount) {
    const kills = safeNumber(player.stats?.kills)
    const deaths = safeNumber(player.stats?.deaths)
    const assists = safeNumber(player.stats?.assists)
    const roundsPlayed = safeNumber(player.stats?.roundsPlayed)
    const totalScore = safeNumber(player.stats?.score)

    const acs = roundsPlayed > 0 ? Math.round(totalScore / roundsPlayed) : safeNumber(player.stats?.acs)

    let adr = null
    const damageDealt = safeNumber(player.stats?.damage_dealt)
    if (roundsPlayed > 0 && damageDealt) {
        adr = +(damageDealt / roundsPlayed).toFixed(2)
    } else {
        adr = safeNumber(player.stats?.adr)
    }

    const deathsSafe = deaths === 0 ? 1 : deaths
    const kdRatio = +(kills / deathsSafe).toFixed(2)
    const plusMinus = kills - deaths

    const fkills = safeNumber(player.stats?.first_kills)
    const fdeaths = safeNumber(player.stats?.first_deaths)
    const mkills = safeNumber(player.stats?.multikills)
    const plants = safeNumber(player.stats?.plants)
    const defuses = safeNumber(player.stats?.defuses)
    const clutches = safeNumber(player.stats?.clutches)
    const clutchOpportunities = safeNumber(player.stats?.clutchOpportunities)
    const clutchpercent = clutchOpportunities > 0 ? +((clutches / clutchOpportunities) * 100).toFixed(2) : 0
    const kast = roundsPlayed > 0 ? +(safeNumber(player.stats?.kastRounds) / roundsPlayed * 100).toFixed(2) : 0
    const hs = safeNumber(player.stats?.headshot_percentage) || 0

    return {
        kills, deaths, assists, acs, plusMinus, kdRatio, delta: safeNumber(player.stats?.delta),
        adr, hs, kast, fkills, fdeaths, mkills, plants, defuses, clutches, clutchpercent,
        agents: player.agent || null
    }
}

// Main parser
function parseLeagueMatchForDB(matchJson) {
    if (!matchJson || !matchJson.data) throw new Error('Invalid match JSON')

    const data = matchJson.data

    // Match info
    const matchObj = {
        map: data.metadata?.map?.name || data.metadata?.map?.id || 'Unknown',
        date: data.metadata?.started_at || new Date().toISOString(),
    }

    // Teams: Red = started on attack, Blue = started on defense
    const teamsArr = (data.teams || []).map(t => ({
        id: t.team_id || null,
        name: t.team_id || null,
    }))
    const redTeam = teamsArr.find(t => t.name === 'Red') || teamsArr[0] || { name: null }
    const blueTeam = teamsArr.find(t => t.name === 'Blue') || teamsArr[1] || { name: null }
    matchObj.redTeamName = redTeam.name
    matchObj.blueTeamName = blueTeam.name

    const matchRoundsCount = Array.isArray(data.rounds) ? data.rounds.length : 0

    // Players mapping by puuid
    const playersByPuuid = {}
        (data.players || []).forEach(p => {
            const puuid = p.puuid
            playersByPuuid[puuid] = {
                puuid,
                name: p.name || null,
                tag: p.tag || null,
                team: p.team_id || null,
                agent: p.agent?.name || null,
                stats: p.stats || {},
                plants: 0,
                defuses: 0,
                fkills: 0,
                fdeaths: 0,
                mkills: 0,
                clutches: 0
            }
        })

    // Helper to get/create player record
    function getPlayer(puuid) {
        if (!playersByPuuid[puuid]) {
            playersByPuuid[puuid] = {
                puuid, name: null, tag: null, team: null, agent: null,
                stats: {}, plants: 0, defuses: 0, fkills: 0, fdeaths: 0, mkills: 0, clutches: 0
            }
        }
        return playersByPuuid[puuid]
    }

    // Aggregate per-round stats
    const rounds = Array.isArray(data.rounds) ? data.rounds : []
    const killsList = Array.isArray(data.kills) ? data.kills : []
    const killsByRound = {}
    killsList.forEach(k => {
        killsByRound[k.round] = killsByRound[k.round] || []
        killsByRound[k.round].push(k)
    })

    rounds.forEach(r => {
        const rid = r.id
        // Plants
        if (r.plant?.player?.puuid) getPlayer(r.plant.player.puuid).plants += 1
        // Defuses
        if (r.defuse?.player?.puuid) getPlayer(r.defuse.player.puuid).defuses += 1

        // Kills
        const kr = killsByRound[rid] || []
        kr.sort((a, b) => (a.time_in_round_in_ms || 0) - (b.time_in_round_in_ms || 0))
        const killsCountThisRound = {}
        kr.forEach((k, idx) => {
            const killerId = k.killer?.puuid
            const victimId = k.victim?.puuid
            if (killerId) killsCountThisRound[killerId] = (killsCountThisRound[killerId] || 0) + 1
            if (idx === 0) {
                if (killerId) getPlayer(killerId).fkills += 1
                if (victimId) getPlayer(victimId).fdeaths += 1
            }
        })
        Object.entries(killsCountThisRound).forEach(([pid, count]) => {
            if (count >= 2) getPlayer(pid).mkills += 1
        })
    })

    // Prepare final players array
    const players = Object.values(playersByPuuid).map(p => {
        const mergedStats = Object.assign({}, p.stats, {
            plants: p.plants,
            defuses: p.defuses,
            first_kills: p.fkills,
            first_deaths: p.fdeaths,
            multikills: p.mkills,
            clutches: p.clutches
        })
        const derived = calculateDerived({ stats: mergedStats, agent: { name: p.agent } }, matchRoundsCount)
        return {
            puuid: p.puuid,
            name: p.name,
            tag: p.tag,
            teamName: p.team,
            stats: derived
        }
    })

    return { match: matchObj, teams: teamsArr, players }
}

module.exports = { parseLeagueMatchForDB }
