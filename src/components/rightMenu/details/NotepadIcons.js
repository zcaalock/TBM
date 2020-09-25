import React from 'react'
import { useDispatch } from "react-redux";
import { deleteNotepad } from '../../../actions/notepad'


function NotepadIcons(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <div
        onClick={() => { dispatch(deleteNotepad(props.notepadId)) }}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Delete"
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className="trash icon" />
      </div>
    </div>
  )
}

export default NotepadIcons
