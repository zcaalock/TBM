import history from '../history'
import categories from '../apis/server'
import * as types from './types'


export const createCategory = (formValues, id) => {
  return async (dispatch) => {    
    const responce = await categories.post('/categories', {...formValues, boardId: id})
    dispatch({type: types.CREATE_CATEGORY, payload: responce.data.categories})
    //console.log('create category: ',responce.data)    
  }
}


export const fetchCategories = () => async dispatch => {
  const responce = await categories.get('/categories')
  dispatch({type: types.FETCH_CATEGORIES, payload: responce.data.categories})
}

export const editCategory = (id, formValues) => async dispatch => {
  const responce = await categories.patch(`/categories/${id}`, formValues)
  dispatch({type: types.EDIT_CATEGORY, payload: responce.data.categories})
  
}

export const deleteCategory = (id, boardId) => async dispatch => {
  await categories.delete(`/categories/${id}`)
  dispatch({type: types.DELETE_CATEGORY, payload: id})
  history.push(`/boards/${boardId}`)
  //history.push('/')
  
}