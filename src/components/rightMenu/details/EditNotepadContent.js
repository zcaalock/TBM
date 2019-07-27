import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { editNotepad } from '../../../actions/notepad'
import NotepadField from '../../Forms/NotepadField'
//import SingleInput from '../../Forms/SingleInput'

class editNotepadContent extends React.Component {    

  onSubmit = (formValues) => {
    //this.props.editDetail(this.props.detail.id, formValues)
    
    console.log('submit value: ', formValues)
    this.props.removeEdit()
  }   

  renderEditNotepad() {
    const id =[`itemEditable${this.props.detail.id}`]    
    if (this.props.editState[id] === "true") {
      return (
        <NotepadField 
        propStyle={{padding: '0'}} 
        propChildStyle={{ padding: '0'}}
        initialValues={_.pick(this.props.detail, 'content')} 
        removeEdit={()=>this.props.removeEdit()} 
        onSubmit={this.onSubmit} />
      )
    }

    if (!this.props.editState.itemEditable || this.props.editState.itemEditable === "false") {
      return (                    
          <div >
          {this.props.title}
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

export default connect(null, { editNotepad })(editNotepadContent)
