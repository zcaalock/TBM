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
import Deadline from '../../../Boards/pulses/Tbody/Deadline'

class Tbody extends React.Component {
  componentDidMount() {
    this.props.editState({ name: 'createdAt', direction: 'asc' }, 'sortBy')
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

  renderSelect(pulseId) {
    if (this.props.appState.pulseId === pulseId)
      return { backgroundColor: '#F5F5F5' }
  }

  //sorting collumns

  handleFilterClick(name){
    //console.log(name)
    const sortBy = this.props.appState.sortBy
    if(name === 'title' && sortBy.name === 'createdAt') this.props.editState({ name: 'title', direction: 'asc' }, 'sortBy')
    if(name === 'deadline' && sortBy.name === 'createdAt') this.props.editState({ name: 'deadline', direction: 'asc' }, 'sortBy')
    if(sortBy.name === name && sortBy.direction === 'desc') this.props.editState({ name: name, direction: 'asc' }, 'sortBy')
    if(sortBy.name === name && sortBy.direction === 'asc') this.props.editState({ name: name, direction: 'desc' }, 'sortBy')
  }

  renderRemoveSortIcon(name) {
    const sortBy = this.props.appState.sortBy
    if(sortBy.name === name) return <label data-position="bottom center" data-tooltip="Remove filter" onClick={()=> this.props.editState({ name: 'createdAt', direction: 'asc' }, 'sortBy')} style={{paddingLeft: '5px', color: '#DC6969', position: 'absolute', cursor: 'pointer'}}>x</label>
    if(sortBy.name === name) return <label data-position="bottom center" data-tooltip="Remove filter" onClick={()=> this.props.editState({ name: 'createdAt', direction: 'asc' }, 'sortBy')} style={{paddingLeft: '5px', color: '#DC6969', position: 'absolute', cursor: 'pointer'}}>x</label>  
  }


  sortPulsesBy(arr) {
    var data = ''
    if (this.props.appState.sortBy.direction === 'asc') {
      data = _.sortBy(arr, [this.props.appState.sortBy.name])
      //onsole.log('sorted: ', data)
      return data
    }
    if (this.props.appState.sortBy.direction === 'desc') {
      data = _.sortBy(arr, [this.props.appState.sortBy.name]).reverse()
      //console.log('sorted: ', data)
      return data
  }}

  sortIconClass(name) {
    const sortBy = this.props.appState.sortBy
    if(name === 'title' && sortBy.name === 'createdAt')return 'articleIcon sort alphabet down icon'
    if(name === 'title' && sortBy.direction === 'asc' && sortBy.name === name)return 'articleIconSelected sort alphabet down icon'
    if(name === 'title' && sortBy.direction === 'desc' && sortBy.name === name)return 'articleIconSelected sort alphabet up icon'
    if(name === 'deadline' && sortBy.name === 'createdAt')return 'articleIcon sort numeric down icon'
    if(name === 'deadline' && sortBy.direction === 'asc' && sortBy.name === name)return 'articleIconSelected sort numeric down icon'
    if(name === 'deadline' && sortBy.direction === 'desc' && sortBy.name === name)return 'articleIconSelected sort numeric up icon'
  }

  //Calendar




  renderPulses() {
    //console.log('selector: ', this.props.selector, this.props.item)   
    let pulses = {}    
    if (this.props.appState.showArchived === 'true') { pulses = _.filter(this.props.pulses, { [this.props.selector]: this.props.item }) }
    if (this.props.appState.showArchived === 'false') { pulses = _.filter(this.props.pulses, { [this.props.selector]: this.props.item, archived: 'false' }) }
    if (this.props.boards.length > 0 && this.props.pulses.length > 0 && this.props.categories.length > 0)
     
    return this.sortPulsesBy(pulses).map(pulse => {
      //console.log('pulse: ', pulse.categoryId)
      let category = _.find(this.props.categories, { id: pulse.categoryId })
      let board = _.find(this.props.boards, { id: category.boardId })
      //console.log('sdfsf: ',category.title)
      return (
        <tr key={pulse.id} style={this.renderSelect(pulse.id)} className='tableRow' onClick={() => this.goLink(pulse.id)}>
          <td style={{ paddingLeft: '10px' }} data-label="Name">
            <PulseName pulseId={pulse.id} pulseName={pulse.pulseName} pulse={pulse} />
          </td>
          <td >
            {board.title}
          </td>
          <td>
            {category.title}
          </td>
          <td data-label="LeadPerson" style={{ overflow: "visible", width: '10%' }}>
            <LeadPerson pulse={pulse} />
          </td>
          <td data-label="Status" style={{ overflow: "visible", width: '120px' }}>
            <Status pulse={pulse} />
          </td>
          <td>
            <Deadline pulse={pulse}/>
          </td>
          <td >
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
              <th style={{ paddingLeft: '10px', width: '30%' }}>Name <i onClick={()=>this.handleFilterClick('title')} className={this.sortIconClass('title')} style={{cursor: 'pointer'}}/>{this.renderRemoveSortIcon('title')}</th>
              <th style={{ minWidth: '15%' }}>Board </th>
              <th style={{ width: '10%' }}>Category</th>
              <th style={{ width: '10%' }}>Lead Person</th>
              <th style={{ width: '120px' }}>Status</th>
              <th style={{ width: '10%' }}>Deadline <i onClick={()=>this.handleFilterClick('deadline')} className={this.sortIconClass('deadline')} style={{cursor: 'pointer'}}/>{this.renderRemoveSortIcon('deadline')}</th>
              <th style={{ width: '10%' }}>Details</th>
              
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