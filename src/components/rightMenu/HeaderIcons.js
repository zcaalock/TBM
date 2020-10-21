import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import DeletePulse from '../middle/Boards/pulses/Tbody/DeletePulse'
import ArchivePulse from '../middle/Boards/pulses/Tbody/ArchivePulse'
import PrivatePulse from '../middle/Boards/pulses/Tbody/PrivatePulse'
import {editState} from '../../actions/appState'
import EditPulseModal from '../Forms/EditPulseModal'
import { useTranslation } from "react-i18next"


function HeaderIcons(props) {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation() 
  const appState = useSelector(state => state.appState)  
  const ShowEditPulseModal = () => {
    return appState.editPulseOpen === 'true' ?  <EditPulseModal/> : null
  }
  //console.log(props.pulse)
  return (
    <div>
      <div
          onClick={() => {             
            dispatch(editState('true', 'editPulseOpen'))
           }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip={t("Edit")}
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
