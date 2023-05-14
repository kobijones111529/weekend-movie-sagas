import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function MovieDetails () {
  const dispatch = useDispatch()
  const movies = useSelector(store => store.movies)
  const params = useParams()

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' })
  }, [])

  const { id } = useMemo(() => {
    return { id: Number(params.id) }
  }, [params])

  const movie = useMemo(() => {
    return movies.find(movie => movie.id === id)
  }, [movies, id])

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
