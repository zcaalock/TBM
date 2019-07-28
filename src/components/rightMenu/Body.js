import React from 'react'

import Details from './details/Details'
import AddDetail from './details/AddDetail'
import Notepad from './details/Notepad'

class Body extends React.Component {

  render() {    

    return (

      <div style={{ width: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Details pulseId={this.props.pulseId} />
        <AddDetail pulseId={this.props.pulseId} />
        <Notepad pulseId={this.props.pulseId} />
      </div>
    )
  }
}

export default Body