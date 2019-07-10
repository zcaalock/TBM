import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchPulses } from '../../../actions/pulses'

class Tbody extends React.Component {
  componentDidMount() {
    this.props.fetchPulses()
  }

  renderPulses() {
    const id= Number(this.props.categoryId)
    const pulses = _.filter(this.props.pulses, {categoryId: id})
    console.log('category id: ', pulses)
    return pulses.map(pulse => {
      return (
        <tr key={pulse.id}>
        <td data-label="Name">{pulse.content}</td>
        <td data-label="Age">{pulse.userInitials}</td>
        <td data-label="Job">{pulse.status}</td>
      </tr> )
    })
  }

  render(){
    return (
      <tbody>
         {this.renderPulses()}
    </tbody>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    pulses: Object.values(state.pulses)

  }
}

export default connect(mapStateToProps, { fetchPulses })(Tbody)