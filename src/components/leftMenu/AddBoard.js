import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createBoard, createPrivateBoard } from '../../actions/boards'
import SingleInput from '../Forms/SingleInput'

function AddBoard(props) {
  const [isHovering, setIsHovering] = useState(false)
  const [itemEditable, setItemEditable] = useState(false)

  //onst boards = useSelector(state => _.keyBy(Object.values(state.boards), 'id'))
  const userId = useSelector(state => state.user.credentials.userId)

  const dispatch = useDispatch()

  const removeEdit = () => {
    setItemEditable(false)
  }

  const showEdit = () => {
    setItemEditable(true)
  }

  const hideIcon = () => {
    setIsHovering(false)
  }

  const showIcon = () => {
    setIsHovering(true)
  }

  const showHover = () => {
    if (isHovering === true) {
      return (
        <div
          style={{ cursor: 'pointer' }}
          data-position="right center"
          data-tooltip="Create board">
          <i className="plus icon" />
        </div>)
    }
  }

  const onSubmit = (formValues) => {
    if (props.name === 'New Board') dispatch(createBoard(formValues, ''))
    if (props.name === 'New Private Board') dispatch(createPrivateBoard(formValues, userId))
    removeEdit()
  }

  const renderNewBoard = () => {
    if (itemEditable === true) {
      return <SingleInput
        propStyle={{ paddingTop: '15px', paddingBottom: '10px' }}
        propChildStyle={{ padding: '0' }}
        removeEdit={() => removeEdit()}
        onSubmit={onSubmit} />
    }

    if (itemEditable === false) {
      return (
        <div
          onBlur={() => removeEdit()}
          onClick={() => showEdit()}
          onMouseLeave={() => hideIcon()}
          onMouseEnter={() => showIcon()}
          className="articleIcon" style={{ paddingTop: '15px', paddingBottom: '15px' }}
        >
          <div style={{ display: 'inline-block' }}>{showHover()}</div>
          <div style={{ display: 'inline-block' }}>{props.name}</div>
        </div>
      )
    }
  }

  return (
    <>
      {renderNewBoard()}
    </>
  )

}

export default AddBoard
