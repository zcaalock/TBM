import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import {deletePulse} from '../../../../../actions/pulses'
import {fetchDetails} from '../../../../../actions/details'



class DeletePulse extends React.Component {

  componentDidMount() {
    //this.props.fetchDetails()    
  }

  renderDelete(){    
    const details = _.filter(this.props.details, {pulseId: this.props.pulseId})
    const notepad = _.filter(this.props.notepad, {pulseId: this.props.pulseId})    
    //console.log('details: ', notepad)
    if (details.length>0 || notepad.length > 0){
      return (
        <div
        //onClick={() => { this.props.delete() }}        
        data-position="left center"
        data-tooltip="Remove all items before delete"
        style={{ display: 'inline-block' }}>
        <i className="trash icon" style={{ paddingLeft: '10px', color: '#cecece'}} />        
      </div>
      )
    } return (
      <div
        onClick={() => this.props.deletePulse(this.props.pulseId, this.props.boardId)}
        className="articleIcon"
        data-position="bottom center"
        data-tooltip="Delete"
        style={{ display: 'inline-block',cursor: 'pointer', paddingLeft: '10px' }}>
        <i className=" trash icon" />        
      </div>
    )

  }

  render() {
      
    return (
      <>
        
        {this.renderDelete()}
      </>

    )
  }
}
const mapStateToProps = (state)=>{
  return{
    details: Object.values(state.details),
    notepad: Object.values(state.notepad),
    boardId: state.appState.id      
  }
}

export default connect(mapStateToProps, { fetchDetails, deletePulse }) (DeletePulse)
