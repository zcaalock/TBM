import * as types from '../actions/types'
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    
    case types.FETCH_CATEGORY:
      return {...state, [action.payload.id]: action.payload}
    
    case types.CREATE_CATEGORY:
       return {...state, [action.payload.id]: action.payload}

    case types.EDIT_CATEGORY:
      return {...state, [action.payload.id]: action.payload}
      
     case types.DELETE_CATEGORY:
       return _.omit(state, action.payload)

    case types.FETCH_CATEGORIES:
      return {...state, ..._.mapKeys(action.payload, 'id')}
    
    default:
      return state
  }
}