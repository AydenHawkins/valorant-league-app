// src/seed.js
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Clearing old data...')

        // Delete in order to satisfy FK constraints
        await prisma.playerStats.deleteMany()
        await prisma.match.deleteMany()
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

        // === Seed Teams and Players ===
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
            const [teamName, teamPlayers] = [teamData.name, teamData.players]

            const team = await prisma.team.create({
                data: {
                    name: teamName,
                    seasonId: season.id,
                    players: {
                        create: teamPlayers.map((riot) => {
                            const [name, tag] = riot.split('#')
                            return { name, tag }
                        }),
                    },
                },
            })
        }

        console.log('Seeding complete.')
    } catch (err) {
        console.error('Error during seeding:', err)
    } finally {
        await prisma.$disconnect()
    }
}

main()
