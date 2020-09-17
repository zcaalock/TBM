import React from 'react'
import DeletePulse from '../middle/Boards/pulses/Tbody/DeletePulse'
import ArchivePulse from '../middle/Boards/pulses/Tbody/ArchivePulse'
import PrivatePulse from '../middle/Boards/pulses/Tbody/PrivatePulse'

function HeaderIcons(props) {

  return (
    <div>
      <div
          onClick={() => { props.showEdit() }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Edit"
          style={{ display: 'inline-block', cursor: 'pointer' }}>
          <i className=" edit icon" />
        </div>
      <PrivatePulse pulse={props.pulse} />
      <ArchivePulse pulseId={props.pulseId} />
      <DeletePulse pulseId={props.pulseId} />
    </div>
  )

}

export default HeaderIcons
