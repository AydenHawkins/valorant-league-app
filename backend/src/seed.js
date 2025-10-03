// src/seed.js
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Clearing old data...')

        // Delete in order to satisfy FK constraints
        await prisma.playerStats.deleteMany()
        await prisma.match.deleteMany()
        await prisma.teamRoster.deleteMany()
        await prisma.player.deleteMany()
        await prisma.team.deleteMany()
        await prisma.season.deleteMany()

        console.log('All tables cleared.')

        // === Seed Season ===
        console.log('Seeding season...')
        const season = await prisma.season.create({
            data: {
                name: 'Season 1',
                startDate: new Date('2025-08-05'),
                endDate: new Date('2025-09-16'),
            },
        })

        // === Teams and Players Data ===
        const teams = [
            {
                name: 'Lawn Chair Guys',
                players: ['Fethah#9863', 'xNAZGULx#9495', 'Daddy Doc#3028', 'Envy#Ghoul', 'NotPatMeister#NotPa'],
            },
            {
                name: 'Alt Tab Titans',
                players: ['Jokester#3408', 'her fav tampon#penar', 'pcemkr#0808', 'krit ت#krit', 'Melt Butter n Me#Penar'],
            },
            {
                name: 'The Last Minutemen',
                players: ['SpinAgain#uzi', 'xlHyperion#NA1', 'Illusorysense#6942', 'GoldenEye#OOO7', 'worrywyrm#2848'],
            },
            {
                name: 'Allure',
                players: ['Vibezwitcam#god', 'Carnage idk#2222', 'Sarebear#five', 'Deavil#1029', 'Hushere#1248'],
            },
            {
                name: 'Whiff Warriors',
                players: ['PinkyPies#2545', 'KraftyKermit#4191', 'CLASSY#1020', 'Greywaren99#blep', 'Lafufu#EDM'],
            },
        ]

        console.log('Seeding teams and players...')

        for (const teamData of teams) {
            // 1. Create team
            const team = await prisma.team.create({
                data: {
                    name: teamData.name,
                    seasonId: season.id,
                },
            })

            // 2. Create players & roster links
            for (const riot of teamData.players) {
                const [name, tag] = riot.split('#')

                const player = await prisma.player.create({
                    data: {
                        name,
                        tag,
                    },
                })

                // 3. Link player <-> team <-> season in roster
                await prisma.teamRoster.create({
                    data: {
                        playerId: player.id,
                        teamId: team.id,
                        seasonId: season.id,
                    },
                })
            }
        }

        console.log('Seeding complete.')
    } catch (err) {
        console.error('Error during seeding:', err)
    } finally {
        await prisma.$disconnect()
    }
}

main()
