import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import history from '../../../../history'

import { fetchDetails } from '../../../../actions/details'
import { fetchPulses } from '../../../../actions/pulses'
import { fetchCategories } from '../../../../actions/categories'
import { fetchBoards } from '../../../../actions/boards'
import { fetchLead } from '../../../../actions/settings'
import { fetchStatus} from '../../../../actions/status'
import { editState } from '../../../../actions/appState'
import PulseName from '../../Boards/pulses/Tbody/PulseName'
import LeadPerson from '../../Boards/pulses/Tbody/LeadPerson'
import Status from '../../Boards/pulses/Tbody/Status'
import ProgressBar from '../../../Forms/ProgressBar'

class Tbody extends React.Component {


  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  componentDidMount() {
    this.props.editState('mypulses', 'id') //selected board to appState
    if (this.isEmpty(this.props.boards)) this.props.fetchBoards()
    if (this.isEmpty(this.props.status)) this.props.fetchStatus()
    if (this.isEmpty(this.props.pulses)) this.props.fetchPulses()
    if (this.isEmpty(this.props.details)) this.props.fetchDetails()
    if (this.isEmpty(this.props.status)) this.props.fetchStatus()
    if (this.isEmpty(this.props.categories)) this.props.fetchCategories()

  }  

  goLink(id, userId) {
    this.props.editState(id, 'pulseId')
    history.push(`/mypulses/${userId}/pulses/${id}`)
    //console.log('select', id)
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
  
  renderSelect(pulseId){
    if(this.props.appState.pulseId === pulseId)
    return {backgroundColor: '#F5F5F5'}
  }

  renderPulses() {
    //console.log('params: ', this.props.params.uinit)   
    let pulses = {}
    const userId = this.props.params.userId

    pulses = _.filter(this.props.pulses, { userId: userId })
    if (this.props.boards.length > 0 && this.props.pulses.length > 0 && this.props.categories.length > 0)
      return pulses.map(pulse => {
        //console.log('pulse: ', pulse.categoryId)
        let category = _.find(this.props.categories, { id: pulse.categoryId })
        let board = _.find(this.props.boards, { id: category.boardId })
        //console.log('sdfsf: ',category.title)
        return (
          <tr key={pulse.id} style={this.renderSelect(pulse.id)} className='tableRow' onClick={() => this.goLink(pulse.id, userId)}>
            <td style={{ paddingLeft: '10px', width: '' }} data-label="Name">
              <PulseName pulseId={pulse.id} pulseName={pulse.pulseName} pulse={pulse} />
            </td>
            <td>
              {board.title}
            </td>
            <td>
              {category.title}
            </td>
            <td data-label="LeadPerson" style={{ overflow: "visible", width: '15%' }}>
              <LeadPerson pulse={pulse} />
            </td>
            <td data-label="Status" style={{ overflow: "visible", width: '120px' }}>
              <Status pulse={pulse} />
            </td>
            <td style={{ wdth: '10%' }}>
              {this.renderProgressBar(pulse.id)}
            </td>
          </tr>
        )
      })
  }

  render() {
    const userId = this.props.params.userId
    const findUserByUserId = _.filter(this.props.lead, { userId: userId })
    //console.log('userId', findUserByUserId)
    if (findUserByUserId.length > 0)
      return (
        <tbody>
          {this.renderPulses()}
        </tbody>
      )
    return (
      <tbody>
        <tr>
          <td>No pulses found..</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    user: state.user.credentials,
    pulses: Object.values(state.pulses),
    lead: Object.values(state.lead),
    boards: Object.values(state.boards),
    details: Object.values(state.details),
    status: Object.values(state.status),
    categories: Object.values(state.categories),
    appState: state.appState

  }
}

export default connect(mapStateToProps, { fetchDetails, fetchPulses, fetchCategories, fetchBoards, fetchLead, editState, fetchStatus })(Tbody)