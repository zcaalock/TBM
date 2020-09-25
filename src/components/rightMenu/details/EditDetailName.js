import React from 'react'
import _ from 'lodash'
import { useDispatch } from "react-redux";
import { editDetail } from '../../../actions/details'
import { editPulse } from '../../../actions/pulses'
import SingleInput from '../../Forms/SingleInput'

function EditDetailName(props) {

  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(editDetail(props.detail.id, formValues))
    dispatch(props.removeEdit)
    dispatch(editPulse(props.pulseId, { readed: [props.userId] }))
  }

  const renderEditDetail = () => {
    const id = [`itemEditable${props.detail.id}`]
    if (props.editState[id] === true) {
      return (
        <SingleInput
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '0' }}
          initialValues={_.pick(props.detail, 'title')}
          removeEdit={() => dispatch(props.removeEdit)}
          onSubmit={onSubmit} />
      )
    }

    if (!props.editState.itemEditable || props.editState.itemEditable === false) {
      return (
        <div >
          {props.title}
        </div>
      )
    }
  }

  return (
    <>
      {renderEditDetail()}
    </>
  )
}

export default EditDetailName
