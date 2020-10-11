import React, { useState } from 'react';
import HeaderIcons from './HeaderIcons'
import EditPulseName from '../middle/Boards/pulses/Tbody/EditPulseName'

function Header(props) {

  const [state, defState] = useState(
    { isHovering: false, itemEditable: false });
  return (
    <div className="rightMenu-header" style={{ padding: '' }}>
      <div style={{ display: 'inline-block', maxWidth: '70%' }}>
        <h3>
          <EditPulseName
            pulse={props.pulse}
            editState={state}
            showEdit={() => defState({ itemEditable: true })}
            removeEdit={() => defState({ itemEditable: false })}
          />
        </h3>
      </div>
      <div className="header item" style={{ display: 'inline-block', float: 'right', minWidth: '53px'}}>
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