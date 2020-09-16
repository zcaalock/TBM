import * as types from '../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) { 
    
     case types.CREATE_NOTEPAD:
       return {...state, [action.payload.id]: action.payload}

     case types.EDIT_NOTEPAD:
       return {...state, [action.payload.id]: action.payload}
      
     case types.DELETE_NOTEPAD:
       return _.omit(state, action.payload)

    case types.FETCH_NOTEPADS:
      return {...state, ..._.mapKeys(action.payload, 'id')}
    
    default:
      return state
  }
}