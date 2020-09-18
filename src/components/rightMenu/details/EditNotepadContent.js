import React from 'react'
import _ from 'lodash'
import { useDispatch } from "react-redux";
import { editNotepad } from '../../../actions/notepad'
import NotepadField from '../../Forms/NotepadField'
import { editPulse } from '../../../actions/pulses'

function editNotepadContent(props) {

  const dispatch = useDispatch();

  const onSubmit = (formValues) => {

    if (props.notepad.content !== formValues.content)
      dispatch(editNotepad(props.notepad.id, formValues))
    dispatch(editPulse(props.appState.pulseId, { readed: [props.userId] }))
    dispatch(removeEdit())
  }

  const renderEditNotepad = () => {
    const id = [`itemEditable${props.notepad.id}`]
    if (props.editState[id] === "true") {
      return (
        <NotepadField
          propStyle={{ padding: '0' }}
          propChildStyle={{ padding: '0' }}
          initialValues={_.pick(props.notepad, 'content')}
          removeEdit={() => dispatch(removeEdit())}
          onSubmit={onSubmit} />
      )
    }

    if (!props.editState.itemEditable || props.editState.itemEditable === "false") {
      return (
        <div >
          {props.content}
        </div>
      )
    }
  }

  return (
    <>
      {renderEditNotepad()}
    </>
  )
}

export default editNotepadContent
