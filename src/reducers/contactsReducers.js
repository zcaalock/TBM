import * as types from '../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    
     case types.FETCH_CONTACT:
       return {...state, [action.payload.id]: action.payload}
    
     case types.CREATE_CONTACT:
       return {...state, [action.payload.id]: action.payload}

     case types.EDIT_CONTACT:
       return {...state, [action.payload.id]: action.payload}
      
     case types.DELETE_CONTACT:
       return _.omit(state, action.payload)

    case types.FETCH_CONTACTS:
      return {...state, ..._.mapKeys(action.payload, 'id')}
    
    default:
      return state
  }
}