const express = require('express')
const router = express.Router()
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

// GET /rankings - compute basic team rankings from matches
router.get('/', async (req, res) => {
    try {
        const teams = await prisma.team.findMany()
        const matches = await prisma.match.findMany()

        const teamMap = {}
        teams.forEach(t => { teamMap[t.id] = { id: t.id, name: t.name, wins: 0, losses: 0, points: 0 } })

        matches.forEach(m => {
            const red = teamMap[m.redTeamId]
            const blue = teamMap[m.blueTeamId]
            if (!red || !blue) return

            if (typeof m.redScore === 'number' && typeof m.blueScore === 'number') {
                if (m.redScore > m.blueScore) {
                    red.wins += 1
                    blue.losses += 1
                    red.points += 3
                } else if (m.blueScore > m.redScore) {
                    blue.wins += 1
                    red.losses += 1
                    blue.points += 3
                } else {
                    red.points += 1
                    blue.points += 1
                }
            }
        })

        const rankings = Object.values(teamMap).sort((a, b) => b.points - a.points)
        res.json(rankings)
    } catch (err) {
        console.error('rankings error', err)
        res.status(500).json({ error: 'Failed to compute rankings' })
    }
})

module.exports = router
