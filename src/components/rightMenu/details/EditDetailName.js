import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { editDetail } from '../../../actions/details'
import SingleInput from '../../Forms/SingleInput'

class EditDetailName extends React.Component {    

  onSubmit = (formValues) => {
    this.props.editDetail(this.props.detail.id, formValues)
    this.props.removeEdit()
  }   

  renderEditDetail() {
    const id =[`itemEditable${this.props.detail.id}`]    
    if (this.props.editState[id] === true) {
      return (
        <SingleInput 
        propStyle={{padding: '0'}} 
        propChildStyle={{ padding: '0'}}
        initialValues={_.pick(this.props.detail, 'title')} 
        removeEdit={()=>this.props.removeEdit()} 
        onSubmit={this.onSubmit} />
      )
    }

    if (!this.props.editState.itemEditable || this.props.editState.itemEditable === false) {
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
        {this.renderEditDetail()}
      </>
    )
  }
}

export default connect(null, { editDetail })(EditDetailName)
