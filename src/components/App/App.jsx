import './App.css'
import React from 'react'
import { Link, Route, HashRouter as Router, Switch } from 'react-router-dom'
import MovieDetails from '../MovieDetails/MovieDetails.jsx'
import MovieList from '../MovieList/MovieList.jsx'

function App () {
  return (
    <div className="App">
      <Router>
        <h1>
          <Link to="/">
            The Movies Saga!
          </Link>
        </h1>

        <Switch>
          <Route path="/" exact>
            <MovieList />
          </Route>

          <Route exact path="/movies/:id">
            <MovieDetails />
          </Route>

          <Route path="/">
            <p>Couldn&apos;t find page</p>
          </Route>
        </Switch>

        {/* Add Movie page */}
      </Router>
    </div>
  )
}

export default App
