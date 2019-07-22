import axios from 'axios'
import * as types from './types'


export const fetchLead = () => async dispatch => {
  const responce = await axios.get('/lead')  
  dispatch({type: types.FETCH_LEAD, payload: responce.data})
  
}