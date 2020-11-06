import axios from 'axios'
import * as types from './types'
import { editState } from './appState'


export const createNotepad = (formValues, id) => {
  //console.log('create note', formValues, id)
  return async (dispatch) => {    
    const response = await axios.post('/notepad', {...formValues, pulseId: id})    
    dispatch({type: types.CREATE_NOTEPAD, payload: response.data.notes})       
  }
}

export const fetchNotepads = (loading) => async dispatch => {
  await axios.get('/notepad').then(response=>{
    dispatch({type: types.FETCH_NOTEPADS, payload: response.data})
    if (loading === 'loading') dispatch(editState(true, 'fetchedNotepad'))//; console.log('notepad fetched')
  })
}

export const editNotepad = (id, formValues) => async dispatch => {  
  const response = await axios.patch(`/notepad/${id}`, formValues)
  //console.log('notes: ', response.data.notes)
  await dispatch({type: types.EDIT_NOTEPAD, payload: response.data.notes})
  
}

export const deleteNotepad = (id) => async dispatch => {
  await axios.delete(`/notepad/${id}`)
  dispatch({type: types.DELETE_NOTEPAD, payload: id})  
}