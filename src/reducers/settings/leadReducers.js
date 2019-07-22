import * as types from '../../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    
    // case types.FETCH_LEAD:
    //   return action.payload
    
     case types.CREATE_LEAD:
       return {...state, [action.payload.id]: action.payload}

     case types.EDIT_LEAD:
       return {...state, [action.payload.id]: action.payload}
      
     case types.DELETE_LEAD:
       return _.omit(state, action.payload)
    case types.FETCH_LEAD:
      return {...state, ..._.mapKeys(action.payload, 'id')}
      
    default:
      return state
  }
}