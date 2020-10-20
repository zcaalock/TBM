import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {createContact } from '../../../../actions/contacts'
import SingleInput from '../../../Forms/SingleInput'

function AddContact(props) {
  
  const userId = useSelector(state => state.user.credentials.userId)

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
          data-position="bottom center"
          data-tooltip="Add contact">
          <i className="plus icon" />
        </div>)
    }
  }

  const onSubmit = (formValues) => {
    dispatch(createContact({title: formValues.title, mail: '', phone: '', project: '', archived: 'false', privateId: ''}, userId))    
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
          {renderNewPulse('Add contact')}
        </div>
        
  )}

export default AddContact