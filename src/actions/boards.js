import axios from 'axios'
import { editState } from './appState'
import history from '../history'
import * as types from './types'

export const createBoard = (formValues) => {  
  return async (dispatch) => {    
    const response = await axios.post('/board', {...formValues, privateId: ''})     
    await dispatch({type: types.CREATE_BOARD, payload: response.data.board})
    await history.push(`/boards/${response.data.board.id}`)    
  }
}

export const createPrivateBoard = (formValues, userId) => {  
  return async (dispatch) => {    
    const response = await axios.post('/board', {...formValues, privateId: userId})     
    await dispatch({type: types.CREATE_BOARD, payload: response.data.board})
    await history.push(`/boards/${response.data.board.id}`)    
  }
}

export const fetchBoards = (loading) => async dispatch => {
  await axios.get('/boards').then(response=>{
    dispatch({type: types.FETCH_BOARDS, payload: response.data})
    if(loading === 'loading') dispatch(editState(true, 'fetchedBoards'))//;console.log('boards fetched')    
  })    
  
  
}

export const editBoard = (id, formValues) => async dispatch => {
  const response = await axios.patch(`/board/${id}`, formValues)
  dispatch({type: types.EDIT_BOARD, payload: response.data.board})
  
}

export const deleteBoard = (id, userId) => async dispatch => {  
  await axios.delete(`/board/${id}`)
  dispatch({type: types.DELETE_BOARD, payload: id})
  history.push(`/filters/LeadPerson/${userId}`)
  
}