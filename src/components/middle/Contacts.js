import React from 'react'
import Head from './Contacts/Head'
import Body from './Contacts/Body'
import AddContact from './Contacts/Cells/AddContact'
function Contacts(props) {
  //console.log(props)
  return (
    <div style={{ width: "100%" }}>
      <Head />
      <Body props={props} />
      <AddContact />
    </div>
  )
}

export default Contacts