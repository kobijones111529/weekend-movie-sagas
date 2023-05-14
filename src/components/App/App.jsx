import './App.css'
import React from 'react'
import { Route, HashRouter as Router } from 'react-router-dom'
import MovieList from '../MovieList/MovieList.jsx'

function App () {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}

        {/* Add Movie page */}
      </Router>
    </div>
  )
}

export default App
