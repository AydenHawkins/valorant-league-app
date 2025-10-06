// routes/matchImport.js
const express = require('express')
const router = express.Router()
const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()
const { parseLeagueMatchForDB } = require('../services/parseLeagueMatch')
const valorantApi = require('../services/valorantApi')

router.post('/', async (req, res) => {
    try {
        const { region, matchId, matchJson, seasonId } = req.body

        // get match JSON
        let rawJson = matchJson
        if (!rawJson) {
            if (!region || !matchId) return res.status(400).json({ error: 'Provide matchJson or (region + matchId)' })
            rawJson = await valorantApi.getMatchById(region, matchId)
        }

        const parsed = parseLeagueMatchForDB(rawJson)

        // determine season
        let seasonToUse = seasonId
        if (!seasonToUse) {
            const recentSeason = await prisma.season.findFirst({
                orderBy: { id: 'desc' }
            })
            if (!recentSeason) return res.status(400).json({ error: 'No seasonId provided and no seasons exist in DB' })
            seasonToUse = recentSeason.id
        }

        // Run everything inside a transaction for all-or-nothing behavior
        const txResult = await prisma.$transaction(async (tx) => {
            // Upsert teams inside tx
            const redTeamTx = parsed.match.redTeamName
                ? await tx.team.upsert({ where: { name: parsed.match.redTeamName }, update: {}, create: { name: parsed.match.redTeamName, seasonId: seasonToUse } })
                : null

            const blueTeamTx = parsed.match.blueTeamName
                ? await tx.team.upsert({ where: { name: parsed.match.blueTeamName }, update: {}, create: { name: parsed.match.blueTeamName, seasonId: seasonToUse } })
                : null

            // Create match inside tx
            const matchTx = await tx.match.create({
                data: {
                    map: parsed.match.map || 'Unknown',
                    matchDate: parsed.match.date ? new Date(parsed.match.date) : new Date(),
                    season: { connect: { id: seasonToUse } },
                    redTeam: redTeamTx ? { connect: { id: redTeamTx.id } } : undefined,
                    blueTeam: blueTeamTx ? { connect: { id: blueTeamTx.id } } : undefined,
                },
            })

            // Persist players & stats inside tx
            for (const p of parsed.players || []) {
                // matching logic: puuid preferred, else name+tag
                let player = null
                if (p.puuid) player = await tx.player.findUnique({ where: { puuid: p.puuid } })
                if (!player && p.name && p.tag) player = await tx.player.findFirst({ where: { name: p.name, tag: p.tag } })

                if (player) {
                    if (!player.puuid && p.puuid) {
                        player = await tx.player.update({ where: { id: player.id }, data: { puuid: p.puuid, updatedAt: new Date() } })
                    } else {
                        // Only update name/tag if it won't violate the unique constraint (name, tag)
                        const incomingName = p.name || player.name
                        const incomingTag = p.tag || player.tag
                        const conflict = await tx.player.findFirst({ where: { name: incomingName, tag: incomingTag, NOT: { id: player.id } } })
                        if (!conflict) {
                            await tx.player.update({ where: { id: player.id }, data: { name: incomingName, tag: incomingTag, updatedAt: new Date() } })
                            player = await tx.player.findUnique({ where: { id: player.id } })
                        } else {
                            // don't overwrite name/tag to avoid unique constraint error; just touch updatedAt
                            await tx.player.update({ where: { id: player.id }, data: { updatedAt: new Date() } })
                            player = await tx.player.findUnique({ where: { id: player.id } })
                        }
                    }
                } else {
                    player = await tx.player.create({ data: { name: p.name || 'Unknown', tag: p.tag || 'Unknown', puuid: p.puuid } })
                }

                // resolve team
                let teamRecord = null
                if (p.teamName) teamRecord = await tx.team.findUnique({ where: { name: p.teamName } })
                if (!teamRecord) teamRecord = redTeamTx || blueTeamTx || null

                if (teamRecord) {
                    await tx.teamRoster.upsert({ where: { playerId_teamId_seasonId: { playerId: player.id, teamId: teamRecord.id, seasonId: seasonToUse } }, update: {}, create: { playerId: player.id, teamId: teamRecord.id, seasonId: seasonToUse } })
                }

                // upsert playerStats by unique (playerId, matchId) to be idempotent
                const s = p.stats || {}
                // normalize agents to a string when present (Prisma expects String)
                const agentsStr = s.agents && typeof s.agents === 'object' ? (s.agents.name || JSON.stringify(s.agents)) : s.agents || null

                await tx.playerStats.upsert({
                    where: { playerId_matchId: { playerId: player.id, matchId: matchTx.id } },
                    update: {
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
                        agents: agentsStr,
                    },
                    create: {
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
                        agents: agentsStr,
                        player: { connect: { id: player.id } },
                        match: { connect: { id: matchTx.id } },
                    },
                })
            }

            return { matchId: matchTx.id }
        })

        return res.status(201).json(txResult)
    } catch (err) {
        console.error('matchImport error', err)
        return res.status(500).json({ error: 'Import failed', details: String(err) })
    }
})

module.exports = router
