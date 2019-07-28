import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import {editPulse} from '../../../../../actions/pulses'


class ArchivePulse extends React.Component {

  componentDidMount() {
        
  }

  renderArchive(){    
    const findPulse = _.filter(this.props.pulses, {id: this.props.pulseId})
    const isArchived = findPulse[0].archived    
    //console.log('details: ', isArchived)
    if (isArchived === 'true'){
      return (
        <div
        onClick={() => this.props.editPulse(this.props.pulseId, {archived: 'false'})}        
        data-position="left center"
        data-tooltip="unarchive pulse"
        style={{ display: 'inline-block', color: '#DC6969', paddingRight: '5px' ,cursor: 'pointer'}}>          
        <i className=" archive icon" /> archived        
      </div>
      )
    } else return (
      <div
        onClick={() => this.props.editPulse(this.props.pulseId, {archived: 'true'})}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Archive"
        style={{ display: 'inline-block',cursor: 'pointer' }}>
        <i className=" archive icon" />        
      </div>
    )

  }

  render() {      
    return (
      <>        
        {this.renderArchive()}
      </>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    pulses: Object.values(state.pulses),
    boardId: state.appState.id      
  }
}

export default connect(mapStateToProps, { editPulse }) (ArchivePulse)
