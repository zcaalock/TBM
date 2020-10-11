//import client from '../apis/server'
import axios from 'axios'
import { editState } from './appState'
import * as types from './types'

export const createContact = (formValues, userId) => {
  //console.log('create contact: ', userId, formValues)
  return async (dispatch) => {    
    await axios.post('/contact', { ...formValues, userId: userId })
      .then((response) => {        
        dispatch({ type: types.CREATE_CONTACT, payload: response.data.contact })        
        dispatch(editState(response.data.message, 'responseMessage'))
        dispatch(editState(response.status, 'responseStatus'))
      })
      .catch((err) => {
        dispatch(editState(404, 'responseStatus'))
        console.log(err)
      })
  }
}

export const fetchContacts = () => async dispatch => {
  const response = await axios.get('/contacts')
  dispatch({ type: types.FETCH_CONTACTS, payload: response.data })
}


export const editContact = (id, formValues) => async dispatch => {
  //console.log('edit client value: ', id, formValues)
  await axios.patch(`/contact/${id}`, formValues)
    .then((response) => {
      //console.log('edit contact fv: ', id, formValues)
      //console.log('edit client response: ', response.data.client)
      dispatch({ type: types.EDIT_CONTACT, payload: response.data.contact })
      dispatch(editState(response.data.message, 'responseMessage'))
      dispatch(editState(response.status, 'responseStatus'))
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}

export const deleteContact = (id) => async dispatch => {
  await axios.delete(`/contact/${id}`)
    .then((response) => {
      dispatch({ type: types.DELETE_CONTACT, payload: id })
      dispatch(editState(response.data.message, 'responseMessage'))
      dispatch(editState(response.status, 'responseStatus'))
    })
    .catch((err) => {
      dispatch(editState(404, 'responseStatus'))
      console.log(err)
    })
}