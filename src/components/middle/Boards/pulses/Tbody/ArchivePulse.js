import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'
import { editPulse } from '../../../../../actions/pulses'


function ArchivePulse(props) {

  const pulses = useSelector(state => Object.values(state.pulses))   
  const dispatch = useDispatch()
  const renderArchive = () => {
    //console.log(pulses[props.pulseId].archived)    
    if (pulses[props.pulseId] && pulses[props.pulseId].archived === 'true') return (
        <div
          onClick={() => dispatch(editPulse(props.pulseId, { archived: 'false' }))}
          data-position="left center"
          data-tooltip="unarchive pulse"
          style={{ display: 'inline-block', color: '#DC6969', paddingRight: '5px', cursor: 'pointer' }}>
          <i className=" archive icon" /> archived
        </div>)
      
    if (pulses[props.pulseId] && pulses[props.pulseId].archived === 'false')  return (
      <div
        onClick={() => dispatch(editPulse(props.pulseId, { archived: 'true' }))}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Archive"
        style={{ display: 'inline-block', cursor: 'pointer' }}>
        <i className=" archive icon" />
      </div>
    )



  }

  return (
    <>
      {renderArchive()}
    </>
  )
}

export default ArchivePulse
