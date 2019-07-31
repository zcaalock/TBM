import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { editPulse} from '../../../../../actions/pulses'
import SingleInput from '../../../../Forms/SingleInput'

class EditPulseName extends React.Component {    

  onSubmit = (formValues) => {
    this.props.editPulse(this.props.pulse.id, formValues)
    this.props.removeEdit()
  }  
 

  renderEditPulse() {
    
    if (this.props.editState.itemEditable === true) {
      return (
        <SingleInput 
        propStyle={{padding: '0'}} 
        propChildStyle={{ padding: '5px'}}
        initialValues={_.pick(this.props.pulse, 'title')} 
        removeEdit={()=>this.props.removeEdit()} 
        onSubmit={this.onSubmit} />
      )
    }

    if (this.props.editState.itemEditable === false) {
      return (
        <div >            
          <div>{this.props.pulse.title}</div>          
        </div>
      )
    }
  }

  render() {

    return (
      <div style={{width: '100%'}}>      
        {this.renderEditPulse()}
      </div>
    )
  }
}

export default connect(null, { editPulse })(EditPulseName)
