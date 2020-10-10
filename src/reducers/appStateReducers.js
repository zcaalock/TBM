import * as types from '../actions/types'

const appState = {
  showArchived: false,
  showEmptyDates: false,
  showPrivate: false,
  refreshed: 'false',
  addPulseOpen: 'false',
  editPulseOpen: 'false',
  editClientOpen: 'false',
  modalOpen: false,
  gCalendarOpen: 'false',
  clientSearch: '',
  pulseSearch: '',
  filter: { selector: '', value: '' },
  sortBy: { name: '', direction: 'asc' },
  clientsSettings: {
    showLead: true,
    showProject: true,
    showUnit: true,
    showPrice: true,
    showDate: true,
    showStatus: true
  },
  filterSettings: {
    searchTitle: true,
    searchBoard: true,
    searchCategory: true,
    searchLead:true,
    searchStatus: true,
    searchArchived:false,
    searchPrivate:false, 
    onlyPrivate:false,
    onlyArchived:false
  },
  expandCategory: '',
  detailId: '',
  detailName: '',
  error: '',
  submited: '',
  responseMessage: '',
  responseStatus: 0
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