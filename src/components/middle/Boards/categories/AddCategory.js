import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from '../../../../actions/categories'
import SingleInput from '../../../Forms/SingleInput'
import { useTranslation } from "react-i18next"

function AddCategory() {

  const boardID = useSelector(state => state.appState.id)   
  const { t } = useTranslation()
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
          data-tooltip={t("Create category")}>
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
          {t('Create category')}
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