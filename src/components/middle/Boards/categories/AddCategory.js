import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from '../../../../actions/categories'
import SingleInput from '../../../Forms/SingleInput'

function AddCategory() {

  const boardID = useSelector(state => state.appState.id)   

  const [isHovering, setIsHovering] = useState(false)
  const [itemEditable, setItemEditable] = useState(false)

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
          data-position="bottom center"
          data-tooltip="Create category">
          <i className="plus icon" />
        </div>)
    }
  }

  const onSubmit = (formValues) => {
    dispatch(createCategory(formValues, boardID))
    removeEdit()
  }

  const renderNewCategory = () => {
    if (itemEditable === true) {
      return (
        <div className="articleIcon header item">
          <SingleInput
            propStyle={{}}
            propChildStyle={{ padding: '5px' }}
            removeEdit={() => removeEdit()}
            onSubmit={onSubmit} />
        </div>
      )
    }

    if (itemEditable === false) {
      return (
        <div className="articleIcon header item"
          onMouseLeave={() => hideIcon()}
          onMouseEnter={() => showIcon()}
          onClick={() => showEdit()}>
          {showHover()}
          New Category
        </div>
      )
    }
  }

  return (
    <div style={{}} className="categories ui secondary text menu" >
      <div className="menu" style={{ width: '100%', backgroundColor: 'white' }}>
        {renderNewCategory()}
      </div>
    </div>
  )
}

export default AddCategory