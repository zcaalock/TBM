import React, { useState } from 'react';
import HeaderIconsClient from './HeaderIconsClient'
import EditClientName from '../middle/Clients/Cells/EditClientName'

function Header(props) {

  const [state, defState] = useState(
    { isHovering: false, itemEditable: false });
  return (
    <div className="rightMenu-header" style={{ padding: '' }}>
      <div style={{ display: 'inline-block', maxWidth: '224px' }}>
        <h3>
          <EditClientName
            client={props.client}
            editState={state}
            showEdit={() => defState({ itemEditable: true })}
            removeEdit={() => defState({ itemEditable: false })}
          />
        </h3>
      </div>
      <div className="header item" style={{ display: 'inline-block', float: 'right' }}>
        <HeaderIconsClient
          showEdit={() => defState({ itemEditable: true })}
          clientId={props.clientId}
          client={props.client}
        />
      </div>
    </div>
  )
}

export default Header