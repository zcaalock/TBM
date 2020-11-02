import axios from 'axios'
import { editState } from './appState'
import * as types from './types'

export const createCompetition = (formValues, userId) => {
  return async (dispatch) => {
    await axios.post('/competition', { ...formValues, userId: userId, reminder: '', status: '' })
      .then((response) => {
        dispatch({ type: types.CREATE_COMPETITION, payload: response.data.competition })
        dispatch(editState(response.data.message, 'responseMessage'))
        dispatch(editState(response.status, 'responseStatus'))
      })
      .catch((err) => {
        dispatch(editState(404, 'responseStatus'))
        console.log(err)
      })
  }
}

export const fetchCompetitions = (loading) => async dispatch => {
  await axios.get('/competitions').then(response => {
    dispatch({ type: types.FETCH_COMPETITIONS, payload: response.data })
    if (loading === 'loading') dispatch(editState(true, 'fetchedCompetitions'))//; console.log('competitions fetched')
  })
}


export const editCompetition = (id, formValues) => async dispatch => {
  //console.log('edit competition value: ', id, formValues)
  await axios.patch(`/competition/${id}`, formValues)
    .then((response) => {
      //console.log('edit competition response: ', response.data.competition)
      dispatch({ type: types.EDIT_COMPETITION, payload: response.data.competition })
      dispatch(editState(response.data.message, 'responseMessage'))
      dispatch(editState(response.status, 'responseStatus'))
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}

export const deleteCompetition = (id) => async dispatch => {
  await axios.delete(`/competition/${id}`)
    .then((response) => {
      dispatch({ type: types.DELETE_COMPETITION, payload: id })
      dispatch(editState(response.data.message, 'responseMessage'))
      dispatch(editState(response.status, 'responseStatus'))
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}