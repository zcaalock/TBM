import React from 'react'
import DetailsClients from './details/DetailsClients'
import AddDetailClient from './details/AddDetailClient'
import NotepadClient from './details/NotepadClient'

function Body(props) {
  return (
    <div style={{ width: 'auto', display: 'flex', flexDirection: 'column' }}>
      <DetailsClients clientId={props.clientId} />
      <AddDetailClient clientId={props.clientId} />
      <NotepadClient clientId={props.clientId} />
    </div>
  )
}
export default Body