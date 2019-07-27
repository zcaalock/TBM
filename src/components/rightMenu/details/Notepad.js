import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { TextArea } from 'semantic-ui-react'

//import { isEmpty } from '../../../actions/helperFunctions'
import { fetchNotepads } from '../../../actions/notepad'
import { createNotepad } from '../../../actions/notepad'
import NotepadIcons from './NotepadIcons'
import EditNotepadContent from './EditNotepadContent'



class Notepad extends Component {

  state = {showNewNotepad: 'false'}

  removeEdit(id) {
    //console.log('show edit', id)
    this.setState({ [`itemEditable${id}`]: 'false' })

  }

  showEdit(id) {
    this.setState({ [`itemEditable${id}`]: 'true' })
    //console.log('edit', id)
  }
  

  createNotepad(content) {
    //console.log('content: ', content, 'detailId', this.props.pulseId)
    this.props.createNotepad({content: content}, this.props.pulseId)
    

  }

  renderNewNotepad(){
   if (this.state.showNewNotepad === 'true')
    return <TextArea 
              onChange={(e, { value }) => this.setState({ content: value })}
            style={{width: '100%', height: '350px'}}
            onBlur={()=>this.createNotepad(this.state.content)}
            />
  }


  render() {
    
    const notepad = _.find(this.props.notepad, { pulseId: this.props.pulseId})
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
            <div style={{ display: 'inline-block', float: 'right' }}>
              <NotepadIcons showEdit={() => this.showEdit(notepad.id)} notepadId={notepad.id} />
            </div>
          </div>
          <div style={{ paddingTop: '20px' }}>
            <EditNotepadContent
              title={notepad.content}
              detail={notepad}
              editState={this.state}
              onClick={() => this.showEdit(notepad.id)}
              showEdit={() => this.showEdit(notepad.id)}
              removeEdit={() => this.removeEdit(notepad.id)} />
          </div>
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
          <div style={{ display: 'inline-block', float: 'right' }}>
            <div
              onClick={() => { this.setState({showNewNotepad: 'true'}) }}
              className="articleIcon"
              data-position="bottom center"
              data-tooltip="Edit"
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
        <div style={{ paddingTop: '20px' }}>
          {this.renderNewNotepad()}
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

export default connect(mapStateToProps, { fetchNotepads, createNotepad })(Notepad)
