import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { editCategory } from '../../../actions/categories'
import SingleInput from '../../Forms/SingleInput'

class EditCategoryName extends React.Component {
  
    

  onSubmit = (formValues) => {
    this.props.editCategory(this.props.category.id, formValues)
    this.props.removeEdit()
  }
  
 

  renderEditCategory() {
    
    if (this.props.editState.itemEditable === true) {
      return (
        <SingleInput 
        propStyle={{}} 
        propChildStyle={{ padding: '5px' }}
        initialValues={_.pick(this.props.category, 'title')} 
        removeEdit={()=>this.props.removeEdit()} 
        onSubmit={this.onSubmit} />
      )
    }

    if (this.props.editState.itemEditable === false) {
      return (
        <div >            
          <div>{this.props.title}</div>          
        </div>
      )
    }
  }

  render() {

    return (
      <>      
        {this.renderEditCategory()}
      </>
    )
  }
}

export default connect(null, { editCategory })(EditCategoryName)
