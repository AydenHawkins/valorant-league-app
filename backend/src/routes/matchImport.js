const express = require('express')
const router = express.Router()
const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()
const { parseLeagueMatchForDB } = require('../../services/parseLeagueMatch')
const valorantApi = require('../../services/valorantApi')

router.post('/import', async (req, res) => {
    try {
        const { region, matchId, matchJson, seasonId } = req.body

        // get match JSON
        let rawJson = matchJson
        if (!rawJson) {
            if (!region || !matchId) return res.status(400).json({ error: 'Provide matchJson or (region + matchId)' })
            rawJson = await valorantApi.getMatchById(region, matchId)
        }

        const parsed = parseLeagueMatchForDB(rawJson)

        // select season
        let seasonToUse = seasonId
        if (!seasonToUse) {
            const s = await prisma.season.findFirst()
            if (!s) return res.status(400).json({ error: 'No seasonId provided and no seasons exist' })
            seasonToUse = s.id
        }

        // Upsert teams
        const redTeam = parsed.match.redTeamName
            ? await prisma.team.upsert({
                where: { name: parsed.match.redTeamName },
                update: {},
                create: { name: parsed.match.redTeamName, seasonId: seasonToUse },
            })
            : null

        const blueTeam = parsed.match.blueTeamName
            ? await prisma.team.upsert({
                where: { name: parsed.match.blueTeamName },
                update: {},
                create: { name: parsed.match.blueTeamName, seasonId: seasonToUse },
            })
            : null

        // Create match
        const match = await prisma.match.create({
            data: {
                map: parsed.match.map || 'Unknown',
                matchDate: parsed.match.date ? new Date(parsed.match.date) : new Date(),
                season: { connect: { id: seasonToUse } },
                redTeam: redTeam ? { connect: { id: redTeam.id } } : undefined,
                blueTeam: blueTeam ? { connect: { id: blueTeam.id } } : undefined,
            },
        })

        // Persist players & stats
        for (const p of parsed.players || []) {
            if (!p.name || !p.tag) continue // require name + tag for uniqueness

            // resolve team
            let teamRecord = null
            if (p.teamName) {
                teamRecord = await prisma.team.findUnique({ where: { name: p.teamName } })
            }
            if (!teamRecord) teamRecord = redTeam || blueTeam || null

            // upsert player
            const player = await prisma.player.upsert({
                where: { name_tag: { name: p.name, tag: p.tag } }, // composite unique
                update: { teamId: teamRecord ? teamRecord.id : undefined, updatedAt: new Date() },
                create: {
                    name: p.name,
                    tag: p.tag,
                    puuid: p.puuid || null,
                    teamId: teamRecord ? teamRecord.id : (redTeam ? redTeam.id : blueTeam ? blueTeam.id : 1),
                },
            })

            // create stats
            const s = p.stats || {}
            await prisma.playerStats.create({
                data: {
                    kills: s.kills || 0,
                    deaths: s.deaths || 0,
                    assists: s.assists || 0,
                    acs: s.acs || 0,
                    plusMinus: s.plusMinus || 0,
                    kdRatio: s.kdRatio || 0,
                    delta: s.delta || 0,
                    adr: s.adr || 0,
                    hs: s.headshot_percentage || 0,
                    kast: s.kast || 0,
                    fkills: s.fkills || 0,
                    fdeaths: s.fdeaths || 0,
                    mkills: s.mkills || 0,
                    plants: s.plants || 0,
                    defuses: s.defuses || 0,
                    clutches: s.clutches || 0,
                    clutchpercent: s.clutchpercent || 0,
                    agents: s.agents || null,
                    player: { connect: { id: player.id } },
                    match: { connect: { id: match.id } },
                },
            })
        }

        return res.status(201).json({ matchId: match.id })
    } catch (err) {
        console.error('matchImport error', err)
        return res.status(500).json({ error: 'Import failed', details: String(err) })
    }
})

module.exports = router
