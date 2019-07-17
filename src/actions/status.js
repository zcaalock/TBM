import status from '../apis/server'
import * as types from './types'

export const fetchStatus = () => async dispatch => {
  const responce = await status.get('/status')
  await dispatch({type: types.FETCH_STATUS, payload: responce.data})
}