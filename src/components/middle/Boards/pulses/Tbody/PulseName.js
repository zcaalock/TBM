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