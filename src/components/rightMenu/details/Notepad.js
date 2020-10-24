import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { Button } from 'semantic-ui-react'
import { editPulse } from '../../../actions/pulses'
import { isEmpty } from '../../../actions/helperFunctions'
import { fetchNotepads } from '../../../actions/notepad'
import { createNotepad, editNotepad, deleteNotepad } from '../../../actions/notepad'
import NotepadIcons from './NotepadIcons'
import Editor from '../../Forms/Editor'
import { useTranslation } from "react-i18next"


function Notepad(props) {

  const [state, defState] = useState({});
  const dispatch = useDispatch();
  const notepad = useSelector(state => Object.values(state.notepad));  
  const appState = useSelector(state => state.appState);
  const userId = useSelector(state => state.user.credentials.userId);
  const { t } = useTranslation() 
  useEffect(() => {
    if (isEmpty(notepad)) dispatch(fetchNotepads())
    const note = _.find(notepad, { pulseId: appState.pulseId })
    if (note) defState({ data: note.content })
  },[])

  const createNewNotepad = () => {
    dispatch(createNotepad({ content: `<p>${t('Enter notes here')}...</p>` }, props.pulseId))
    defState({ data: `<p>${t('Enter notes here')}...</p>` })
    dispatch(editPulse(appState.pulseId, { readed: [userId] }))
  }  

  const renderSaveButton = (notepadId) => {
    const note = _.find(notepad, { pulseId: appState.pulseId })
    if (state.data === note.content) return <Button disabled>{t('Save')}</Button>
    if (state.data !== note.content) {
      return <Button onClick={() => CKEditorSaveToDB(notepadId)} style={{ color: '#00A569' }}>{t('Save')}</Button>
    }
  }

  const CKEditorSaveToDB = (notepadId) => {
    if (state.data === '') dispatch(deleteNotepad(notepadId))
    dispatch(editNotepad(notepadId, { content: state.data }))
    dispatch(editPulse(appState.pulseId, { readed: [userId] }))
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
              {t('Notepad')}:
          </h3>
          </div>
          <div style={{ display: 'inline-block', float: 'right' }}>
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
            {t('Notepad')}:
          </h3>
        </div>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <div
            onClick={() => createNewNotepad()}
            className="articleIcon"
            data-position="top right"
            data-tooltip={t("New Note")}
            style={{
              display: 'inline-block',              
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
