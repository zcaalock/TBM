import React, {useState} from 'react'
import { useDispatch } from "react-redux"
import { editCompetition } from '../../../../actions/competitions'
import SingleInput from '../../../Forms/SingleInput'

function EditCompetitionNumber(props) {
  
  const dispatch = useDispatch();
  const [state, setstate] = useState(false)
  const onSubmit = (formValues) => {
    
    dispatch(editCompetition(props.competition.id, { web: formValues.title }))
    setstate(false)
  }

  if (state === true) {
    return <td><SingleInput
      propStyle={{ padding: '0' }}
      propChildStyle={{ padding: '5px' }}
      initialValues={{ title: props.competition.web }}
      removeEdit={() => setstate(false)}
      onSubmit={onSubmit} /></td>

  }

  if (state === false) {
    return <td><a data-position="bottom center" data-tooltip={props.competition.web} href={props.competition.web} target="_blank">Link</a><i onClick={() => setstate(true)} aria-hidden="true" className="dropdown icon"></i></td>
  }


  return <td></td>
}

export default EditCompetitionNumber
