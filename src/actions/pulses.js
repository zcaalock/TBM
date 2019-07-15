import pulses from '../apis/server'
import history from '../history'
import * as types from './types'

export const createPulse = (formValues, categoryId, boardId) => {
  return async (dispatch) => {    
    const responce = await pulses.post('/pulses', {...formValues, categoryId: categoryId, userInitials: '', status: ''})
    dispatch({type: types.CREATE_PULSE, payload: responce.data.pulses})
    history.push(`/boards/${boardId}/pulses/${responce.data.id}`)
    //console.log('create category: ',responce.data)    
  }
}

export const fetchPulses = () => async dispatch => {
  const responce = await pulses.get('/pulses')
  dispatch({type: types.FETCH_PULSES, payload: responce.data.pulses})
}

export const fetchPulse = (id) => async dispatch => {
  const responce = await pulses.get(`/pulses/${id}`)
  dispatch({type: types.FETCH_PULSE, payload: responce.data.pulses})
}

export const editPulse = (id, formValues) => async dispatch => {
  //console.log("edit pulse: ", id, formValues)
  const responce = await pulses.patch(`/pulses/${id}`, formValues)
  dispatch({type: types.EDIT_PULSE, payload: responce.data.pulses})
  
}

export const deletePulse = (id, boardId) => async dispatch => {
  await pulses.delete(`/pulses/${id}`)
  dispatch({type: types.DELETE_PULSE, payload: id})
  history.push(`/boards/${boardId}`)
  
}