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
    router.post('/', async (req,res) => {
        console.log('gamesRouter post/')
        console.log('req.body', req.body)


        if(req.body.title !== '' || req.body.genre !== '') {
            
            const newGame = await gamesModel.insert(req.body)
            res.status(201).json( newGame )
            
            // KNEX_DB('GAMES')
            //     .insert(newGame)
            //     .then( result => {
            //         res.status(201).json( result )
            //     })
        } else {
            res.status(422).json({ message: 'Please Match Appropriate Shape of newGame'})
        }
        


        
        
        


        // try {
        //     const newGame = await gamesModel.insert(req.body)
            
        //     if(newGame) {
        //         res.status(201).json( newGame )
        //     } else {
        //         res.status(422).json({ message: 'Please Match Appropriate Shape of newGame'})
        //     }
        // } catch {
        //     res.status(500).json( { error: 'Unable to INSERT new game into GAMES table'} )
        // }
    })
// - PUT - //
// - DEL - //

// EXPORTS
    module.exports = router