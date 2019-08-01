import React from 'react'
import { connect } from 'react-redux'
//import _ from 'lodash'
import { editPulse } from '../../../../../actions/pulses'
import Calendar from '../../../../Forms/Calendar'
import DaysToDeadline from './DaysToDeadline'


class Deadline extends React.Component {
  state = { date: '' }

  componentDidMount() {
    this.setState({ date: this.props.pulse.deadline })
  }

  submitCalendar = (date) => {
    if (this.state.date !== date) this.setState({ date: date })
  }

  updateDb() {
    //console.log('date:', this.state.date)

    this.props.editPulse(this.props.pulse.id, { deadline: this.state.date })
    //this.setState({date: this.props.pulse.deadline})
  }

  renderIconStyle(date) {
    //console.log('db:', date, 'cal: ', this.state.date)
    if (date !== this.state.date) return { color: '#00A569' }
    if (date === this.state.date) return { display: 'none' }
  }

  render() {

    return (
      <div style={{ minWidth: '165px' }} >

        <div style={{ width: '130px' }}><DaysToDeadline deadline={this.props.pulse.deadline} pulse={this.props.pulse} /></div>
        <div style={{ display: 'inline-block', width: '145px', paddingRight: '15px' }} ><Calendar value={this.props.pulse.deadline} readData={this.submitCalendar} /></div>

        <div data-position="left center" data-tooltip="Save to database" onClick={() => this.updateDb()} style={{ display: 'inline-block' }} ><i className="save icon" style={this.renderIconStyle(this.props.pulse.deadline)} /></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pulses: Object.values(state.pulses)
  }
}

export default connect(mapStateToProps, { editPulse })(Deadline)