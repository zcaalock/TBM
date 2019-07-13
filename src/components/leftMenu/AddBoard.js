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
          data-position="bottom center"
          data-tooltip="Create pulse">
          <i className="plus icon" />
        </div>)
    }
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
          onMouseLeave={() => this.hideIcon()}
          onMouseEnter={() => this.showIcon()}
          className="tableNewDetail" style={{paddingTop: '5px'}}
        >
          <div style={{display: 'inline-block'}}>{this.showHover()}</div>
          <div style={{display: 'inline-block'}}>New</div>
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
