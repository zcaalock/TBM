import React from 'react'
import Head from './Clients/Head'
import Body from './Clients/Body'
import AddClient from './Clients/Cells/AddClient'
function Clients(props) {
  //console.log(props)
  return (
    <div style={{ width: "100%", position: 'fixed' }}>
      <Head />
      <Body props={props} />
      <AddClient />
    </div>
  )
}

export default Clients