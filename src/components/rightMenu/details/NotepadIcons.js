import React from 'react'
import { connect } from 'react-redux'
import {deleteNotepad} from '../../../actions/notepad'


class NotepadIcons extends React.Component {  

  render() {
    return (
      <div>
        {/* <div
          onClick={() => { this.props.showEdit() }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Edit"
          style={{
            display: 'inline-block',
            paddingLeft: '10px',
            paddingRight: '10px',
            cursor: 'pointer'
          }}>
          <i className=" edit icon" />
        </div> */}
        <div
          onClick={() => { this.props.deleteNotepad(this.props.notepadId) }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Delete"
          style={{ display: 'inline-block', cursor: 'pointer' }}>
          <i className="trash icon" />
        </div>
        {/* <div
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Archive"
          style={{
            display: 'inline-block',
            paddingLeft: '10px',
            paddingRight: '10px',
            cursor: 'pointer'
          }}>
          <i className=" archive icon" />
        </div>         */}
          {/* <DeletePulse pulseId={this.props.pulseId}/>         */}
      </div>
    )
  }
}

export default connect(null, {deleteNotepad}) (NotepadIcons)
