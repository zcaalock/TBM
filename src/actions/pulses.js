import axios from 'axios'
import { editState } from './appState'
import * as types from './types'

export const createPulse = (formValues, categoryId, userId) => {
  return async (dispatch) => {
    console.log('user: ', userId, formValues)
    await axios.post('/pulse', { ...formValues, categoryId: categoryId, userId: userId, status: 'In Progress', privateId: '' })
      .then((response) => {
        dispatch({ type: types.CREATE_PULSE, payload: response.data.pulse })
        dispatch(editState(response.data.message, 'responseMessage'))
        dispatch(editState(response.status, 'responseStatus'))
        console.log('response: ', response.data.pulse)
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
        console.log(err)
      })
  }
}

export const fetchPulses = () => async dispatch => {
  const response = await axios.get('/pulses')
  dispatch({ type: types.FETCH_PULSES, payload: response.data })
}

export const editPulse = (id, formValues) => async dispatch => {
  console.log('edit pulse value: ', formValues)
  await axios.patch(`/pulse/${id}`, formValues)
    .then((response) => {
      console.log('edit pulse response: ', response.data.pulse)
      dispatch({ type: types.EDIT_PULSE, payload: response.data.pulse })
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
      console.log(response)
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}