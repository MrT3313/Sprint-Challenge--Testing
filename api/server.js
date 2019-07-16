// EXPRESS
    const express = require('express')

// ROUTERS
    const gamesRouter = require('./routes/gamesRouter.js')

// SERVER
    const server = express()
    server.use(express.json())

// HOMEPAGE ROUTING
    server.get('/', async(req,res) => {
        res.json({ message: 'WebTesting Sprint Server Is Working!'})
    })

// INDIVIDUAL ROUTES
    server.use('/api/games', gamesRouter)

// EXPORTS
    module.exports = server