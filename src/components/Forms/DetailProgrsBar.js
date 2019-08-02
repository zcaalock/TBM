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
      return <ProgressBar  value={value * 100} />
    }

    if (this.props.pulse.archived === 'true') {
      return <div style={{color: 'rgb(220, 105, 105)'}}>Pulse archived</div>
    }

  }

  render() {
    const details = _.filter(this.props.details, { pulseId: this.props.pulse.id })
    const checked = _.filter(this.props.details, { pulseId: this.props.pulse.id, check: "true" })
    if (details.length > 0 && this.props.pulse.archived === 'false') return (
      <div>
        <div style={{display: 'inline-block', width: '100px'}} >{this.renderProgressBar(this.props.pulse.id)} </div>  
        <div style={{display: 'inline-block', position:'absolute', marginLeft: '-60px', paddingTop: '3px'}}>{checked.length}/{details.length}</div> 
      </div>
    )
    return <div></div>
  }
}