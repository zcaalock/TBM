import * as types from '../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    
     case types.FETCH_COMPETITION:
       return {...state, [action.payload.id]: action.payload}
    
     case types.CREATE_COMPETITION:
       return {...state, [action.payload.id]: action.payload}

     case types.EDIT_COMPETITION:
       return {...state, [action.payload.id]: action.payload}
      
     case types.DELETE_COMPETITION:
       return _.omit(state, action.payload)

    case types.FETCH_COMPETITIONS:
      return {...state, ..._.mapKeys(action.payload, 'id')}
    
    default:
      return state
  }
}