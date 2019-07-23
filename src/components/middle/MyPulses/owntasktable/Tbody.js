import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import history from '../../../../history'

import {fetchDetails} from '../../../../actions/details'
import {fetchPulses} from '../../../../actions/pulses'
import {fetchCategories} from '../../../../actions/categories'
import {fetchBoards} from '../../../../actions/boards'
import PulseName from '../../Boards/pulses/Tbody/PulseName'
import LeadPerson from '../../Boards/pulses/Tbody/LeadPerson'
import Status from '../../Boards/pulses/Tbody/Status'
import ProgressBar from '../../../Forms/ProgressBar'

class Tbody extends React.Component {
  componentDidMount() {
    this.props.fetchBoards()
    this.props.fetchPulses()
    this.props.fetchDetails()
    this.props.fetchCategories()
  }  

  goLink(id, userInitials) {
    history.push(`/mypulses/${userInitials}/pulses/${id}`)
    //console.log('select', id)
  }

  renderProgressBar(id){
    const details = _.filter(this.props.details, {pulseId: id})
    const checked = _.filter(this.props.details, {pulseId: id, check:true})
    
    if (details.length>0) {
      const value = checked.length / details.length
      //console.log('value: ', value)
      return <ProgressBar value={value*100} />
    } 
  }
  

  renderPulses() { 
    //console.log('params: ', this.props.params.uinit)   
    const initials = this.props.params.uinit
    const pulses = _.filter(this.props.pulses, { userInitials: initials})
    if(this.props.boards.length>0 && this.props.pulses.length >0 && this.props.categories.length > 0)
    return pulses.map(pulse => {
      //console.log('pulse: ', pulse.categoryId)
      let category = _.find(this.props.categories, {id: pulse.categoryId})
      let board = _.find(this.props.boards, {id: category.boardId})
      //console.log('sdfsf: ',category.title)
      return (
        <tr key={pulse.id} className='tableRow' onClick={() => this.goLink(pulse.id, initials)}>
          <td style={{ paddingLeft: '10px', width: '' }} data-label="Name">
            <PulseName pulseId={pulse.id} pulseName={pulse.pulseName} pulse={pulse} />
          </td>
          <td>            
            {board.title}
          </td>
          <td>
            {category.title}
          </td>
          <td data-label="LeadPerson" style={{ overflow: "visible", width: '11%' }}>
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
    //console.log('pulses state:', this.props.pulses)
    return (
      <tbody>
        {this.renderPulses()}
      </tbody>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    user: state.user.credentials,
    pulses: Object.values(state.pulses),
    boards: Object.values(state.boards),
    details: Object.values(state.details),
    categories: Object.values(state.categories),
    appState: state.appState

  }
}

export default connect(mapStateToProps, { fetchDetails, fetchPulses, fetchCategories, fetchBoards })(Tbody)