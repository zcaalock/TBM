import React from 'react';
import HeaderMenuContacts from './HeaderMenuContacts'


function Header(props) {
  
  return (
    <div className="rightMenu-header" style={{ padding: '' }}>
      <div style={{ display: 'inline-block', maxWidth: '70%' }}>
        <h3>
          {props.contact.title}
        </h3>
      </div>
      <div className="header item" style={{ display: 'inline-block', float: 'right', minWidth: '53px' }}>
        <HeaderMenuContacts          
          contact={props.contact}          
        />
      </div>
    </div>
  )
}


export default Header