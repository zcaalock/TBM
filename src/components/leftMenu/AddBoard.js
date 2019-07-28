import React from 'react'
import { connect } from 'react-redux'
import { createBoard } from '../../actions/boards'
import SingleInput from '../Forms/SingleInput'

class AddBoard extends React.Component {
  state = { isHovering: false, itemEditable: false }

  removeEdit() {
    this.setState({ itemEditable: false })
  }

  showEdit() {
    this.setState({ itemEditable: true })
  }

  hideIcon() {
    this.setState({ isHovering: false })
  }

  showIcon() {
    this.setState({ isHovering: true })
  }

  showHover() {
    if (this.state.isHovering === true) {
      return (
        <div
          style={{ cursor: 'pointer' }}
          data-position="right center"
          data-tooltip="Create board">
          <i className="plus icon" />
        </div>)
    }
  }

  onSubmit = (formValues) => {
    this.props.createBoard(formValues) 
    this.removeEdit()

  }

  renderNewBoard() {
    if (this.state.itemEditable === true) {
      return <SingleInput
        propStyle={{ paddingTop: '15px', paddingBottom: '10px' }}
        propChildStyle={{ padding: '0' }}
        removeEdit={() => this.removeEdit()}
        onSubmit={this.onSubmit} />
    }

    if (this.state.itemEditable === false) {
      return (
        <div
          onBlur={() => this.removeEdit()}
          onClick={() => this.showEdit()}
          onMouseLeave={() => this.hideIcon()}
          onMouseEnter={() => this.showIcon()}
          className="articleIcon" style={{ paddingTop: '15px', paddingBottom: '15px' }}
        >
          <div style={{ display: 'inline-block' }}>{this.showHover()}</div>
          <div style={{ display: 'inline-block' }}>New Board</div>
          {/* <div >New</div>
          <div style={{ position: 'absolute', right: "0px" }}><i className="icon plus" /></div> */}
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
