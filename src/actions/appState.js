import * as types from './types'

export const editState = (content, selector) => {  
  return {type: types.EDIT_STATE, content, selector }
  
}