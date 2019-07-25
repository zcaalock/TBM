import * as types from '../actions/types'

const appState ={
  showArchived: 'false'
}

export default (state = appState, action) => {
  switch (action.type) {
    case types.EDIT_STATE:
      return {
        ...state,
        [action.selector]: action.content
      }


    default:
      return state
  }
}