import { combineReducers } from 'redux'
import boardReducers from './boardReducers'
import appStateReducers from './appStateReducers'
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
  boards: boardReducers,
  appState: appStateReducers,
  form: formReducer
  
})