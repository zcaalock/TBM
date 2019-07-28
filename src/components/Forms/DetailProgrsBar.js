import React, { Component } from 'react'
import _ from 'lodash'
import ProgressBar from './ProgressBar'

export default class DetailProgressBar extends Component {
   
  renderProgressBar(id) {
    const details = _.filter(this.props.details, { pulseId: id })
    const checked = _.filter(this.props.details, { pulseId: id, check: "true" })

    if (details.length > 0 && this.props.pulse.archived === 'false') {
      const value = checked.length / details.length
      //console.log('value: ', value)
      return <ProgressBar value={value * 100} />
    }

    if (this.props.pulse.archived === 'true') {
      return <div style={{color: 'rgb(220, 105, 105)'}}>Pulse archived</div>
    }

  }

  render() {
    return (
      <div>
        {this.renderProgressBar(this.props.pulse.id)}     
      </div>
    )
  }
}