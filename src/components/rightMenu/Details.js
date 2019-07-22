import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Body from './Body'



class Details extends React.Component {
  

  render() {
    if (!this.props.pulse) {
      return <div className="article rightMenu" style={{ position: 'absolute', marginLeft:'calc(80% - 20px)', padding: '20px', float: 'right'}}><div className="ui active inline loader"></div></div>
    } return (
      <div className="article rightMenu" style={{ position: 'fixed', display: 'inline-block', padding: '20px'}}>
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

export default connect(mapStateToProps, {  })(Details)