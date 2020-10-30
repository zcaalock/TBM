//import client from '../apis/server'
import axios from 'axios'
import { editState } from './appState'
import * as types from './types'

export const createClient = (formValues, userId) => {
  return async (dispatch) => {    
    await axios.post('/client', { ...formValues, userId: userId, status: '#00A569', reminder:'' })
      .then((response) => {        
        dispatch({ type: types.CREATE_CLIENT, payload: response.data.client })
        dispatch(editState(response.data.message, 'responseMessage'))
        dispatch(editState(response.status, 'responseStatus'))
      })
      .catch((err) => {
        dispatch(editState(404, 'responseStatus'))
        console.log(err)
      })
  }
}

export const fetchClients = () => async dispatch => {
  const response = await axios.get('/clients')  
  dispatch({ type: types.FETCH_CLIENTS, payload: response.data })
}


export const editClient = (id, formValues) => async dispatch => {
  //console.log('edit client value: ', id, formValues)
  await axios.patch(`/client/${id}`, formValues)
    .then((response) => {
      //console.log('edit client response: ', response.data.client)
      dispatch({ type: types.EDIT_CLIENT, payload: response.data.client })
      dispatch(editState(response.data.message, 'responseMessage'))
      dispatch(editState(response.status, 'responseStatus'))
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}

export const deleteClient = (id) => async dispatch => {
  await axios.delete(`/client/${id}`)
    .then((response) => {
      dispatch({ type: types.DELETE_CLIENT, payload: id })
      dispatch(editState(response.data.message, 'responseMessage'))
      dispatch(editState(response.status, 'responseStatus'))
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}