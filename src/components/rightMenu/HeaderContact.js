import React, { useState } from 'react';
import HeaderIconsContact from './HeaderIconsContact'
import EditContactName from '../middle/Contacts/Cells/EditContactName'

function Header(props) {

  const [state, defState] = useState(
    { isHovering: false, itemEditable: false });
  return (
    <div className="rightMenu-header" style={{ padding: '' }}>
      <div style={{ display: 'inline-block', maxWidth: '224px' }}>
        <h3>
          <EditContactName
            contact={props.contact}
            editState={state}
            showEdit={() => defState({ itemEditable: true })}
            removeEdit={() => defState({ itemEditable: false })}
          />
        </h3>
      </div>
      <div className="header item" style={{ display: 'inline-block', float: 'right' }}>
        <HeaderIconsContact
          showEdit={() => defState({ itemEditable: true })}
          contactId={props.contactId}
          contact={props.contact}
        />
      </div>
    </div>
  )
}

export default Header