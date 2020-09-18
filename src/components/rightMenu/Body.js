import React from 'react'
import Details from './details/Details'
import AddDetail from './details/AddDetail'
import Notepad from './details/Notepad'

function Body(props) {
  return (
    <div style={{ width: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Details pulseId={props.pulseId} />
      <AddDetail pulseId={props.pulseId} />
      <Notepad pulseId={props.pulseId} />
    </div>
  )
}
export default Body