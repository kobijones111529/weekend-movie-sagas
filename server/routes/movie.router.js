const express = require('express')
const pool = require('../modules/pool')

const router = express.Router()

router.get('/', (req, res) => {
  const query = `
    SELECT
      "movies"."id" AS "id",
      "movies"."title" AS "title",
      "movies"."poster" AS "poster",
      "movies"."description" AS "description",
      "genres"."id" AS "genreId",
      "genres"."name" AS "genreName"
    FROM "movies"
    JOIN "movies_genres"
      ON "movies"."id" = "movies_genres"."movie_id"
    JOIN "genres"
      ON "movies_genres"."genre_id" = "genres"."id"
    ORDER BY "movies"."title" ASC
  `
  pool.query(query)
    .then(result => {
      const map = result.rows.reduce((out, row) => {
        const existing = out.get(row.id)
        if (existing === undefined) {
          out.set(row.id, {
            id: row.id,
            title: row.title,
            poster: row.poster,
            description: row.description,
            genres: [{ id: row.genreId, name: row.genreName }]
          })
        } else {
          existing.genres.push({ id: row.genreId, name: row.genreName })
        }

        return out
      }, new Map())

      res.send([...map.values()])
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err)
      res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
  console.log(req.body)
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id) // ID IS HERE!

      const createdMovieId = result.rows[0].id

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        // Now that both are done, send back success!
        res.sendStatus(201)
      }).catch(err => {
        // catch for second query
        console.log(err)
        res.sendStatus(500)
      })

      // Catch for first query
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

module.exports = router
