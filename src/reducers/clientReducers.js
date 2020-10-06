import * as types from '../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    
     case types.FETCH_CLIENT:
       return {...state, [action.payload.id]: action.payload}
    
     case types.CREATE_CLIENT:
       return {...state, [action.payload.id]: action.payload}

     case types.EDIT_CLIENT:
       return {...state, [action.payload.id]: action.payload}
      
     case types.DELETE_CLIENT:
       return _.omit(state, action.payload)

    case types.FETCH_CLIENTS:
      return {...state, ..._.mapKeys(action.payload, 'id')}
    
    default:
      return state
  }
}