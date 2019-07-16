// IMPORTS
const express = require('express')
const gamesModel = require('../models/gamesModel')


// KNEX db
const KNEX_DB = require('../../data/dbConfig.js')

// ROUTER
const router = express.Router()

// - GET - //
    router.get('/', async(req,res) => {
        console.log('gamesRouter get/')
        
        KNEX_DB('GAMES')
            .then( games => {
                console.log('games', games )
                res.status(200).json(games)
            })
            .catch( err => {
                res.status(500).json( { error: 'GET / -> could not get ALL games from GAMES table'} )
            })
    })
// - POST - //
    /* ACCEPTED SHAPE 
        {
            title: 'STRING', // required
            genre: 'STRING', // required
            releaseYear: INTEGER // not required
        }
    */
    router.post('/', validBody, async (req,res) => {
        console.log('gamesRouter post/')
        console.log('req.body -> POST ROUTE in gamesRouter', req.body)


        try {
            const addedGame = await gamesModel.insert(req.body)
            res.status(201).json(addedGame)
        } catch (err) {
            res.status(500).json({ message: 'Unable to POST new game to GAMES table'})
        }

    })
// - PUT - //
// - DEL - //

// - MIDDLEWARE - //
function validBody (req, res, next) {
    console.log('BODY PASSED TO MIDDLEWARE',req.body)
    console.log('validBody MIDDLEWARE')
    if (!req.body.title || !req.body.genre){
        res.status(422).json({ message: "Incomplete form. Please enter a title and genre" })
    } else {
        next();
    }
}

// EXPORTS
    module.exports = router