import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

function MovieDetails () {
  const [movie, setMovie] = useState(undefined)
  const params = useParams()

  const { id } = useMemo(() => {
    return { id: Number(params.id) }
  }, [params])

  useEffect(() => {
    axios.get(`/api/movie/${id}`)
      .then(response => {
        setMovie(response.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <main>
      {movie === undefined
        ? (
            <>
              <p>Unable to find movie</p>
            </>
          )
        : (
            <>
              <img src={movie.poster} />
              <h1>{movie.title}</h1>
              <p>{movie.description}</p>
              <h4>Genres</h4>
              <p>{movie.genres.map(genre => genre.name).join(' | ')}</p>
            </>
          )}
    </main>
  )
}

export default MovieDetails
