import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Body from './Body'
import { fetchPulse } from '../../actions/pulses'


class Details extends React.Component {

  componentDidMount() {
    this.props.fetchPulse(this.props.match.params.id)
  }

  render() {
    if (!this.props.pulse) {
      return <div>loading</div>
    } return (
      <div className="article rightMenu" style={{ position: 'fixed', display: 'inline-block', marginLeft: '0', padding: '20px'}}>
        <Header title={this.props.pulse.title} pulseId={this.props.pulse.id}/>
        <Body pulseId={this.props.pulse.id}/>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    pulse: state.pulses[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchPulse })(Details)