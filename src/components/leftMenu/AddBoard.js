import React from 'react'
import { connect } from 'react-redux'
import { createBoard } from '../../actions/boards'
import SingleInput from '../Forms/SingleInput'

class AddBoard extends React.Component {
  state = { itemEditable: false }



  onSubmit = (formValues) => {
    this.props.createBoard(formValues)
    this.removeEdit()
  }

  removeEdit() {
    this.setState({ itemEditable: false })
  }

  showEdit() {
    this.setState({ itemEditable: true })
  }

  renderNewBoard() {
    if (this.state.itemEditable === true) {
      return <SingleInput
        propStyle={{ marginLeft: '0px' }}
        propChildStyle={{ padding: '0' }}
        removeEdit={() => this.removeEdit()}
        onSubmit={this.onSubmit} />
    }

    if (this.state.itemEditable === false) {
      return (
        <div
          onBlur={()=> this.removeEdit()}
          onClick={() => this.showEdit()}
          className="selectable item"
        >
          <div >New</div>
          <div style={{ position: 'absolute', right: "0px" }}><i className="icon plus" /></div>
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

export default connect(null, { createBoard })(AddBoard)
