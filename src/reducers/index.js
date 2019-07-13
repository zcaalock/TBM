import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import boardReducers from './boardReducers'
import appStateReducers from './appStateReducers'
import categoriesReducers from './categoriesReducers'
import pulsesReducers from './pulsesReducers'
import detailsReducers from './detailsReducers'
import usersReducers from './usersReducers'
import statusReducers from './statusReducers'


export default combineReducers({
  boards: boardReducers,
  categories: categoriesReducers,
  pulses: pulsesReducers,
  details: detailsReducers,
  users: usersReducers,
  appState: appStateReducers,
  status: statusReducers,
  form: formReducer
  
})