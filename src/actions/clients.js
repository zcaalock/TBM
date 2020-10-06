//import client from '../apis/server'
import axios from 'axios'
//import history from '../history'
import * as types from './types'

export const createClient = (formValues, userId) => {
  return async (dispatch) => {
    console.log('user: ', userId, formValues)
    const responce = await axios.post('/client', { ...formValues, userId: userId, status: 'green' })
    dispatch({ type: types.CREATE_CLIENT, payload: responce.data.client })
  }
}

export const fetchClients = () => async dispatch => {
  const responce = await axios.get('/clients')
  dispatch({ type: types.FETCH_CLIENTS, payload: responce.data })
}


export const editClient = (id, formValues) => async dispatch => {
  console.log('edit client value: ',id, formValues)
  const responce = await axios.patch(`/client/${id}`, formValues)
  console.log('edit client responce: ', responce.data.client)
  dispatch({ type: types.EDIT_CLIENT, payload: responce.data.client })
}

export const deleteClient = (id) => async dispatch => {
  await axios.delete(`/client/${id}`)
  dispatch({ type: types.DELETE_CLIENT, payload: id })
}