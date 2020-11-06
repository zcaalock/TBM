import React from 'react'
import { useDispatch } from "react-redux"
import { editCompetition } from '../../../../actions/competitions'
import SingleInput from '../../../Forms/SingleInput'

function EditCompetitionNumber(props) {
  //console.log(props)
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    //console.log(formValues)
    dispatch(editCompetition(props.competition.id, {phone: formValues.title}))
    props.removeEdit()
  }

  const renderEditCompetition = () => {

    if (props.editState.itemEditable === true) {
      return (
        <SingleInput
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '5px' }}
          initialValues={{title: props.competition.phone}}
          removeEdit={() => props.removeEdit()}
          onSubmit={onSubmit} />
      )
    }

    if (props.editState.itemEditable === false) {
      return (
        <div >
          <div>{props.competition.phone}</div>
        </div>
      )
    }
  }
  
  return (
    <div style={{ width: '100%' }}>
      {renderEditCompetition()}
    </div>
  )
}

export default EditCompetitionNumber
