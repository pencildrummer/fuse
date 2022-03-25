const path = require('path')
const express = require('express')
const clientApp = express()
const PORT = 3000

console.log('PATTTTH', path.join(__dirname, '../next-out'))
clientApp.use(express.static(path.join(__dirname, '../next-out')))
clientApp.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));