import * as types from '../actions/types'

const appState ={
  showArchived: 'false',
  hideEmptyDates: 'false',
  showNotifications: 'false',
  hidePrivate: 'false',
  refreshed: 'false',
  addPulseOpen: 'false',
  editPulseOpen: 'false',
  filter: {selector: '', value: ''},
  sortBy: {name: '', direction: 'asc'} 
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