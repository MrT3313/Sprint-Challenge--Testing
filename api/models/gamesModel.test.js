const KNEX_DB = require('../../data/dbConfig.js')

const gamesModel = require('./gamesModel.js')

describe('the games model', () => {
    // INSERT
    describe('insert()', () => {
        // Cleanup
        afterEach( async () => {
            await KNEX_DB('GAMES').truncate()
        })

        it('should insert new game into DB', async () => {
            // using model method
                await gamesModel.insert({
                    title: 'Watching Paint Dry: The Sequel',
                    genre: 'Exhilarating Action RPG',
                    releaseYear: 2077
                })

            // confirm with KNEX
                const games = await KNEX_DB('GAMES')

                expect(games).toHaveLength(1)
                expect(games[0].title).toBe('Watching Paint Dry: The Sequel')
                // expect(res.status).toBe(201)
        })
    })
})