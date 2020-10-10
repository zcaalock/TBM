//import details from '../apis/server'
import axios from 'axios'
import * as types from './types'
import { editState } from './appState'


export const createDetail = (formValues, id) => {
  return async (dispatch) => {
    const response = await axios.post('/detail', { ...formValues, pulseId: id })
    dispatch({ type: types.CREATE_DETAIL, payload: response.data.detail })
  }
}

export const fetchDetails = () => async dispatch => {
  const response = await axios.get('/details')
  dispatch({ type: types.FETCH_DETAILS, payload: response.data })
}

export const editDetail = (id, formValues) => async dispatch => {
  await axios.patch(`/detail/${id}`, formValues)
    .then((response) => {
      dispatch({ type: types.EDIT_DETAIL, payload: response.data.detail })
      dispatch(editState(response.data.message, 'responseMessage'))
      dispatch(editState(response.status, 'responseStatus'))
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })

}

export const deleteDetail = (id) => async dispatch => {
  await axios.delete(`/detail/${id}`)
    .then((response) => {
      dispatch({ type: types.DELETE_DETAIL, payload: id })
      dispatch(editState(response.data.message, 'responseMessage'))
      dispatch(editState(response.status, 'responseStatus'))
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}