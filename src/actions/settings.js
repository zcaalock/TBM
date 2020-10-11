import axios from 'axios'
import * as types from './types'
import { editState } from './appState'


export const fetchLead = () => async dispatch => {
  const response = await axios.get('/lead')
  dispatch({ type: types.FETCH_LEAD, payload: response.data })

}

export const createLead = (formValues, id) => {
  return async (dispatch) => {
    const response = await axios.post(`/lead/${id}`, formValues)
    dispatch({ type: types.CREATE_LEAD, payload: response.data.lead })

  }
}

export const editLead = (id, formValues) => async dispatch => {
  await axios.patch(`/lead/${id}`, formValues)    
    .then((response) => {
      //console.log('editLead: ', response)
      dispatch({ type: types.EDIT_LEAD, payload: response.data.lead })
      dispatch(editState(response.data.message, 'responseMessage'))
      dispatch(editState(response.status, 'responseStatus'))
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}

export const deleteLead = (id) => async dispatch => {
  await axios.delete(`/lead/${id}`)
  dispatch({ type: types.DELETE_LEAD, payload: id })

}