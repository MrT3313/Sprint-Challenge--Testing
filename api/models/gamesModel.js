const KNEX_DB = require('../../data/dbConfig.js')

module.exports = {
    insert,
    getAll,
}

async function insert(game) {
    const id = await KNEX_DB('GAMES').insert(game)
    
    return KNEX_DB('GAMES').where({ id }).first()
}
async function getAll() {
    return null
}