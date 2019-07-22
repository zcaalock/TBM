import axios from 'axios'
import * as types from './types'


export const fetchLead = () => async dispatch => {
  const responce = await axios.get('/lead')  
  dispatch({type: types.FETCH_LEAD, payload: responce.data})
  
}

export const createLead = (formValues, id) => {
  return async (dispatch) => {    
    const responce = await axios.post(`/lead/${id}`, formValues)    
    dispatch({type: types.CREATE_LEAD, payload: responce.data.lead}) 
        
  }
}

export const editLead = (id, formValues) => async dispatch => {  
  const responce = await axios.patch(`/lead/${id}`, formValues)
  await dispatch({type: types.EDIT_LEAD, payload: responce.data.lead})
  
}

export const deleteLead = (id) => async dispatch => {
  await axios.delete(`/lead/${id}`)
  dispatch({type: types.DELETE_LEAD, payload: id})
    
}