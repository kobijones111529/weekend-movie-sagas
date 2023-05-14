const bodyParser = require('body-parser')
const express = require('express')
const genreRouter = require('./routes/genre.router.js')
const movieRouter = require('./routes/movie.router.js')

const app = express()
const port = process.env.PORT || 5001

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()) // needed for angular requests
app.use(express.static('build'))

/** ---------- ROUTES ---------- **/
app.use('/api/movie', movieRouter)
app.use('/api/genre', genreRouter)

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
  console.log('Listening on port: ', port)
})
