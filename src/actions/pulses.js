import pulses from '../apis/server'
import * as types from './types'

export const createPulse = (formValues, id) => {
  return async (dispatch) => {    
    const responce = await pulses.post('/pulses', {...formValues, categoryId: id, userInitials: '', status: ''})
    dispatch({type: types.CREATE_PULSE, payload: responce.data})
    //console.log('create category: ',responce.data)    
  }
}

export const fetchPulses = () => async dispatch => {
  const responce = await pulses.get('/pulses')
  dispatch({type: types.FETCH_PULSES, payload: responce.data})
}

export const editPulse = (id, formValues) => async dispatch => {
  console.log("edit pulse: ", id, formValues)
  const responce = await pulses.patch(`/pulses/${id}`, formValues)
  dispatch({type: types.EDIT_PULSE, payload: responce.data})
  
}