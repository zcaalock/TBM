import React, { useState } from 'react';
import HeaderIcons from './HeaderIcons'
import EditPulseName from '../middle/Boards/pulses/Tbody/EditPulseName'

function Header(props) {

  const [state, defState] = useState(
    { isHovering: false, itemEditable: false });

  // removeEdit() {
  //   this.setState({ itemEditable: false })
  // }

  // hideIcon() {
  //   this.setState({ isHovering: false })
  // }

  // showIcon() {
  //   this.setState({ isHovering: true })
  // }

  // showHover() {
  //   if (this.state.isHovering === true) {
  //     return (
  //       <div>
  //         <i className="sort icon" />
  //       </div>)
  //   }
  // }


  return (
    <div className="rightMenu-header" style={{ padding: '' }}>
      {/* <div className='' style={{ display: 'inline-block', maxWidth: '224px' }}>
          <h3>
            {this.props.title}
          </h3>
        </div> */}
      <div style={{ display: 'inline-block', maxWidth: '224px' }}>
        <h3>
          <EditPulseName
            pulse={props.pulse}
            editState={state}
            showEdit={() => defState({ itemEditable: true })}
            removeEdit={() => defState({ itemEditable: false })}
          />
        </h3>
      </div>
      <div className="header item" style={{ display: 'inline-block', float: 'right', minWidth: '53px', paddingRight: '13px' }}>
        <HeaderIcons
          showEdit={() => defState({ itemEditable: true })}
          pulseId={props.pulseId}
          pulse={props.pulse}
        />
      </div>
    </div>
  )

}

export default Header