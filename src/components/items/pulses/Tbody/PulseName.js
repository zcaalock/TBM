import React from 'react'
import EditPulseName from './EditPulseName'

class PulseName extends React.Component {
  state = { isHovering: false, itemEditable: false }

  hideIcon() {
    this.setState({ isHovering: false })
  }

  showIcon() {
    this.setState({ isHovering: true })
  }

  renderIcon() {
    if (this.state.isHovering === true) {
      return (
        <div 
        data-position="bottom center"
        data-tooltip="Edit"
        onClick={()=>this.showEdit()}
        >
          
          <i className="edit icon" />
        </div>)
    }
  }

  removeEdit() {
    this.setState({ itemEditable: false })
  }

  showEdit() {
    this.setState({ itemEditable: true })
  }

  render() {
    return (
      <div
        onMouseEnter={() => this.showIcon() }
        onMouseLeave={() => this.hideIcon() }
        onDoubleClick={()=>this.showEdit()}
      >
        <div style={{ display: 'inline-block' }}>{this.renderIcon()}</div>
        <div style={{ display: 'inline-block' }}>
          <EditPulseName
            pulse={this.props.pulse}
            editState={this.state}
            showEdit={() => this.showEdit()}
            removeEdit={() => this.removeEdit()}
          />
          {/* {this.props.pulseName} */}
          </div>


      </div>
    )
  }
}

export default PulseName