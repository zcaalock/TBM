import * as types from '../../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    
    // case types.FETCH_LEAD:
    //   return action.payload
    
    // case types.CREATE_PULSE:
    //   return {...state, [action.payload.id]: action.payload}

    // case types.EDIT_PULSE:
    //   return {...state, [action.payload.id]: action.payload}
      
    // case types.DELETE_BOARD:
    //   return _.omit(state, action.payload)
    case types.FETCH_LEAD:
      return {...state, ..._.mapKeys(action.payload, 'id')}
      
    default:
      return state
  }
}