import React from 'react'
import DetailsContacts from './details/DetailsContacts'
import AddDetailContact from './details/AddDetailContact'
import NotepadContact from './details/NotepadContact'

function Body(props) {
  return (
    <div style={{ width: 'auto', display: 'flex', flexDirection: 'column' }}>
      <DetailsContacts contactId={props.contactId} />
      <AddDetailContact contactId={props.contactId} />
      <NotepadContact contactId={props.contactId} />
    </div>
  )
}
export default Body