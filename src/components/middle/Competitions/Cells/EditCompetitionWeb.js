import React from 'react'
import { useDispatch } from "react-redux"
import { editCompetition } from '../../../../actions/competitions'
import { editState } from '../../../../actions/appState'
import { useTranslation } from "react-i18next"


function EditCompetitionNumber(props) {

  const dispatch = useDispatch()
  const { t } = useTranslation()

  return <td>
    <a data-position="bottom center" data-tooltip={props.competition.web} href={props.competition.web} target="_blank" rel="noopener noreferrer">Link</a>
    <i onClick={() => {

      dispatch(editState(true, 'editFieldModalOpen'))
      dispatch(editState(props.competition.web, 'editFieldModalItem'))
      dispatch(editState(props.competition.id, 'editFieldModalId'))
      dispatch(editState('web', 'editFieldModalSelector'))
      dispatch(editState(editCompetition, 'editFieldModalFunction'))
      dispatch(editState(t('Web'), 'editFieldModalFieldTitle'))
    }} className="dropdown icon"></i></td>

}

export default EditCompetitionNumber
