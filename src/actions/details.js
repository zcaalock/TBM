//import details from '../apis/server'
import axios from 'axios'
import * as types from './types'


export const createDetail = (formValues, id) => {
  return async (dispatch) => {    
    const responce = await axios.post('/detail', {...formValues, pulseId: id})    
    dispatch({type: types.CREATE_DETAIL, payload: responce.data.detail})       
  }
}

export const fetchDetails = () => async dispatch => {
  const responce = await axios.get('/details')
  dispatch({type: types.FETCH_DETAILS, payload: responce.data})
}

export const editDetail = (id, formValues) => async dispatch => {  
  const responce = await axios.patch(`/detail/${id}`, formValues)
  await dispatch({type: types.EDIT_DETAIL, payload: responce.data.detail})
  
}

export const deleteDetail = (id) => async dispatch => {
  await axios.delete(`/detail/${id}`)
  dispatch({type: types.DELETE_DETAIL, payload: id})  
}