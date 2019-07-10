import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { editBoard } from '../../actions/boards'
import SingleInput from '../Forms/SingleInput'

class EditBoardName extends React.Component {
  
    

  onSubmit = (formValues) => {
    this.props.editBoard(this.props.board.id, formValues)
    this.props.removeEdit()
  }
  
 

  renderNewBoard() {
    
    if (this.props.editState.itemEditable === true) {
      return <SingleInput propStyle={{marginTop: '-10px', marginLeft: '-5px'}} initialValues={_.pick(this.props.board, 'title')} removeEdit={()=>this.props.removeEdit()} onSubmit={this.onSubmit} />
    }

    if (this.props.editState.itemEditable === false) {
      return (
        <div onDoubleClick={() => this.props.showEdit()}>            
          <div><h3>{this.props.title}</h3></div>          
        </div>
      )
    }
  }

  render() {

    return (
      <>      
        {this.renderNewBoard()}
      </>
    )
  }
}

export default connect(null, { editBoard })(EditBoardName)
