import React from 'react'
import { useDispatch } from "react-redux";
import _ from 'lodash'
import { editContact } from '../../../../actions/contacts'
import SingleInput from '../../../Forms/SingleInput'

function EditContactName(props) {
  //console.log(props)
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(editContact(props.contact.id, formValues))
    props.removeEdit()
  }

  const renderEditContact = () => {

    if (props.editState.itemEditable === true) {
      return (
        <SingleInput
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '5px' }}
          initialValues={_.pick(props.contact, 'title')}
          removeEdit={() => props.removeEdit()}
          onSubmit={onSubmit} />
      )
    }

    if (props.editState.itemEditable === false) {
      return (
        <div >
          <div>{props.contact.title}</div>
        </div>
      )
    }
  }
  return (
    <div style={{ width: '100%' }}>
      {renderEditContact()}
    </div>
  )
}

export default EditContactName
