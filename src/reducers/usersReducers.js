import * as types from '../actions/types'
// import _ from 'lodash'

// export default (state = {}, action) => {
//   switch (action.type) {
    
//     // case types.FETCH_BOARD:
//     //   return {...state, [action.payload.id]: action.payload}
    
//     // case types.CREATE_PULSE:
//     //   return {...state, [action.payload.id]: action.payload}

//     // case types.EDIT_PULSE:
//     //   return {...state, [action.payload.id]: action.payload}
      
//     // case types.DELETE_BOARD:
//     //   return _.omit(state, action.payload)

//     case types.FETCH_USERS:
//       return {...state, ..._.mapKeys(action.payload, 'id')}
    
//     default:
//       return state
//   }
// }

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {}  
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case types.SET_UNAUTHENTICATED:
      return initialState;
    case types.SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case types.LOADING_USER:
      return {
        ...state,
        loading: true
      };    
    default:
      return state;
  }
}