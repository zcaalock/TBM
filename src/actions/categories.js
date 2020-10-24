import { editState } from './appState'
import axios from 'axios'
import * as types from './types'

export const createCategory = (formValues, id) => {

  return async (dispatch) => {
    const responce = await axios.post('/category', { ...formValues, boardId: id })
    //console.log('responce category: ', responce.data.category)
    dispatch({ type: types.CREATE_CATEGORY, payload: responce.data.category })
  }
}

export const fetchCategories = () => async dispatch => {
  const responce = await axios.get('/categories')
  dispatch({ type: types.FETCH_CATEGORIES, payload: responce.data })
}

export const editCategory = (id, formValues, fetch) => async dispatch => {
  //console.log(id, formValues)
  await axios.patch(`/category/${id}`, formValues)
    .then(() => {
      axios
        .get(`/category/${id}`)
        .then((response) => {
          dispatch({ type: types.EDIT_CATEGORY, payload: response.data })
          dispatch(editState(response.data.message, 'responseMessage'))
          dispatch(editState(response.status, 'responseStatus'))
        })
        .catch((err) => {
          dispatch(editState(404, 'responseStatus'))
          console.log(err)
        })
    })
}

export const deleteCategory = (id, boardId) => async dispatch => {
  await axios.delete(`/category/${id}`)
  dispatch({ type: types.DELETE_CATEGORY, payload: id })
}