import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import history from '../../../../../history'

import { editState } from '../../../../../actions/appState'
import PulseName from '../../../Boards/pulses/Tbody/PulseName'
import LeadPerson from '../../../Boards/pulses/Tbody/LeadPerson'
import Status from '../../../Boards/pulses/Tbody/Status'
import ProgressBar from '../../../../Forms/ProgressBar'
import DetailProgrsBar from '../../../../Forms/DetailProgrsBar'

class Tbody extends React.Component {
  componentDidMount() {
    
  }

  goLink(id) {
    this.props.editState(id, 'pulseId')
    history.push(`/filters/${this.props.params.selector}/${this.props.params.item}/pulses/${id}`)    
  }

  renderProgressBar(id) {
    const details = _.filter(this.props.details, { pulseId: id })
    const checked = _.filter(this.props.details, { pulseId: id, check: "true" })

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


    pulses = _.filter(this.props.pulses, { [this.props.selector]: this.props.item })
    if (this.props.boards.length > 0 && this.props.pulses.length > 0 && this.props.categories.length > 0)
      return pulses.map(pulse => {
        //console.log('pulse: ', pulse.categoryId)
        let category = _.find(this.props.categories, { id: pulse.categoryId })
        let board = _.find(this.props.boards, { id: category.boardId })
        //console.log('sdfsf: ',category.title)
        return (
          <tr key={pulse.id} style={this.renderSelect(pulse.id)} className='tableRow' onClick={() => this.goLink(pulse.id)}>
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
              <DetailProgrsBar details={this.props.details} pulse={pulse} />
              {/* {this.renderProgressBar(pulse.id)} */}
            </td>
          </tr>
        )
      })
  }

  render() {

    return (
      <div>
        <table className="ui very basic table" style={{ paddingLeft: '15px' }}>
          <thead>
            <tr>
              <th style={{ paddingLeft: '10px', width: '' }}>Name</th>
              <th style={{ width: '10%' }}>Board</th>
              <th style={{ width: '10%' }}>Category</th>
              <th style={{ width: '20%' }}>Lead Person</th>
              <th style={{ width: '120px' }}>Status</th>
              <th style={{ width: '10%' }}>Progress</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPulses()}
          </tbody>
        </table>
      </div>
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
    categories: Object.values(state.categories),
    appState: state.appState

  }
}

export default connect(mapStateToProps, { editState })(Tbody)