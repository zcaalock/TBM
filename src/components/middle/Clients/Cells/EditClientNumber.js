import React from 'react'
import { useDispatch } from "react-redux";
import _ from 'lodash'
import { editClient } from '../../../../actions/clients'
import SingleInput from '../../../Forms/SingleInput'

function EditClientNumber(props) {
  //console.log(props)
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    //console.log(formValues)
    dispatch(editClient(props.client.id, {phone: formValues.title}))
    props.removeEdit()
  }

  const renderEditClient = () => {

    if (props.editState.itemEditable === true) {
      return (
        <SingleInput
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '5px' }}
          initialValues={{title: props.client.phone}}
          removeEdit={() => props.removeEdit()}
          onSubmit={onSubmit} />
      )
    }

    if (props.editState.itemEditable === false) {
      return (
        <div >
          <div>{props.client.phone}</div>
        </div>
      )
    }
  }
  
  return (
    <div style={{ width: '100%' }}>
      {renderEditClient()}
    </div>
  )
}

export default EditClientNumber
