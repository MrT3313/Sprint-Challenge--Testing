const supertest = require('supertest')

const server = require('../server.js')
const KNEX_DB = require('../../data/dbConfig.js')

const gamesModel = require('./gamesModel.js')

describe('testing the games model', () => {
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
        })
    })
    describe('getAll()', () => {
        // Cleanup
        afterEach( async () => {
            await KNEX_DB('GAMES').truncate()
        })
        
        it('should get all games', async () => {
            // using model method
            await KNEX_DB('GAMES').insert([
                {
                    title: 'Watching Paint Dry: The Sequel',
                    genre: 'Exhilarating Action RPG',
                    releaseYear: 2077
                },
                {
                    title: 'Measuring Grass Growth',
                    genre: 'Personal Development',
                    releaseYear: 1234
                }
            ])
            // confirm with KNEX
                const games = await KNEX_DB('GAMES')

                expect(games).toHaveLength(2)
                expect(games[0].title).toBe('Watching Paint Dry: The Sequel')

        })
    })
})