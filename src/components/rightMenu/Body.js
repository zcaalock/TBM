import React from 'react'

import Details from './details/Details'
import AddDetail from './details/AddDetail'

const Body = (props) => {
  return (
    <div style={{width: 'auto'}}>
      <Details pulseId={props.pulseId}/>
      <AddDetail pulseId={props.pulseId}/>
    </div>
  )
}

export default Body