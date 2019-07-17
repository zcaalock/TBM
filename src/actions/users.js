import users from '../apis/server'
import * as types from './types'

export const fetchUsers = () => async dispatch => {
  const responce = await users.get('/users')
  //console.log(responce)
  //console.log(responce.data)
  dispatch({type: types.FETCH_USERS, payload: responce.data})
  
}
