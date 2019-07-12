import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchPulses } from '../../../actions/pulses'
import Content from './Tbody/Content'

class Tbody extends React.Component {
  componentDidMount() {
    this.props.fetchPulses()
  }

  renderPulses() {
    const id= Number(this.props.categoryId)
    const pulses = _.filter(this.props.pulses, {categoryId: id})    
    return pulses.map(pulse => {
      return (
        <tr key={pulse.id} className='tableRow'>
        <td style={{paddingLeft: '10px'}} data-label="Name"><Content content={pulse.content}/></td>
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