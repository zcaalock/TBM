import axios from 'axios'
import * as types from './types'


export const createNotepad = (formValues, id) => {
  console.log('create note', formValues, id)
  return async (dispatch) => {    
    const responce = await axios.post('/notepad', {...formValues, pulseId: id})    
    dispatch({type: types.CREATE_NOTEPAD, payload: responce.data.notes})       
  }
}

export const fetchNotepads = () => async dispatch => {
  const responce = await axios.get('/notepad')
  //console.log('notes: ', responce)
  dispatch({type: types.FETCH_NOTEPADS, payload: responce.data})
}

export const editNotepad = (id, formValues) => async dispatch => {  
  const responce = await axios.patch(`/notepad/${id}`, formValues)
  console.log('notes: ', responce)
  await dispatch({type: types.EDIT_NOTEPAD, payload: responce.data.notes})
  
}

export const deleteNotepad = (id) => async dispatch => {
  await axios.delete(`/notepad/${id}`)
  dispatch({type: types.DELETE_NOTEPAD, payload: id})  
}