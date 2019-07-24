import React from 'react'
import DeletePulse from '../middle/Boards/pulses/Tbody/DeletePulse'
import ArchivePulse from '../middle/Boards/pulses/Tbody/ArchivePulse'

class HeaderIcons extends React.Component {
  render() {
    return (
      <div>
        {/* <div
          //onClick={() => { this.props.showEdit() }}
          className="articleIcon"
          data-position="bottom center"
          data-tooltip="Edit"
          style={{ display: 'inline-block', cursor: 'pointer' }}>
          <i className=" edit icon" />
        </div>         */}
            <ArchivePulse pulseId={this.props.pulseId}/>
          <DeletePulse pulseId={this.props.pulseId}/>        
      </div>
    )
  }
}

export default HeaderIcons
