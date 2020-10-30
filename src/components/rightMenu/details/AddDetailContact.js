import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createDetail } from '../../../actions/details'
import { editContact } from '../../../actions/contacts'
import SingleInput from '../../Forms/SingleInput'
import { useTranslation } from "react-i18next"


function AddDetail(props) {

  const dispatch = useDispatch();
  const [isHovering, setHovering] = useState(false);
  const [itemEditable, setEditable] = useState(false)  
  const userId = useSelector(state => state.user.credentials.userId);
  const { t } = useTranslation() 
  const removeEdit = () => {
    setEditable(false)
  }

  const showEdit = () => {
    setEditable(true)
  }

  const hideIcon = () => {
    setHovering(false)
  }

  const showIcon = () => {
    setHovering(true)
  }

  const showHover = () => {
    if (isHovering === true) {
      return (
        <div data-position="bottom center"
          data-tooltip={t("Add item")}>
          <i className="plus icon" />
        </div>)
    }
  }
  const onSubmit = (formValues) => {
    dispatch(createDetail(formValues, props.contactId, userId))
    removeEdit()
    dispatch(editContact(props.contactId, { readed: [userId] }))
  }

  const renderNewDetail = () => {
    if (itemEditable === true) {
      return (
        <div className="">
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
        <div className=""
          onMouseLeave={() => hideIcon()}
          onMouseEnter={() => showIcon()}
          onDoubleClick={() => showEdit()}>
          <div style={{ cursor: 'pointer' }}>
            <div onClick={() => showEdit()} style={{ display: 'inline-block' }}>{showHover()}</div>
            <div style={{ display: 'inline-block' }}>{t('Add item')}</div>
          </div>
        </div>
      )
    }
  }

  return (
    <div style={{}} className="articleIcon" >
      <div className="menu" style={{ width: '100%', paddingLeft: '50px' }}>
        {renderNewDetail()}
      </div>
    </div>
  )
}

export default AddDetail