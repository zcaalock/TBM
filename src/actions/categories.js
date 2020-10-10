//import history from '../history'
//import categories from '../apis/server'
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

export const editCategory = (id, formValues) => async dispatch => {
  //console.log(id, formValues)
  axios.patch(`/category/${id}`, formValues)
    .then(() => {
      axios
        .get(`/category/${id}`)
        .then((res) => {
          dispatch({ type: types.EDIT_CATEGORY, payload: res.data })
          //console.log('cat: ', res.data)
          //history.push(`/mypulses/${res.data.credentials.userId}`);
        })
        .catch((err) => console.log(err))
    })
}

export const deleteCategory = (id, boardId) => async dispatch => {
  await axios.delete(`/category/${id}`)
  dispatch({ type: types.DELETE_CATEGORY, payload: id })
}