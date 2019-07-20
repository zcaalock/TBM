import details from '../apis/server'
import * as types from './types'


export const createDetail = (formValues, id) => {
  return async (dispatch) => {    
    const responce = await details.post('/detail', {...formValues, pulseId: id})
    console.log('details res: ', responce.data.detail)
    dispatch({type: types.CREATE_DETAIL, payload: responce.data.detail})       
  }
}

export const fetchDetails = () => async dispatch => {
  const responce = await details.get('/details')
  dispatch({type: types.FETCH_DETAILS, payload: responce.data})
}

export const editDetail = (id, formValues) => async dispatch => {
  //console.log("edit pulse: ", id, formValues)
  const responce = await details.patch(`/detail/${id}`, formValues)
  dispatch({type: types.EDIT_DETAIL, payload: responce.data.detail})
  
}

export const deleteDetail = (id) => async dispatch => {
  await details.delete(`/detail/${id}`)
  dispatch({type: types.DELETE_DETAIL, payload: id})  
}