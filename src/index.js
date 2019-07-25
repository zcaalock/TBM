import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import App from './components/App'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import './css/index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
  )

ReactDOM.render(
  
  <Provider store={store}>
    <App />
 
    </Provider>
  
  , document.querySelector('#root')
)