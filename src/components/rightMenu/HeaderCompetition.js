import React from 'react';
import HeaderMenuCompetitions from './HeaderMenuCompetitions'

function Header(props) {
  
  return (
    <div className="rightMenu-header" style={{ padding: '' }}>
      <div style={{ display: 'inline-block', maxWidth: '70%' }}>
        <h3>
          {props.competition.title}
        </h3>
      </div>
      <div className="header item" style={{ display: 'inline-block', float: 'right', minWidth: '53px' }}>
        <HeaderMenuCompetitions          
          competition={props.competition}          
        />
      </div>
    </div>
  )
}


export default Header