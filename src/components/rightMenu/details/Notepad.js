import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Button } from 'semantic-ui-react'
import CKEditor from 'ckeditor4-react'

import { isEmpty } from '../../../actions/helperFunctions'
import { fetchNotepads } from '../../../actions/notepad'
import { createNotepad, editNotepad, deleteNotepad } from '../../../actions/notepad'
import NotepadIcons from './NotepadIcons'




class Notepad extends Component {

  state = {}

  componentDidMount() {
    if (isEmpty(this.props.notepad)) this.props.fetchNotepads()
    const notepad = _.find(this.props.notepad, { pulseId: this.props.pulseId })
    if (notepad) this.setState({ data: notepad.content });
  }


  createNewNotepad() {
    //console.log('content: ', content, 'detailId', this.props.pulseId)
    //this.props.createNotepad({ content: content }, this.props.pulseId)
    this.props.createNotepad({ content: '<p>Enter notes here...</p>' }, this.props.pulseId)
    this.setState({ data: '<p>Enter notes here...</p>' })


  }

  onEditorChange(evt) {
    this.setState({
      data: evt.editor.getData()
    });


  }

  renderNewNotepad() {

  }

  renderCKEditor(content) {
    return <CKEditor
      data={content}
      type="inline"
      onChange={evt => this.onEditorChange(evt)}
    //onBlur={this.props.createNotepad({content: this.state.data}, this.props.pulseId)}
    />
  }

  renderSaveButton(content, notepadId) {
    console.log('state:', this.state.data, 'content:', content)
    //console.log('content', content)
    if (this.state.data === content) return <Button disabled>Save</Button>
    if (this.state.data !== content) return <Button onClick={() => this.CKEditorSaveToDB(notepadId)} style={{ color: '#00A569' }} data-position="right center" data-tooltip="Save to database">Save</Button>
  }

  CKEditorSaveToDB(notepadId) {
    //console.log('save', this.state.data, notepadId)
    if(this.state.data === '') this.props.deleteNotepad(notepadId)
    this.props.editNotepad(notepadId, { content: this.state.data })
  }


  render() {

    const notepad = _.find(this.props.notepad, { pulseId: this.props.pulseId })
    //console.log('notepad state: ', this.state)
    if (notepad)

      return (
        <div>
          <div className="rightMenu-header" style={{ paddingTop: '15px' }}>
            <div className='' style={{ display: 'inline-block' }}>
              <h3>
                Notepad:
          </h3>
            </div>
            <div style={{ display: 'inline-block', float: 'right', paddingRight: '4px' }}>
              <NotepadIcons showEdit={() => this.showEdit(notepad.id)} notepadId={notepad.id} />
            </div>
          </div>
          <div style={{ paddingTop: '20px' }}>{this.renderCKEditor(notepad.content)}</div>
          <div style={{ paddingTop: '20px' }}>{this.renderSaveButton(notepad.content, notepad.id)}</div>

        </div>
      )
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
              onClick={() => this.createNewNotepad()}
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
}

const mapStateToProps = (state) => {
  return {
    notepad: Object.values(state.notepad),
    details: Object.values(state.details)
  }
}

export default connect(mapStateToProps, { fetchNotepads, createNotepad, editNotepad, deleteNotepad })(Notepad)
