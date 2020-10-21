import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {createClient } from '../../../../actions/clients'
import SingleInput from '../../../Forms/SingleInput'
import { useTranslation } from "react-i18next"
function AddClient(props) {
  
  const userId = useSelector(state => state.user.credentials.userId)

  const [isHovering, setIsHovering] = useState(false)
  const [itemEditable, setItemEditable] = useState(false)

  const dispatch = useDispatch()
const { t, i18n } = useTranslation() 
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
          data-position="top center"
          data-tooltip={t("Create Client")}>
          <i className="plus icon" />
        </div>)
    }
  }

  const onSubmit = (formValues) => {
    dispatch(createClient({title: formValues.title, mail: '', phone: '', project: '', unit: '', price: ''}, userId))    
    removeEdit()
  }

  const renderNewPulse = (name) => {
    if (itemEditable === true) {
      return (
        <div style={{ width: '100%' }}>
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
        <div style={{ width: '100%', paddingBottom: '15px' }}
          onMouseLeave={() => hideIcon()}
          onMouseEnter={() => showIcon()}
          onClick={() => showEdit()}>
          <div style={{ display: 'inline-block' }}>{showHover()}</div>
          <div style={{ display: 'inline-block' }}>{name}</div>
        </div>
      )
    }
  }

  return (
    
        <div className="tableNewPulse" style={{ paddingLeft: '26px', cursor: 'pointer', height: '40px' }} data-label="Name">
          {/* {this.renderNewPulse()} */}
          {renderNewPulse(t('Create Client'))}
        </div>
        
  )}

export default AddClient