import React from 'react';
import HeaderMenuClients from './HeaderMenuClients'

function Header(props) {
  
  return (
    <div className="rightMenu-header" style={{ padding: '' }}>
      <div style={{ display: 'inline-block', maxWidth: '70%' }}>
        <h3>
          {props.client.title}
        </h3>
      </div>
      <div className="header item" style={{ display: 'inline-block', float: 'right', minWidth: '53px' }}>
        <HeaderMenuClients          
          client={props.client}          
        />
      </div>
    </div>
  )
}


export default Header