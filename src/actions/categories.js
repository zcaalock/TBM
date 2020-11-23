import { editState } from './appState'
import axios from 'axios'
import * as types from './types'

export const createCategory = (formValues, id, sendToAppState) => {
  return async (dispatch) => {
    const response = await axios.post('/category', { ...formValues, boardId: id })
    //console.log('response category: ', response.data.category)
    dispatch({ type: types.CREATE_CATEGORY, payload: response.data.category })
    if (sendToAppState === true) dispatch(editState(response.data.category, 'categoryId'))
    dispatch(editState(response.data.message, 'responseMessage'))
    dispatch(editState(response.status, 'responseStatus'))
  }
}

export const fetchCategories = (loading) => async dispatch => {
  await axios.get('/categories').then(response => {
    dispatch({ type: types.FETCH_CATEGORIES, payload: response.data })
    if (loading === 'loading') dispatch(editState(true, 'fetchedCategories'))//; console.log('categories fetched')   
  })
}

export const fetchCategory = (id) => async dispatch => {
  await axios.get(`/category/${id}`)
    .then((response) => {
      dispatch({ type: types.FETCH_CATEGORY, payload: response.data })
      console.log(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
}



export const editCategory = (id, formValues, fetch) => async dispatch => {
  //console.log(id, formValues)
  await axios.patch(`/category/${id}`, formValues)
    .then(() => {
      axios
        .get(`/category/${id}`)
        .then((response) => {
          dispatch({ type: types.EDIT_CATEGORY, payload: response.data })  
          if (fetch === true) dispatch(fetchCategory(id))                           
          dispatch(editState(response.data.message, 'responseMessage'))
          dispatch(editState(response.status, 'responseStatus'))
        })
        .catch((err) => {
          dispatch(editState(404, 'responseStatus'))
          console.log(err)
        })
    })
}

export const deleteCategory = (id) => async dispatch => {
  await axios.delete(`/category/${id}`)
  dispatch({ type: types.DELETE_CATEGORY, payload: id })
}