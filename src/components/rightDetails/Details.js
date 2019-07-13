import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import { fetchPuls } from '../../actions/pulses'


class Details extends React.Component {

  componentDidMount() {
    this.props.fetchPuls(this.props.match.params.id)
  }

  render() {
    if (!this.props.pulse) {
      return <div>loading</div>
    } return (
      <div className="article rightMenu" style={{ position: 'fixed', display: 'inline-block', marginLeft: '0', padding: '20px', width: '100%' }}>
        <Header title={this.props.pulse.title} />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    pulse: state.pulses[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchPuls })(Details)