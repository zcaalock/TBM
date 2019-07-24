import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import history from '../../../../history'

import {fetchDetails} from '../../../../actions/details'
import PulseName from './Tbody/PulseName'
import LeadPerson from './Tbody/LeadPerson'
import Status from './Tbody/Status'
import ProgressBar from '../../../Forms/ProgressBar'

class Tbody extends React.Component {
  componentDidMount() {
    
    this.props.fetchDetails()
  }  

  goLink(id) {
    history.push(`/boards/${this.props.appState.id}/pulses/${id}`)
    //console.log('select', id)
  }

  renderProgressBar(id){
    const details = _.filter(this.props.details, {pulseId: id})
    const checked = _.filter(this.props.details, {pulseId: id, check:'true'})
    
    if (details.length>0) {
      const value = checked.length / details.length
      //console.log('value: ', value)
      return <ProgressBar value={value*100} />
    } 
  }

  renderPulses() {
    const id = this.props.categoryId
    const pulses = _.filter(this.props.pulses, { categoryId: id })
    return pulses.map(pulse => {
      //console.log('pulse: ', pulse)
      return (
        <tr key={pulse.id} className='tableRow' onClick={() => this.goLink(pulse.id)}>
          <td style={{ paddingLeft: '10px', width: '' }} data-label="Name">
            <PulseName pulseId={pulse.id} pulseName={pulse.pulseName} pulse={pulse} />
          </td>
          <td data-label="LeadPerson" style={{ overflow: "visible", width: '10%' }}>
            <LeadPerson pulse={pulse} />
          </td>
          <td data-label="Status" style={{ overflow: "visible", width: '120px' }}>
            <Status pulse={pulse} />
          </td>
          <td style={{wdth: '10%'}}>
            {this.renderProgressBar(pulse.id)}
          </td>
        </tr>
      )
    })
  }

  render() {
    //onsole.log('pulses state:', this.props.pulses)
    return (
      <tbody>
        {this.renderPulses()}
      </tbody>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    pulses: Object.values(state.pulses),
    details: Object.values(state.details),
    appState: state.appState

  }
}

export default connect(mapStateToProps, { fetchDetails })(Tbody)