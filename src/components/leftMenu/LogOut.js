import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/users'
import { editState } from '../../actions/appState'

class Logout extends React.Component {

  state = { isHovering: false }

  handleHover() {
    this.setState({ isHovering: !this.state.isHovering })
  }

  renderLogOut() {
    if (this.state.isHovering === false)
      return <h3>Task Manager</h3>
    return <div ><h3><i className="power off icon" />LogOut</h3></div>
  }

  render() {
    return (
      <div
        onMouseEnter={() => this.handleHover()}
        onMouseLeave={() => this.handleHover()}
        //data-position="bottom center"
        // data-tooltip="Go to main page" 
        style={{ cursor: "pointer" }}
        onClick={() => { this.props.logoutUser(); this.props.editState('', 'id') }}
        className='item leftMenu-main'>{this.renderLogOut()}
      </div>
    )
  }

}

export default connect(null, {logoutUser, editState })(Logout)