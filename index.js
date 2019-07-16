require('dotenv').config()

const sever = require('./api/server.js')

const PORT = process.env.PORT || 4000
sever.listen(PORT, () => console.log(`Testing Spring Challenge Server -- Listening in ${PORT}`))
