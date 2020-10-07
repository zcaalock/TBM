import React from 'react'
import DetailsClients from './details/DetailsClients'
import AddDetail from './details/AddDetail'
import Notepad from './details/Notepad'

function Body(props) {
  return (
    <div style={{ width: 'auto', display: 'flex', flexDirection: 'column' }}>
      <DetailsClients pulseId={props.pulseId} />
      <AddDetail pulseId={props.pulseId} />
      <Notepad pulseId={props.pulseId} />
    </div>
  )
}
export default Body