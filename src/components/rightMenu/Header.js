import React from 'react';
import HeaderMenu from './HeaderMenu'

function Header(props) {
  
  return (
    <div className="rightMenu-header" style={{ padding: '' }}>
      <div style={{ display: 'inline-block', maxWidth: '70%' }}>
        <h3>
          {props.pulse.title}
        </h3>
      </div>
      <div className="header item" style={{ display: 'inline-block', float: 'right', minWidth: '53px'}}>
        <HeaderMenu          
          pulseId={props.pulseId}
          pulse={props.pulse}
        />
      </div>
    </div>
  )
}

export default Header