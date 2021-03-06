import React from 'react'
import { useDispatch } from "react-redux";
import { deleteNotepad } from '../../../actions/notepad'
import { useTranslation } from "react-i18next"


function NotepadIcons(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation() 
  return (
    <div>
      <div
        onClick={() => { dispatch(deleteNotepad(props.notepadId)) }}
        className="articleIcon"
        data-position="top right"
        data-tooltip={t("Delete")}
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className="trash icon" />
      </div>
    </div>
  )
}

export default NotepadIcons
