// EXPRESS
    const express = require('express')

// ROUTERS

// SERVER

// HOMEPAGE ROUTING
    router.get('/', async(req,res) => {
        res.json({ message: 'WebTesting Sprint Server Is Working!'})
    })

// INDIVIDUAL ROUTES

// EXPORTS
    module.exports = server