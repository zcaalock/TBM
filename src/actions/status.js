import { editState } from './appState'
import axios from 'axios'
import * as types from './types'

export const fetchStatus = (loading) => async dispatch => {
  await axios.get('/status').then(response=>{
    dispatch({type: types.FETCH_STATUS, payload: response.data})
    if (loading === 'loading') dispatch(editState(true, 'fetchedStatus'))//; console.log('status fetched')
  })
}