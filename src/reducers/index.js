import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import boardReducers from './boardReducers'
import appStateReducers from './appStateReducers'
import categoriesReducers from './categoriesReducers'
import pulsesReducers from './pulsesReducers'
import detailsReducers from './detailsReducers'
import usersReducers from './usersReducers'

import uiReducers from './uiReducers';

//settings
import statusReducers from './settings/statusReducers'
import leadReducers from './settings/leadReducers'


export default combineReducers({
  boards: boardReducers,
  categories: categoriesReducers,
  pulses: pulsesReducers,
  details: detailsReducers,
  user: usersReducers,
  appState: appStateReducers,
  status: statusReducers,
  UI: uiReducers,
  form: formReducer,
  lead: leadReducers,  
})