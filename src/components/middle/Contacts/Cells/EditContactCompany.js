import React from 'react'
import { useDispatch } from "react-redux"
import { editContact } from '../../../../actions/contacts'
import SingleInput from '../../../Forms/SingleInput'

function EditContactCompany(props) {
  //console.log(props)
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    //console.log(formValues)
    dispatch(editContact(props.contact.id, {company: formValues.title}))
    props.removeEdit()
  }

  const renderEditContact = () => {

    if (props.editState.itemEditable === true) {
      return (
        <SingleInput
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '5px' }}
          initialValues={{title: props.contact.company}}
          removeEdit={() => props.removeEdit()}
          onSubmit={onSubmit} />
      )
    }

    if (props.editState.itemEditable === false) {
      return (
        <div >
          <div>{props.contact.company}</div>
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

export default EditContactCompany
