import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { deleteCategory } from '../../../../actions/categories'

function DeleteCategory(props) {

  const pulses = useSelector(state => Object.values(state.pulses));
  const boardId = useSelector(state => state.appState.id);

  const dispatch = useDispatch()

  const renderDelete = () => {
    const puls = _.filter(pulses, { categoryId: props.categoryId })
    if (puls.length > 0) {
      return (
        <div
          data-position="bottom left"
          data-tooltip="Remove all pulses before delete"
          style={{ display: 'inline-block' }}>
          <i className="trash icon" style={{ paddingLeft: '10px', color: '#cecece' }} />
        </div>
      )
    } return (
      <div
        onClick={() => { dispatch(deleteCategory(props.categoryId, boardId)) }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Delete"
        style={{ display: 'inline-block', cursor: 'pointer', }}>
        <i style={{ paddingLeft: '10px' }} className=" trash icon" />
      </div>
    )
  }

  return (
    <>
      {renderDelete()}
    </>
  )
}

export default DeleteCategory