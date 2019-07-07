import { combineReducers } from 'redux'
import boardReducers from './boardReducers'
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
  boards: boardReducers,
  form: formReducer
  
})