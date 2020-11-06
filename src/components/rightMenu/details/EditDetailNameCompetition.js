import React from 'react'
import _ from 'lodash'
import { useDispatch } from "react-redux";
import { editDetail } from '../../../actions/details'
import { editCompetition } from '../../../actions/competitions'
import SingleInput from '../../Forms/SingleInput'

function EditDetailNameCompetition(props) {

  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(editDetail(props.detail.id, formValues))
    dispatch(props.removeEdit)
    dispatch(editCompetition(props.competitionId, { readed: [props.userId] }))
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

export default EditDetailNameCompetition
