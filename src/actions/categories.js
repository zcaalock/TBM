import history from '../history'
import categories from '../apis/server'
import * as types from './types'


export const createCategory = (formValues, id) => {
  console.log('board id:', id)
  return async (dispatch) => {    
    const responce = await categories.post('/category', {...formValues, boardId: id})
    dispatch({type: types.CREATE_CATEGORY, payload: responce.data.category})
    //history.push(`/boards/${id}`)
    //console.log('create category: ',id)    
  }
}


export const fetchCategories = () => async dispatch => {
  const responce = await categories.get('/categories')
  dispatch({type: types.FETCH_CATEGORIES, payload: responce.data})
}

export const editCategory = (id, formValues) => async dispatch => {
  const responce = await categories.patch(`/categories/${id}`, formValues)
  dispatch({type: types.EDIT_CATEGORY, payload: responce.data})
  
}

export const deleteCategory = (id, boardId) => async dispatch => {
  await categories.delete(`/categories/${id}`)
  dispatch({type: types.DELETE_CATEGORY, payload: id})
  history.push(`/boards/${boardId}`)
  //history.push('/')
  
}