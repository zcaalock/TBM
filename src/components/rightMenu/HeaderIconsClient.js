import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import DeleteClient from '../middle/Clients/Cells/DeleteClient'
import ArchivePulse from '../middle/Boards/pulses/Tbody/ArchivePulse'
import PrivatePulse from '../middle/Boards/pulses/Tbody/PrivatePulse'
import {editState} from '../../actions/appState'

function HeaderIcons(props) {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.appState)    

  return (
    <div>
      <div
          onClick={() => { 
            props.showEdit()
            //dispatch(editState('true', 'editClientOpen'))
           }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Edit"
          style={{ display: 'inline-block', cursor: 'pointer' }}>
          <i className=" edit icon" />
        </div>
      
      {/* <ArchivePulse pulseId={props.pulseId} />*/}
      <DeleteClient clientId={props.clientId} /> 
      
    </div>
  )

}

export default HeaderIcons
