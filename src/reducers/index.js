import { combineReducers } from 'redux'
import boardReducers from './boardReducers'
import appStateReducers from './appStateReducers'
import categoriesReducers from './categoriesReducers'
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
  boards: boardReducers,
  categories:categoriesReducers,
  appState: appStateReducers,
  form: formReducer
  
})