import React, { useState } from 'react'
import EditBoardName from './EditBoardName'
import HeaderIcons from './HeaderIcons'


function Header(props) {

  const [itemEditable, setitemEditable] = useState(false);

  const removeEdit = () => {
    setitemEditable(false)
  }

  const showEdit = () => {
    setitemEditable(true)
  }

  return (
    <div className="head-vertical-segment" style={{ width: '100%' }}>
      <div style={{ float: 'left', width: '90%' }}>
        <EditBoardName
          title={props.title}
          board={props.board}
          editState={itemEditable}
          showEdit={() => showEdit()}
          removeEdit={() => removeEdit()}
        />        
      </div>
      <div style={{ float: 'right', paddingRight: '22px' }}>
        <div
          className="articleIcon"
          style={{ display: 'inline-block' }}>
          <HeaderIcons showEdit={() => showEdit()} />
        </div>
      </div>
    </div>
  )
}

export default Header