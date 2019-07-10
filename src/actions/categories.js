import categories from '../apis/server'
import * as types from './types'

export const fetchCategories = () => async dispatch => {
  const responce = await categories.get('/categories')
  dispatch({type: types.FETCH_CATEGORIES, payload: responce.data})
}