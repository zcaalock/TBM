import * as types from '../actions/types'

const appState ={
  showArchived: 'false',
  hideEmptyDates: 'false',
  showNotifications: 'false',
  hidePrivate: 'false',
  refreshed: 'false',
  addPulseOpen: 'false',
  editPulseOpen: 'false',
  editClientOpen: 'false',
  gCalendarOpen: 'false',
  clientSearch: '',
  filter: {selector: '', value: ''},
  sortBy: {name: '', direction: 'asc'},
  clientsSettings: {
    showLead: true,
    showProject: true,
    showUnit: true,
    showPrice: true,
    showDate: true,
    showStatus: true
  },
  detailId: '',
  detailName: '',
  error: '',
  submited: ''
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