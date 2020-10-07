import React, { useState } from 'react'
import EditBoardName from './EditBoardName'
import HeaderIcons from './HeaderIcons'
import { Message } from 'semantic-ui-react'
import { useSelector, useDispatch } from "react-redux";
import {editState} from '../../../actions/appState'


function Header(props) {
  
  const [itemEditable, setitemEditable] = useState(false);
  const appState = useSelector(state => state.appState)
  const dispatch = useDispatch();
  const removeEdit = () => {
    setitemEditable(false)
  }

  const showEdit = () => {
    setitemEditable(true)
  }
  
  function showSubmit() {
    if (appState.submited !== '') {
      setTimeout(() => { dispatch(editState('', 'submited')) }, 4000)
      return <Message positive>
        <Message.Header>{appState.submited}</Message.Header>
      </Message>
    }
  }

  return (
    <div className="head-vertical-segment" style={{ width: '100%' }}>
      {showSubmit()}
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