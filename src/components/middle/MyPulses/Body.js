import React from 'react'

import Thead from './owntasktable/Thead'
import Tbody from './owntasktable/Tbody'

class OwnTaskList extends React.Component {
  render() {
    return (
      <table className="ui very basic table" style={{ paddingLeft: '15px' }}>
        <Thead />
        <Tbody params={this.props.params} private={this.props.params}/>
      </table>
    )
  }
}

export default OwnTaskList