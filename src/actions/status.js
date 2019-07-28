//import status from '../apis/server'
import axios from 'axios'
import * as types from './types'

export const fetchStatus = () => async dispatch => {
  const responce = await axios.get('/status')
  await dispatch({type: types.FETCH_STATUS, payload: responce.data})
}