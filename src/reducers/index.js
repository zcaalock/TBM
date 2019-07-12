import { combineReducers } from 'redux'
import boardReducers from './boardReducers'
import appStateReducers from './appStateReducers'
import categoriesReducers from './categoriesReducers'
import pulsesReducers from './pulsesReducers'
import usersReducers from './usersReducers'
import { reducer as formReducer } from 'redux-form'
import statusReducers from './statusReducers'


export default combineReducers({
  boards: boardReducers,
  categories: categoriesReducers,
  pulses: pulsesReducers,
  users: usersReducers,
  appState: appStateReducers,
  status: statusReducers,
  form: formReducer
  
})