import React from 'react'
import { connect } from 'react-redux'



class Head extends React.Component {
  render() {
    return (
      <div className="head-vertical-segment" style={{paddingBottom: '20px'}}>
        <h3>Filters: {this.props.appState.filter.selector}/{this.props.appState.filter.value}</h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  }
}

export default connect(mapStateToProps) (Head)