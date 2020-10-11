import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { Button } from 'semantic-ui-react'
import { editContact } from '../../../actions/contacts'
import { isEmpty } from '../../../actions/helperFunctions'
import { fetchNotepads } from '../../../actions/notepad'
import { createNotepad, editNotepad, deleteNotepad } from '../../../actions/notepad'
import NotepadIcons from './NotepadIcons'
import Editor from '../../Forms/Editor'

function Notepad(props) {

  const [state, defState] = useState({});
  const dispatch = useDispatch();
  const notepad = useSelector(state => Object.values(state.notepad));  
  const appState = useSelector(state => state.appState);
  const userId = useSelector(state => state.user.credentials.userId);

  useEffect(() => {
    if (isEmpty(notepad)) dispatch(fetchNotepads())
    const note = _.find(notepad, { pulseId: appState.pulseId })
    if (note) defState({ data: note.content })
  },[])

  const createNewNotepad = () => {
    dispatch(createNotepad({ content: '<p>Enter notes here...</p>' }, props.contactId))
    defState({ data: '<p>Enter notes here...</p>' })
    dispatch(editContact(appState.pulseId, { readed: [userId] }))
  }  

  const renderSaveButton = (notepadId) => {
    const note = _.find(notepad, { pulseId: appState.pulseId })
    if (state.data === note.content) return <Button disabled>Save</Button>
    if (state.data !== note.content) {
      return <Button onClick={() => CKEditorSaveToDB(notepadId)} style={{ color: '#00A569' }} data-position="right center" data-tooltip="Save to database">Save</Button>
    }
  }

  const CKEditorSaveToDB = (notepadId) => {
    if (state.data === '') dispatch(deleteNotepad(notepadId))
    dispatch(editNotepad(notepadId, { content: state.data }))
    dispatch(editContact(appState.pulseId, { readed: [userId] }))
  }

  const submitNotepad = (data) => {
    if (state.data !== data) defState({ data: data })
  }

  const note = _.find(notepad, { pulseId: appState.pulseId })
  if (note) {
    return (
      <div>
        <div className="rightMenu-header" style={{ paddingTop: '15px' }}>
          <div className='' style={{ display: 'inline-block' }}>
            <h3>
              Notepad:
          </h3>
          </div>
          <div style={{ display: 'inline-block', float: 'right', paddingRight: '4px' }}>
            <NotepadIcons showEdit={() => this.showEdit(note.id)} notepadId={note.id} />
          </div>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Editor readData={submitNotepad} notepad={note} />
        </div>
        <div style={{ paddingTop: '20px' }}>{renderSaveButton(note.id)}</div>
      </div>
    )
  }
  return (
    <div>
      <div className="rightMenu-header" style={{ paddingTop: '15px' }}>
        <div className='' style={{ display: 'inline-block' }}>
          <h3>
            Notepad:
          </h3>
        </div>
        <div style={{ display: 'inline-block', float: 'right', width: '35px' }}>
          <div
            onClick={() => createNewNotepad()}
            className="articleIcon"
            data-position="bottom center"
            data-tooltip="New Note"
            style={{
              display: 'inline-block',
              paddingLeft: '10px',
              paddingRight: '10px',
              cursor: 'pointer'
            }}>
            <i className=" plus icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notepad
