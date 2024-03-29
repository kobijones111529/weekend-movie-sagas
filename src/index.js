import './index.css'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore
} from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import App from './components/App/App.jsx'

// Create the rootSaga generator function
function * rootSaga () {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies)
}

function * fetchAllMovies () {
  // get all movies from the DB
  try {
    const movies = yield axios.get('/api/movie')
    console.log('get all:', movies.data)
    yield put({ type: 'SET_MOVIES', payload: movies.data })
  } catch {
    console.log('get all error')
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload
    default:
      return state
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload
    default:
      return state
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
)

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
)
