import axios from 'axios'
//import boards from '../apis/server'
import history from '../history'
import * as types from './types'

export const createBoard = (formValues) => {  
  return async (dispatch) => {    
    const responce = await axios.post('/board', {...formValues})     
    await dispatch({type: types.CREATE_BOARD, payload: responce.data.board})
    await history.push(`/boards/${responce.data.board.id}`)    
  }
}

export const fetchBoards = () => async dispatch => {
  const responce = await axios.get('/boards')    
  dispatch({type: types.FETCH_BOARDS, payload: responce.data})
  
}

// export const fetchBoard = (id) => async dispatch => {
//   const responce = await axios.get(`/boards/${id}`)
//   dispatch({type: types.FETCH_BOARD, payload: responce.data})
// }

export const editBoard = (id, formValues) => async dispatch => {
  const responce = await axios.patch(`/board/${id}`, formValues)
  dispatch({type: types.EDIT_BOARD, payload: responce.data.board})
  
}

export const deleteBoard = (id) => async dispatch => {  
  await axios.delete(`/board/${id}`)
  dispatch({type: types.DELETE_BOARD, payload: id})
  history.push('/boards/')
  
}