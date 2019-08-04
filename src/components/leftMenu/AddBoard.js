import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createBoard, createPrivateBoard } from '../../actions/boards'
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
   if(this.props.name === 'New Board')  this.props.createBoard(formValues, '')
   if(this.props.name === 'New Private Board')  this.props.createPrivateBoard(formValues, this.props.userId)  
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
          <div style={{ display: 'inline-block' }}>{this.props.name}</div>
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

const mapStateToProps = (state) => {
  return {
    boards: _.keyBy(Object.values(state.boards), 'id'),
    userId: state.user.credentials.userId
  }
}


export default connect(mapStateToProps, { createBoard, createPrivateBoard })(AddBoard)
