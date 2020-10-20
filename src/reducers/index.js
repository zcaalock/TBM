import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import boardReducers from './boardReducers'
import appStateReducers from './appStateReducers'
import categoriesReducers from './categoriesReducers'
import pulsesReducers from './pulsesReducers'
import clientReducers from './clientReducers'
import detailsReducers from './detailsReducers'
import usersReducers from './usersReducers'
import notepadReducers from './notepadReducers'
import contactsReducers from './contactsReducers'

import uiReducers from './uiReducers';

//settings
import statusReducers from './settings/statusReducers'
import leadReducers from './settings/leadReducers'

//const initialState ={}
const middleware = [thunk]

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch(e) {
    console.log(e)
  }
}

function loadFromLocalStorage(){
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null ) return undefined
    return JSON.parse(serializedState)
  } catch(e) {
    console.log(e)
    return undefined
  }
}


const reducers = combineReducers({
  boards: boardReducers,
  categories: categoriesReducers,
  pulses: pulsesReducers,
  clients: clientReducers,
  contacts: contactsReducers,
  details: detailsReducers,
  notepad: notepadReducers,
  user: usersReducers,
  appState: appStateReducers,
  status: statusReducers,
  UI: uiReducers,
  form: formReducer,
  lead: leadReducers,  
})



const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

    
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const persistedState = loadFromLocalStorage()
const store = createStore(
  reducers, 
  //initialState, 
  persistedState, 
  enhancer);

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;