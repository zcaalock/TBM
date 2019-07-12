import pulses from '../apis/server'
import * as types from './types'

export const fetchPulses = () => async dispatch => {
  const responce = await pulses.get('/pulses')
  dispatch({type: types.FETCH_PULSES, payload: responce.data})
}

export const editPulse = (id, formValues) => async dispatch => {
  const responce = await pulses.patch(`/pulses/${id}`, formValues)
  dispatch({type: types.EDIT_PULSE, payload: responce.data})
  
}