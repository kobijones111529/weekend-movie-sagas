import React from 'react'
import { Link, Route, HashRouter as Router, Switch } from 'react-router-dom'
import MovieDetails from '../MovieDetails/MovieDetails.jsx'
import MovieList from '../MovieList/MovieList.jsx'
import styles from './App.module.css'

function App () {
  return (
    <div className={styles.App}>
      <Router>
        <header className={styles.header}>
          <h1>
            <Link to="/">
              The Movies Saga!
            </Link>
          </h1>
        </header>

        <div>
          <Switch>
            <Route path="/" exact>
              <MovieList />
            </Route>

            <Route exact path="/details/:id">
              <MovieDetails />
            </Route>

            <Route path="/">
              <p>Couldn&apos;t find page</p>
            </Route>
          </Switch>
        </div>

        {/* Add Movie page */}
      </Router>
    </div>
  )
}

export default App
