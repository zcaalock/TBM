import axios from 'axios'
import * as types from './types'


export const fetchLead = () => async dispatch => {
  const responce = await axios.get('/lead')
  console.log('lead: ', responce.data)
  //console.log(responce.data)
  dispatch({type: types.FETCH_LEAD, payload: responce.data})
  
}