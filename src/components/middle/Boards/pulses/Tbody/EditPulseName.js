import React from 'react'
import { useDispatch } from "react-redux";
import _ from 'lodash'
import { editPulse } from '../../../../../actions/pulses'
import SingleInput from '../../../../Forms/SingleInput'

function EditPulseName(props) {

  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(editPulse(props.pulse.id, formValues))
    props.removeEdit()
  }

  const renderEditPulse = () => {

    if (props.editState.itemEditable === true) {
      return (
        <SingleInput
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '5px' }}
          initialValues={_.pick(props.pulse, 'title')}
          removeEdit={() => props.removeEdit()}
          onSubmit={onSubmit} />
      )
    }

    if (props.editState.itemEditable === false) {
      return (
        <div >
          <div>{props.pulse.title}</div>
        </div>
      )
    }
  }
  return (
    <div style={{ width: '100%' }}>
      {renderEditPulse()}
    </div>
  )
}

export default EditPulseName
