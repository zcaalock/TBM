import React from 'react'
import { connect } from 'react-redux'
import { createBoard } from '../../actions/boards'
import SingleInput from '../Forms/SingleInput'

class AddBoard extends React.Component {
  
  onSubmit = (formValues) => {
    this.props.createBoard(formValues)
    this.props.removeEdit()
  }

  


  render() {

    return (
      <div>        
        <SingleInput onSubmit={this.onSubmit} />        
      </div>
    )
  }
}

export default connect(null, { createBoard })(AddBoard)
