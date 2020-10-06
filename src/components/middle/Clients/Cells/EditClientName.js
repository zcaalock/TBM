import React from 'react'
import { useDispatch } from "react-redux";
import _ from 'lodash'
import { editClient } from '../../../../actions/clients'
import SingleInput from '../../../Forms/SingleInput'

function EditClientName(props) {
  //console.log(props)
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(editClient(props.client.id, formValues))
    props.removeEdit()
  }

  const renderEditClient = () => {

    if (props.editState.itemEditable === true) {
      return (
        <SingleInput
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '5px' }}
          initialValues={_.pick(props.client, 'title')}
          removeEdit={() => props.removeEdit()}
          onSubmit={onSubmit} />
      )
    }

    if (props.editState.itemEditable === false) {
      return (
        <div >
          <div>{props.client.title}</div>
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

export default EditClientName
