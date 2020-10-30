import * as types from '../actions/types'

const appState = {
  showArchived: false,
  showEmptyDates: false,
  showPrivate: false,
  refreshed: 'false',
  addPulseOpen: 'false',
  editPulseOpen: false,
  editCategoryOpen: false,
  editBoardOpen: false,
  editClientOpen: 'false',
  modalOpen: false,
  gCalendarOpen: 'false',
  clientSearch: '',
  contactSearch: '',
  pulseSearch: '',
  filter: { selector: '', value: '' },
  sortBy: { name: '', direction: 'asc' },
  clientsSettings: {
    showLead: true,
    showProject: true,
    showUnit: true,
    showPrice: true,
    showDate: true,
    showStatus: true,
    onlyPromising: false,
    showFilingDate: true,
    showReminder: true

  },
  contactsSettings: {
    showLead: true,
    showProject: true,    
    showDate: true,
    showPrivate: true    
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
    onlyArchived:false,
    hideDone:false,
    Future:'',
    Past:''
  },
  reminderSettings: {
    pastDays:-4,
    futureDays:12, 
    showContinous: true,
    showClients: true
  },
  expandCategory: '',
  detailId: '',
  categoryId: '',
  boardId: '',
  detailName: '',
  error: '',
  asyncCheck: '',
  submited: '',
  responseMessage: '',
  responseStatus: 0,
  languange: 'pl'
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