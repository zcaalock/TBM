import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import history from '../../../../history'
import { editPulse } from '../../../../actions/pulses'
import { fetchDetails } from '../../../../actions/details'
import { editState } from '../../../../actions/appState'
import PulseName from './Tbody/PulseName'
import LeadPerson from './Tbody/LeadPerson'
import Status from './Tbody/Status'
import ProgressBar from '../../../Forms/ProgressBar'
import DetailProgrsBar from '../../../Forms/DetailProgrsBar'
import Deadline from '../../Boards/pulses/Tbody/Deadline'

class Tbody extends React.Component {
  componentDidMount() {

    if (this.isEmpty(this.props.pulses)) this.props.fetchDetails()
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }




  goLink(pulse) {
    this.props.editState(pulse.id, 'pulseId')
    history.push(`/boards/${this.props.appState.id}/pulses/${pulse.id}`)

    let findUser = undefined
    if(pulse.readed) pulse.readed.forEach(read => { if (read === this.props.privateId) return findUser = true })  
    if(pulse.readed && pulse.readed.length > 0 && findUser === undefined) this.props.editPulse(pulse.id, {readed: [...pulse.readed,this.props.privateId]})

  }

  renderSelect(pulseId) {
    if (this.props.appState.pulseId === pulseId)
      return { backgroundColor: '#F5F5F5' }
  }

  renderProgressBar(id) {
    const details = _.filter(this.props.details, { pulseId: id })
    const checked = _.filter(this.props.details, { pulseId: id, check: 'true' })

    if (details.length > 0) {
      const value = checked.length / details.length
      //console.log('value: ', value)
      return <ProgressBar value={value * 100} />
    }
  }



  renderPulses() {
    //console.log(this.props.appState.showArchived)
    const id = this.props.categoryId
    let pulses = _.filter(this.props.pulses, (this.props.appState.showArchived === 'false') ? { categoryId: id, archived: 'false' } : { categoryId: id })

    //(this.props.appState.showArchived === 'false') ? pulses = _.filter(this.props.pulses, { categoryId: id, archived: 'false' }) : pulses = _.filter(this.props.pulses, { categoryId: id })
    //let pulses = _.filter(this.props.pulses, { categoryId: id })

    return pulses.map(pulse => {
      //console.log('pulse: ', pulse)
      if (pulse.privateId === '' || pulse.privateId === this.props.privateId)
        return (
          <tr key={pulse.id} style={this.renderSelect(pulse.id)} className='tableRow' onClick={() => this.goLink(pulse)}>
            <td style={{ paddingLeft: '10px', width: '' }} data-label="Name">
              <PulseName pulseId={pulse.id} pulseName={pulse.pulseName} pulse={pulse} privateId={this.props.privateId} />
            </td>
            <td data-label="LeadPerson" style={{ overflow: "visible", minWidth: '100px' }}>
              <LeadPerson pulse={pulse} />
            </td>
            <td data-label="Status" style={{ overflow: "visible", width: '120px' }}>
              <Status pulse={pulse} />
            </td>
            <td style={{ width: '165px' }}>
              <Deadline pulse={pulse} />
            </td>
            <td style={{ width: '10%' }} >
              <DetailProgrsBar details={this.props.details} pulse={pulse} />
              {this.renderPulseNotification(pulse)}
            </td>
          </tr>
        )
        return null
    })
    
  }

  renderPulseNotification(pulse) {
    let findUser = undefined
    if (pulse.readed) pulse.readed.forEach(read => { if (read === this.props.privateId) return findUser = true })
    if (pulse.readed && pulse.readed.length > 0 && findUser === undefined && this.props.appState.showNotifications === 'true') return <div className='notification'data-tooltip="Unreaded content">i</div>
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
    privateId: state.user.credentials.userId,
    appState: state.appState

  }
}

export default connect(mapStateToProps, { fetchDetails, editState, editPulse })(Tbody)