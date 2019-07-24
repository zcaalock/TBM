import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { editLead} from '../../../../../actions/settings'
import SingleInput from '../../../../Forms/SingleInput'

class EditBoardName extends React.Component {
    

  onSubmit(formValues,id) {
    //console.log('form: ', formValues, id)
    this.props.editLead(id, formValues)
    this.props.removeEdit()
  }
  
 

  renderNewLead() {    
    const userId = this.props.userId
    const userLead = _.filter(this.props.lead, {userId: userId})[0]    
        
    if (this.props.editState.itemEditable === true && userId !== undefined) {
      return (
        <SingleInput 
        propStyle={{marginTop: '-2px', marginLeft: '-5px', padding: '0px'}}
        propChildStyle={{ padding: '0px'}} 
        initialValues={_.pick(userLead.title, 'title')} 
        removeEdit={()=>this.props.removeEdit()} 
        onSubmit={(formValues)=>this.onSubmit(formValues,userLead.id)} />
      )
    }

    if (this.props.editState.itemEditable === false && userId !== undefined) {
      return (
        <div onDoubleClick={() => this.props.showEdit()} style={{paddingBottom: '5px'}}>            
          {userLead.title}          
        </div>
      )
    }
  }

  render() {

    return (
      <>      
        {this.renderNewLead()}
      </>
    )
  }
}

export default connect(null, { editLead })(EditBoardName)
