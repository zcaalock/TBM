import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { editNotepad } from '../../../actions/notepad'
import NotepadField from '../../Forms/NotepadField'
import { editPulse } from '../../../actions/pulses'
//import SingleInput from '../../Forms/SingleInput'

class editNotepadContent extends React.Component {    

  onSubmit = (formValues) => {
    //this.props.editDetail(this.props.detail.id, formValues)
    if(this.props.notepad.content !== formValues.content)
    //console.log('submit value: ', formValues, 'notepad Id:', this.props.notepad.id)
    this.props.editNotepad(this.props.notepad.id, formValues)
    this.props.editPulse(this.props.appState.pulseId, {readed: [this.props.userId]})
    this.props.removeEdit()
  }   

  renderEditNotepad() {
    const id =[`itemEditable${this.props.notepad.id}`]    
    if (this.props.editState[id] === "true") {
      return (
        <NotepadField 
        propStyle={{padding: '0'}} 
        propChildStyle={{ padding: '0'}}
        initialValues={_.pick(this.props.notepad, 'content')} 
        removeEdit={()=>this.props.removeEdit()} 
        onSubmit={this.onSubmit} />
      )
    }

    if (!this.props.editState.itemEditable || this.props.editState.itemEditable === "false") {
      return (                    
          <div >
          {this.props.content}
          </div>        
      )
    }
  }

  render() {

    return (
      <>      
        {this.renderEditNotepad()}
      </>
    )
  }
}

export default connect(null, { editNotepad, editPulse })(editNotepadContent)
