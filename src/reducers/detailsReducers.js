import * as types from '../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) { 
    
     case types.CREATE_DETAIL:
       return {...state, [action.payload.id]: action.payload}

     case types.EDIT_DETAIL:
       return {...state, [action.payload.id]: action.payload}
      
     case types.DELETE_DETAIL:
       return _.omit(state, action.payload)

    case types.FETCH_DETAILS:
      return {...state, ..._.mapKeys(action.payload, 'id')}
    
    default:
      return state
  }
}