import React from 'react'
import BoardMenu from './BoardMenu'

function Header(props) {  
  return (
    <div className="head-vertical-segment" style={{ width: '100%' }}>
      
      <div style={{ float: 'left', width: '90%' }}>
        <div><h3>{props.title}</h3></div>
      </div>
      <div style={{ float: 'right', paddingRight: '5px' }}>
        <div
          className="articleIcon"
          style={{ display: 'inline-block' }}>
          <BoardMenu board={props.board} />
        </div>
      </div>
    </div>
  )
}

export default Header