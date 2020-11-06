import React from 'react'
import { useDispatch } from "react-redux";
import _ from 'lodash'
import { editCompetition } from '../../../../actions/competitions'
import SingleInput from '../../../Forms/SingleInput'

function EditCompetitionName(props) {
  //console.log(props)
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(editCompetition(props.competition.id, formValues))
    props.removeEdit()
  }

  const renderEditCompetition = () => {

    if (props.editState.itemEditable === true) {
      return (
        <SingleInput
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '5px' }}
          initialValues={_.pick(props.competition, 'title')}
          removeEdit={() => props.removeEdit()}
          onSubmit={onSubmit} />
      )
    }

    if (props.editState.itemEditable === false) {
      return (
        <div >
          <div>{props.competition.title}</div>
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

export default EditCompetitionName
