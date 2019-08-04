import React from 'react'
import EditPulseName from './EditPulseName'

class PulseName extends React.Component {
  state = { isHovering: false, itemEditable: false }

  // hideIcon() {
  //   setTimeout(() => { this.setState({ isHovering: false }) }, 500)
  //   //this.setState({ isHovering: false })
  // }

  // showIcon() {
  //   this.setState({ isHovering: true })
  // }

  // renderIcon() {
  //   if (this.state.isHovering === true) {
  //     return (
  //       <div
  //         data-position="bottom center"
  //         data-tooltip="Edit"
  //         onClick={() => this.showEdit()}
  //       >

  //         <i className="edit icon" />
  //       </div>)
  //   }
  // }

  renderPrivateIcon() {
    //console.log('pulse: ',this.props.pulse.privateId, 'pri: ', this.props.privateId )
    if (this.props.pulse.privateId === this.props.privateId) {
      return (
        <div
          data-position="bottom center"
          data-tooltip="Private Pulse"
          
        >

          <i className="privacy icon" />
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
        onDoubleClick={() => this.showEdit()}
        //onMouseEnter={() => this.showIcon()}
        //onMouseLeave={() => this.hideIcon()}
      >

        {/* <div

          style={{ position: 'absolute', marginLeft: '-25px', display: 'inline-block' }}>
          {this.renderIcon()}
        </div> */}
        <div

          style={{cursor:'auto', position: 'absolute', marginLeft: '-35px', display: 'inline-block', color: '#00A569' }}>
           
          {this.renderPrivateIcon()}
        </div>
        <div
          //onMouseEnter={() => this.showIcon()}
          //onMouseLeave={() => this.hideIcon()}
          style={{ display: 'inline-block', width: '100%' }}>
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