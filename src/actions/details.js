import details from '../apis/server'
import * as types from './types'


export const createDetail = (formValues, id) => {
  return async (dispatch) => {    
    const responce = await details.post('/details', {...formValues, pulseId: id, check: false})
    dispatch({type: types.CREATE_DETAIL, payload: responce.data})
    //history.push(`/boards/${id}/pulses/${responce.data.id}`)
    //console.log('create category: ',responce.data)    
  }
}

export const fetchDetails = () => async dispatch => {
  const responce = await details.get('/details')
  dispatch({type: types.FETCH_DETAILS, payload: responce.data.details})
}

export const editDetail = (id, formValues) => async dispatch => {
  //console.log("edit pulse: ", id, formValues)
  const responce = await details.patch(`/details/${id}`, formValues)
  dispatch({type: types.EDIT_DETAIL, payload: responce.data.details})
  
}

export const deleteDetail = (id) => async dispatch => {
  await details.delete(`/details/${id}`)
  dispatch({type: types.DELETE_DETAIL, payload: id})  
}