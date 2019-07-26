//import pulses from '../apis/server'
import axios from 'axios'
//import history from '../history'
import * as types from './types'

export const createPulse = (formValues, categoryId) => {
  return async (dispatch) => {                             //TODO update initials with user handle
    const responce = await axios.post('/pulse', {...formValues, categoryId: categoryId, status: 'In Progress'})
    dispatch({type: types.CREATE_PULSE, payload: responce.data.pulse})
    //history.push(`/boards/${boardId}/pulses/${responce.data.pulse.id}`)       
  }
}

export const fetchPulses = () => async dispatch => {
  const responce = await axios.get('/pulses')   
  dispatch({type: types.FETCH_PULSES, payload: responce.data})
}

// export const fetchPulse = (id) => async dispatch => {
//   const responce = await axios.get(`/pulses/${id}`)
//   dispatch({type: types.FETCH_PULSE, payload: responce.data})
// }

export const editPulse = (id, formValues) => async dispatch => {  
  const responce = await axios.patch(`/pulse/${id}`, formValues)    
  dispatch({type: types.EDIT_PULSE, payload: responce.data.pulse})
  
}

export const deletePulse = (id, boardId) => async dispatch => {
  await axios.delete(`/pulse/${id}`)
  dispatch({type: types.DELETE_PULSE, payload: id})
  //history.push(`/boards/${boardId}`)
  
}