const supertest = require('supertest')

const server = require('./server.js')
const KNEX_DB   = require('../data/dbConfig.js')

describe('testing server.js', () => {
    afterEach( async () => {
        await KNEX_DB('GAMES').truncate()
    })

    it('should set the test env to TESTING', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
    it('should return 200 using async await', async () => {
        const res = await supertest(server).get('/')
        expect(res.status).toBe(200)
    })
})

describe('GET /api/games', () => {
    afterEach( async () => {
        await KNEX_DB('GAMES').truncate()
    })

    it('should hit empty endpoint & return []', async () => {
        const res = await supertest(server).get('/api/games')
        expect(res.status).toBe(200)
        expect(res.body).toEqual([])
    })
    it('should return all games', async () => {
        const games = [
            {
                id: 1,
                title: 'Watching Paint Dry: The Sequel',
                genre: 'Exhilarating Action RPG',
                releaseYear: 2077
            },
            {
                id: 2,
                title: 'Measuring Grass Growth',
                genre: 'Personal Development',
                releaseYear: 1234
            }
        ]

        await KNEX_DB('GAMES').insert(games)

        const res = await supertest(server).get('/api/games')
        expect(res.status).toBe(200)
        expect(res.body).toEqual(games)
    })
})
describe('POST /api/games', () => {
    afterEach( async () => {
        await KNEX_DB('GAMES').truncate()
    })

    it('should return 201 w/ CORRECT shape', async () => {
        const game = {
            title: 'Watching Paint Dry: The Sequel',
            genre: 'Exhilarating Action RPG',
            releaseYear: 2077
        }

        const res = await supertest(server).post('/api/games').send(game)
        expect(res.status).toBe(201)
        
    })
    it('should return 422 w/ INCORRECT shape', async () => {
        const game = {
            title: 'Watching Paint Dry: The Sequel',
            releaseYear: 2077
        }
        const res = await supertest(server).post('/api/games').send(game);
        expect(res.status).toBe(422);
    })
})