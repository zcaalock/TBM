import boards from '../apis/boards'
import history from '../history'
import * as types from './types'

export const createBoard = (formValues) => {
  return async (dispatch) => {
    const responce = await boards.post('/boards', {...formValues})
    dispatch({type: types.CREATE_BOARD, payload: responce.data})
    history.push('/')
  }
}

export const fetchBoards = () => async dispatch => {
  const responce = await boards.get('/boards')
  dispatch({type: types.FETCH_BOARDS, payload: responce.data})
}

export const fetchBoard = (id) => async dispatch => {
  const responce = await boards.get(`/boards/${id}`)
  dispatch({type: types.FETCH_BOARD, payload: responce.data})
}

export const editBoard = (id, formValues) => async dispatch => {
  const responce = await boards.patch(`/boards/${id}`, formValues)
  dispatch({type: types.EDIT_BOARD, payload: responce.data})
  
}

export const deleteBoard = (id) => async dispatch => {
  await boards.delete(`/boards/${id}`)
  dispatch({type: types.DELETE_BOARD, payload: id})
  
}