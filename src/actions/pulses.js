import axios from 'axios'
import { editState } from './appState'
import * as types from './types'

export const createPulse = (formValues, categoryId, userId) => {
  return async (dispatch) => {
    //console.log('user: ', userId, formValues)
    await axios.post('/pulse', { ...formValues, categoryId: categoryId, userId: userId, status: 'In Progress', privateId: '' })
      .then((response) => {
        dispatch({ type: types.CREATE_PULSE, payload: response.data.pulse })
        dispatch(editState(response.data.message, 'responseMessage'))
        dispatch(editState(response.status, 'responseStatus'))
        //console.log('response: ', response.data.pulse)
      })
      .catch((err) => {
        dispatch(editState(404, 'responseStatus'))
        console.log(err)
      })
  }
}

export const createPrivatePulse = (formValues, categoryId, userId) => {
  return async (dispatch) => {
    await axios.post('/pulse', { ...formValues, categoryId: categoryId, userId: userId, status: 'In Progress', privateId: userId })
      .then((response) => {
        dispatch({ type: types.CREATE_PULSE, payload: response.data.pulse })
        dispatch(editState(response.data.message, 'responseMessage'))
        dispatch(editState(response.status, 'responseStatus'))
      })
      .catch((err) => {
        dispatch(editState(404, 'responseStatus'))
        //console.log(err)
      })
  }
}

export const fetchPulses = (loading) => async dispatch => {
  await axios.get('/pulses').then(response=>{
    dispatch({ type: types.FETCH_PULSES, payload: response.data })
    if (loading === 'loading') dispatch(editState(true, 'fetchedPulses'))//; console.log('pulses fetched')
  })
}

export const fetchPulse = (id) => async dispatch => {
  await axios.get(`/pulse/${id}`)
    .then((response) => {
      //console.log(response)
      dispatch({ type: types.FETCH_PULSE, payload: response.data.pulse })
    })
    .catch((err) => {
      //dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}

export const editPulse = (id, formValues) => async dispatch => {
  //console.log('edit pulse value: ', formValues, ' id: ', id)
  await axios.patch(`/pulse/${id}`, formValues)
    .then((response) => {
      //console.log('edit pulse response: ', response.data.pulse)
      dispatch({ type: types.EDIT_PULSE, payload: response.data.pulse })
      dispatch(fetchPulse(id))
      if (!formValues.readed) dispatch(editState(response.data.message, 'responseMessage'))
      if (!formValues.readed) dispatch(editState(response.status, 'responseStatus'))
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}

export const deletePulse = (id) => async dispatch => {
  await axios.delete(`/pulse/${id}`)
    .then((response) => {
      dispatch(dispatch({ type: types.DELETE_PULSE, payload: id }))
      dispatch(editState(response.data.message, 'responseMessage'))
      dispatch(editState(response.status, 'responseStatus'))
      //console.log(response)
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}