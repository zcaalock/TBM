import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import DeletePulse from '../middle/Boards/pulses/Tbody/DeletePulse'
import ArchivePulse from '../middle/Boards/pulses/Tbody/ArchivePulse'
import PrivatePulse from '../middle/Boards/pulses/Tbody/PrivatePulse'
import {editState} from '../../actions/appState'
import EditPulseModal from '../Forms/EditPulseModal'

function HeaderIcons(props) {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.appState)  
  const ShowEditPulseModal = () => {
    return appState.editPulseOpen === 'true' ?  <EditPulseModal/> : null
  }
  //console.log(props.pulse)
  return (
    <div>
      <div
          onClick={() => { 
            //props.showEdit()
            dispatch(editState('true', 'editPulseOpen'))
           }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Edit"
          style={{ display: 'inline-block', cursor: 'pointer' }}>
          <i className=" edit icon" />
        </div>      
      <PrivatePulse pulse={props.pulse} pulseId={props.pulseId} />
      <ArchivePulse pulseId={props.pulseId} />
      <DeletePulse pulseId={props.pulseId} />
      {ShowEditPulseModal()}
    </div>
  )

}

export default HeaderIcons
