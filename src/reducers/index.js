import { combineReducers } from 'redux'
import boardReducers from './boardReducers'
import appStateReducers from './appStateReducers'
import categoriesReducers from './categoriesReducers'
import pulsesReducers from './pulsesReducers'
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
  boards: boardReducers,
  categories: categoriesReducers,
  pulses: pulsesReducers,
  appState: appStateReducers,
  form: formReducer
  
})